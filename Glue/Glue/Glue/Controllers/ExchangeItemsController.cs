using Microsoft.AspNetCore.Mvc;
using Glue.Models;
using System.Net;
using System.IO;
using Newtonsoft.Json;

namespace Glue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExchangeItemsController : ControllerBase
    {
        string apiKey = Program.GetApiKey();
        string cacheServiceURI = Program.GetCacheServiceURI();


        // GET: api/ExchangeItems/id
        [HttpGet("{id}")]
        public ExchangeItem GetExchangeItem(string id)
        {
            ExchangeItem response = new ExchangeItem();
            response.ID = id;


            // create CacheItem JSON and ask Cache about the Name resolving querry
            CacheItem cacheitemName = new CacheItem();
            cacheitemName.URL = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=" + id + "&apikey=" + apiKey;
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

            //deserializnig Json to a ExchangeItem object
            var httpResponseName = (HttpWebResponse)requestName.GetResponse();
            using (var streamReader = new StreamReader(httpResponseName.GetResponseStream()))
            {
                //divide Json to single piece and cutoff escape characters and other unwanted stuff.
                var result = streamReader.ReadToEnd();
                string[] dat = result.Split('\n');
                string fromName = dat[3];                
                string fromSymbol = dat[2];
                string toName = dat[5];
                string rate = dat[6];
                fromName = fromName.Substring(34, (fromName.Length - 36));
                fromSymbol = fromSymbol.Substring(34, (fromSymbol.Length - 36));
                toName = toName.Substring(32, (toName.Length - 34));
                rate = rate.Substring(29, (rate.Length - 31));
                response.From_CurrencyName = fromName;
                response.From_CurrencyCode = fromSymbol;
                response.To_CurrencyName = toName;
                // transforming the String to a float number. Transforming the decimal mark from . to ,
                float exchangeRate = float.Parse(rate, System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
                response.ExchangeRate = exchangeRate;
            }
            return response;
        }       
    }
}
