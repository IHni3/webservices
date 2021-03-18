using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Glue.Models;
using System.Net;
using System.IO;
using Newtonsoft.Json;
using System;

namespace Glue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchItemsController : ControllerBase
    {
        string apiKey = Program.GetApiKey();
        string cacheServiceURI = Program.GetCacheServiceURI();

        [HttpPost]
        public List<SearchItem> GetSearchItems(string search)
        {
            List<SearchItem> searchAwnsers = new List<SearchItem>();
            try
            {
                // create CacheItem JSON and ask Cache about the querry
                CacheItem cacheitem = new CacheItem();
                cacheitem.ID = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + search + "&apikey=" + apiKey;
                cacheitem.Querry = "";
                cacheitem.Awnser = "";
                string json = JsonConvert.SerializeObject(cacheitem);


                // send request and json body to CacheService
                string uri = cacheServiceURI + "api/cacheItems";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(uri);
                request.ContentType = "application/json; charset=utf-8";
                request.Method = "POST";

                using (var streamWriter = new StreamWriter(request.GetRequestStream()))
                {
                    streamWriter.Write(json);
                    streamWriter.Flush();
                }

                //deserializnig Json to a SearchItem object
                var httpResponse = (HttpWebResponse)request.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    var result = streamReader.ReadToEnd();
                    // cutoff for the header "best matches"
                    result = result.Substring(32);
                    string[] results = result.Split('{');
                    //divide Json to single pieces and cutoff escape characters and other unwanted stuff.
                    foreach (string zw in results)
                    {
                        string[] dat = zw.Split('\n');
                        string a1 = dat[1];
                        a1 = a1.Substring(26, (a1.Length - 28));
                        string b1 = dat[2];
                        b1 = b1.Substring(24, (b1.Length - 26));
                        SearchItem awnser = new SearchItem();
                        awnser.Symbol = a1;
                        awnser.Name = b1;
                        searchAwnsers.Add(awnser);
                    }
                }
                // return SearchItem
                return searchAwnsers;
            }
            catch (Exception e)
            {
                return searchAwnsers;
            }
        }
    }
}
