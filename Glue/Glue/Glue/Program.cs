using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System;

namespace Glue
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static String GetApiKey()
        {
            // Key for realease
            string apiKey = "BBWFMJV26IKOX2AJ";
            // Key for testing
            //string apiKey = "demo";
            return apiKey;            
        }

        public static String GetCacheServiceURI()
        {
            string cacheServiceURI = "https://localhost:5001/";
            return cacheServiceURI;
        }
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseUrls("https://localhost:5003/");
                });
    }
}
