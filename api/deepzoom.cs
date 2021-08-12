using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Net.Http;
using Azure.Identity;
using Azure.Core;


namespace Microsoft.Function
{
    public static class deepzoom
    {
        // Create a single, static HttpClient https://docs.microsoft.com/en-us/azure/azure-functions/manage-connections
        private static HttpClient httpClient = new HttpClient();

      

        [FunctionName("deepzoom")]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "deepzoom/{*restOfPath}")] HttpRequest req, 
                   string restOfPath, ILogger log)
        {
            log.LogInformation("DeepZoom C# HTTP trigger function processed a request.");
            ClaimsPrincipal principal = ClientPrincipal.Parse(req);

            log.LogInformation($"DeepZoom Roles: {principal.Identity}" );
            if (!principal.IsInRole("contributor") && !principal.IsInRole("reader"))
                return new HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);

            // rewrite backend URL 
            string backend = System.Environment.GetEnvironmentVariable("backend_url", EnvironmentVariableTarget.Process) 
                            + restOfPath;

            // add Identity Token https://docs.microsoft.com/en-us/dotnet/api/overview/azure/identity-readme#environment-variables
            DefaultAzureCredential credential = new DefaultAzureCredential();
            var accessToken = credential.GetToken(new TokenRequestContext(new[] { "https://storage.azure.com/.default" })).Token;

            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
            httpClient.DefaultRequestHeaders.Add("x-ms-version", "2017-11-09");
           // httpClient.DefaultRequestHeaders.Add("x-ms-date");

            log.LogInformation($"C# HTTP trigger function calling backend {backend}");
            return await httpClient.GetAsync(backend);
        }
    }
}
