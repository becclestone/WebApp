/* Fetches and saves annotations to the "Annotations" container in the CosmosDB */
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Documents.Client;
using System.Security.Claims;
using System.Collections.Generic;

namespace Microsoft.Function
{

    public class AnnotationItem
    {
        [JsonProperty("imageId")]
        public string imageId { get; set; }
        [JsonProperty("id")]
        public string id { get; set; }
        //[JsonProperty("annotations")]
        public object[] AnnotationJson { get; set; }
    }
    
    public class AnnotationProps
    {
        [JsonProperty("type")]
        public string type {get; set; }
        [JsonProperty("body")]
        public List<AnnotationBody> body {get; set; }
        [JsonProperty("target")]
        public AnnotationTarget target {get; set; }
        [JsonProperty("@context")]
        public string context {get; set; }
        [JsonProperty("id")]
        public string id {get; set; }
    }
    
    public class AnnotationBody
    {
        [JsonProperty("type")]
        public string type {get; set; }
        [JsonProperty("value")]
        public string value {get; set; }
        [JsonProperty("purpose")]
        public string purpose {get; set; }
    }
   
    public class AnnotationTarget
    {
        [JsonProperty("source")]
        public string source {get; set; }
        [JsonProperty("selector")]
        public AnnotationSelector selector {get; set; }
    }
    
    public class AnnotationSelector
    {
        [JsonProperty("type")]
        public string type {get; set; }
        [JsonProperty("conformsTo")]
        public string conformsTo {get; set; }
        [JsonProperty("value")]
        public string value {get; set; }
    }

    public static class Annotation
    {
        [FunctionName("saveAnnotation")]
        public static  void RunSave(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "annotation/{imageId}")] HttpRequest req,
            [CosmosDB(
                databaseName: "ben-testing",
                collectionName: "Annotations",
                ConnectionStringSetting = "CosmosDBConnection")
            ] out dynamic document,
            string imageId,
            ILogger log)
        {
            log.LogInformation($"C# save annotations for {imageId}");
            document = null;

            // Verify identity
            ClaimsPrincipal principal = ClientPrincipal.Parse(req);
            if (!principal.IsInRole("contributor") && !principal.IsInRole("reader"))
                return;

            string userId = principal.Identity.Name;

            string requestBody = new StreamReader(req.Body).ReadToEnd();
            var input = JsonConvert.DeserializeObject<List<AnnotationProps>>(requestBody);

            document = new { id = imageId, imageId = imageId, AnnotationJson = input }; //new object[] { requestBody } };
        }

        [FunctionName("getAnnotation")]
        public static async Task<IActionResult> RunGet(
           [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "annotation/{imageId}")] HttpRequest req,
            [CosmosDB(
                databaseName: "ben-testing",  
                collectionName: "Annotations",
                ConnectionStringSetting = "CosmosDBConnection")
           ]  DocumentClient client,
            string imageId,
            ILogger log)
        {
            log.LogInformation($"function GetAnnotations {imageId}");

            // Verify identity
            ClaimsPrincipal principal = ClientPrincipal.Parse(req);
            if (!principal.IsInRole("contributor") && !principal.IsInRole("reader"))
              return new UnauthorizedResult();

            string userId = principal.Identity.Name;
            AnnotationItem annotations = null;
            try
            {
                var response = await client.ReadDocumentAsync<AnnotationItem>(
                    UriFactory.CreateDocumentUri("ben-testing", "Annotations", imageId),
                    new RequestOptions { PartitionKey = new Microsoft.Azure.Documents.PartitionKey(imageId) });

                annotations = (AnnotationItem)(dynamic)response;
                log.LogInformation($"function GetAnnotations invoked {imageId} {userId} {annotations}");
            }
            catch (Exception )
            {
                log.LogError($"Cant find Annotations entry for {userId}  Image {imageId} in cosmosdb");
                return new NotFoundResult();
            }
            log.LogInformation($"Retrieved annotation {annotations.AnnotationJson}");
            if ( annotations != null && annotations.AnnotationJson != null && annotations.AnnotationJson.Length > 0)
              return new OkObjectResult(annotations.AnnotationJson);
            else
              return new NotFoundResult();
        }
    }
}
