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
    
        public class QuestionsItem 
        {
            [JsonProperty("userId")]
            public string UserId { get; set; }
            //[JsonProperty("QuestionsJson")]
            public object[] ImageJson { get; set; }
        }
    
        public static class Questions 
        {
            [FunctionName("getQuestions")]
            public static async Task<IActionResult> RunGet(
                [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "questions")] HttpRequest req,
                [CosmosDB(
                    databaseName: "medimages",
                    collectionName: "Questions",
                    ConnectionStringSetting = "CosmosDBConnection")
                ]  DocumentClient client,
                ILogger log)
            {
                log.LogInformation($"function GetQuestions ");

                // Verify identity
                ClaimsPrincipal principal = ClientPrincipal.Parse(req);
                if (!principal.IsInRole("contributor") && !principal.IsInRole("reader"))
                    return new UnauthorizedResult();

                string userId = principal.Identity.Name;
                QuestionsItem questions = null;
                try
                {
                    var response = await client.ReadDocumentAsync(
                        UriFactory.CreateDocumentUri("medimages", "Questions", "userId"),
                        new RequestOptions { PartitionKey = new Microsoft.Azure.Documents.PartitionKey(userId) });

                    questions = (QuestionsItem)(dynamic)response.Resource;
                    log.LogInformation($"function GetQuestions invoked ");

                } catch (Exception ) {
                    log.LogError($"Cant find Questions entry for in cosmosdb");
                }
                if (questions == null)
                {
                    var defaultResponse = await client.ReadDocumentAsync(
                            UriFactory.CreateDocumentUri("medimages", "Questions", "DEFAULT"),
                            new RequestOptions { PartitionKey = new Microsoft.Azure.Documents.PartitionKey("DEFAULT") });
                    if (defaultResponse == null )
                        return new NotFoundResult();

                    questions = (QuestionsItem)(dynamic)defaultResponse.Resource;
                }
                  return new OkObjectResult(questions.ImageJson);
            }
        }
}
