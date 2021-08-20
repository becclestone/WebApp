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
        public class AnswersItem
        {
            [JsonProperty("questionId")]
            public string QuestionId {get; set; }
            public object[] AnswersJson {get; set;}
        }
        public class AnswersProps
        {
            [JsonProperty("answerObj")]
            public AnswerText answerObj {get; set;}
        }
        public class AnswerText
        {
            [JsonProperty("imageTitle")]
            public string ImageTitle {get; set;}   
            [JsonProperty("questionstext")]
            public string QuestionsText {get; set;}
            [JsonProperty("answerstext")]
            public string AnswersText {get; set;}
        }
        
        public static class Answers 
        {
            [FunctionName("saveAnswers")]
        public static  void RunSave(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "answers/{questionId}")] HttpRequest req,
            [CosmosDB(
                databaseName: "medimages",
                collectionName: "Answers",
                ConnectionStringSetting = "CosmosDBConnection")
            ] out dynamic document,
            string questionId,
            ILogger log)
        {
            log.LogInformation($"C# save answers for ");
            document = null;

            // Verify identity
            ClaimsPrincipal principal = ClientPrincipal.Parse(req);
            if (!principal.IsInRole("contributor") && !principal.IsInRole("reader"))
                return;

            string userId = principal.Identity.Name;

            string requestBody = new StreamReader(req.Body).ReadToEnd();
            var input = JsonConvert.DeserializeObject<List<AnswersProps>>(requestBody);
            

            document = new { id = userId, questionId = questionId, AnswersJson = input }; //new object[] { requestBody } };
        }
            
            /*[FunctionName("getAnswers")]
            public static async Task<IActionResult> RunGet(
                [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "answers/{imageId}")] HttpRequest req,
                [CosmosDB(
                    databaseName: "medimages",
                    collectionName: "Answers",
                    ConnectionStringSetting = "CosmosDBConnection")
                ]  DocumentClient client,
                string imageId,
                ILogger log)
            {
                log.LogInformation($"function GetAnswers ");

                // Verify identity
                ClaimsPrincipal principal = ClientPrincipal.Parse(req);
                if (!principal.IsInRole("contributor"))
                    return new UnauthorizedResult();

                string userId = principal.Identity.Name;
                AnswersItem answers = null;
                try
                {
                    var response = await client.ReadDocumentAsync(
                        UriFactory.CreateDocumentUri("medimages", "Answers", userId),
                        new RequestOptions { PartitionKey = new Microsoft.Azure.Documents.PartitionKey(imageId) });

                    answers = (AnswersItem)(dynamic)response.Resource;
                    log.LogInformation($"function GetQuestions invoked");

                } catch (Exception ) {
                    log.LogError($"Cant find Questions entry for  in cosmosdb");
                    return new NotFoundResult();
                }
                log.LogInformation($"Retrieved questions ");
                if ( answers != null && answers.AnswersJson != null)
                  return new OkObjectResult(answers.AnswersJson);
                else
                  return new NotFoundResult();
            }*/
        }
}

