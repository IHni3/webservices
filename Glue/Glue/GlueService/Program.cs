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
            string cacheServiceURI = "http://hostess:4003/";
            //string cacheServiceURI = "https://localhost:44336/";
            return cacheServiceURI;
        }
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                   // webBuilder.UseUrls("http://localhost:5003");
                });
    }
}
