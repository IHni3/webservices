using Microsoft.AspNetCore.Mvc;
using Glue.Models;
using System.Net;
using System.IO;
using Newtonsoft.Json;

namespace Glue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OverviewItemsController : ControllerBase
    {
        string apiKey = Program.GetApiKey();
        string cacheServiceURI = Program.GetCacheServiceURI();

        [HttpGet("{id}")]
        public OverviewItem GetOverviewItems(string id)
        {
            OverviewItem response = new OverviewItem();
            response.ID = id;

            #region name resolving
            // create CacheItem JSON and ask Cache about the Name resolving querry
            CacheItem cacheitemName = new CacheItem();
            cacheitemName.URL = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + id + "&apikey=" + apiKey;
            cacheitemName.Querry = "";
            cacheitemName.Awnser = "";
            string jsonName = JsonConvert.SerializeObject(cacheitemName);

            // send request and json body to CacheService
            string uriName = cacheServiceURI + "api/cacheItems";
            HttpWebRequest requestName = (HttpWebRequest)WebRequest.Create(uriName);
            requestName.ContentType = "application/json; charset=utf-8";
            requestName.Method = "POST";

            using (var streamWriter = new StreamWriter(requestName.GetRequestStream()))
            {
                streamWriter.Write(jsonName);
                streamWriter.Flush();
            }

            //deserializnig Json to a OverviewItem object
            var httpResponseName = (HttpWebResponse)requestName.GetResponse();
            using (var streamReader = new StreamReader(httpResponseName.GetResponseStream()))
            {
                //divide Json to single piece and cutoff escape characters and other unwanted stuff.
                var result = streamReader.ReadToEnd();
                string[] dat = result.Split('\n');
                string name = dat[3];
                name = name.Substring(13, (name.Length - 15));
                response.Name = name;      
            }
            #endregion

            #region price resolving 
            // create CacheItem JSON and ask Cache about the Name resolving querry
            CacheItem cacheitemPrice = new CacheItem();
            cacheitemPrice.URL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + id + "&interval=5min&apikey=" + apiKey;
            cacheitemPrice.Querry = "";
            cacheitemPrice.Awnser = "";
            string jsonPrice = JsonConvert.SerializeObject(cacheitemPrice);

            // send request and json body to CacheService
            string uriPrice = cacheServiceURI + "api/cacheItems";
            HttpWebRequest requestPrice = (HttpWebRequest)WebRequest.Create(uriPrice);
            requestPrice.ContentType = "application/json; charset=utf-8";
            requestPrice.Method = "POST";

            using (var streamWriter = new StreamWriter(requestPrice.GetRequestStream()))
            {
                streamWriter.Write(jsonPrice);
                streamWriter.Flush();
            }

            //deserializnig Json to a OverviewItem object
            var httpResponsePrice = (HttpWebResponse)requestPrice.GetResponse();
            using (var streamReader = new StreamReader(httpResponsePrice.GetResponseStream()))
            {
                //divide Json to single piece and cutoff escape characters and other unwanted stuff.
                var result = streamReader.ReadToEnd();
                string[] dat = result.Split('\n');
                string priceString = dat[14];
                priceString = priceString.Substring(25, (priceString.Length - 27));
                // transforming the String to a float number. Transforming the decimal mark from . to ,
                float price = float.Parse(priceString, System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
                response.Price = price;

                // open course of the day
                string openingString = dat[(dat.Length - 8)];
                openingString = openingString.Substring(24, (openingString.Length - 26));
                // transforming the String to a float number. Transforming the decimal mark from . to ,
                float open = float.Parse(openingString, System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
                // calculating the difference between opening course and last course
                float dif = (price / open) - 1;
                response.Trend = dif;
            }
            #endregion

            // return OverviewItem List
            return response;
        }       
    }
}
