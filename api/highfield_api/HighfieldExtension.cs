using System.Net;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace highfield_api
{
    public static class HighfieldExtension
    {
        public static IApplicationBuilder PopulateDb(this IApplicationBuilder app)
        {
            using (IServiceScope serviceScope = app.ApplicationServices.CreateScope())
            {
                WebClient client = new WebClient();
                string baseUrl = "https://recruitment.highfieldqualifications.com";


                string content = client.DownloadString($"{baseUrl}/api/test");
                string contentCleaned = Regex.Replace(content, @"\t|\n|\r", "");

                
                List<User> userList = JsonSerializer.Deserialize<List<User>>(contentCleaned);
           

                return app.PopulateDb();
            }
        }
    }
}
