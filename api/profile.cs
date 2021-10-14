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


namespace Microsoft.Function
{
    public static class Profile
    {
        public class ProfileItem 
        {
            [JsonProperty("userId")]
            public string UserId { get; set; }
            [JsonProperty("profile")]
            public object[] ProfileJson { get; set; }
        }


        [FunctionName("profile")]
        public static async Task<IActionResult> RunGetProfile(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "profile")] HttpRequest req,
            [CosmosDB(
                databaseName: "ben-testing",
                collectionName: "Profiles",
                ConnectionStringSetting = "CosmosDBConnection")
            ]  DocumentClient client,
            ILogger log)
        {
            log.LogInformation($"C# HTTP trigger Profile function processed a request for ");
            
            // Verify identity
            ClaimsPrincipal principal = ClientPrincipal.Parse(req);
            if (!principal.IsInRole("contributor") && !principal.IsInRole("reader"))
                return new UnauthorizedResult();
            
            string userId = principal.Identity.Name;
            ProfileItem profileItem = null;
            try
            {
                var response = await client.ReadDocumentAsync(
                    UriFactory.CreateDocumentUri("ben-testing", "Profiles", userId),
                    new RequestOptions { PartitionKey = new Microsoft.Azure.Documents.PartitionKey(userId) });

                profileItem = (ProfileItem)(dynamic)response.Resource;

            } catch (Exception e) {
                log.LogError($"Cant find Profile entry for {userId} in cosmosdb");
            }

            if (profileItem == null) // check default profile entries
            {
                var defaultResponse = await client.ReadDocumentAsync(
                            UriFactory.CreateDocumentUri("ben-testing", "Profiles", "DEFAULT"),
                            new RequestOptions { PartitionKey = new Microsoft.Azure.Documents.PartitionKey("DEFAULT") });
                if (defaultResponse == null )
                    return new NotFoundResult();

                profileItem = (ProfileItem)(dynamic)defaultResponse.Resource;
            }

            return new OkObjectResult(profileItem.ProfileJson[0]);
        }
    }
}
