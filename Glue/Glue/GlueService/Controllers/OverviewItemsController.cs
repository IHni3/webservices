using Microsoft.AspNetCore.Mvc;
using Glue.Models;
using System.Net;
using System.IO;
using Newtonsoft.Json;
using System.Collections.Generic;
using System;

namespace Glue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OverviewItemsController : ControllerBase
    {
        string apiKey = Program.GetApiKey();
        string cacheServiceURI = Program.GetCacheServiceURI();
        List<string> symbols = new List<string>();



        [HttpPost]
        public List<OverviewItem> GetOverviewItems(string token)
        {
            try
            {

                // token is now token of user
                string jsonName = "{\"token\": \"" + token + "\"}";


                // send request and json body to StockService
                string uriName = cacheServiceURI + "api/cacheItems";
                HttpWebRequest requestName = (HttpWebRequest)WebRequest.Create("http://hostess:4001/stocks/getList");
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
                    string[] dat = result.Split('"');
                    int size = dat.Length;
                    size = (size - 3) / 2;
                    int pos = 3;
                    for (int i = 0; i < size; i++)
                    {
                        symbols.Add(dat[pos]);
                        pos += 2;
                    }
                }

                List<OverviewItem> overview = new List<OverviewItem>();

                foreach (string symbol in symbols)
                {
                    OverviewItem response = new OverviewItem();
                    response.ID = symbol;

                    try
                    {
                        #region name resolving
                        // create CacheItem JSON and ask Cache about the Name resolving querry
                        CacheItem cacheitemName = new CacheItem();
                        cacheitemName.ID = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + symbol + "&apikey=" + apiKey;
                        cacheitemName.Querry = "";
                        cacheitemName.Awnser = "";
                        jsonName = JsonConvert.SerializeObject(cacheitemName);

                        // send request and json body to CacheService
                        uriName = cacheServiceURI + "api/cacheItems";
                        requestName = (HttpWebRequest)WebRequest.Create(uriName);
                        requestName.ContentType = "application/json; charset=utf-8";
                        requestName.Method = "POST";

                        using (var streamWriter = new StreamWriter(requestName.GetRequestStream()))
                        {
                            streamWriter.Write(jsonName);
                            streamWriter.Flush();
                        }

                        //deserializnig Json to a OverviewItem object
                        httpResponseName = (HttpWebResponse)requestName.GetResponse();
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
                        cacheitemPrice.ID = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=5min&apikey=" + apiKey;
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
                            string date = dat[10];
                            date = date.Substring(9, date.Length - 13);
                            response.TimeStamp = date;
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
                            float dif = ((price / open) - 1) * 100;
                            response.Trend = dif;
                            dif = price - open;
                            response.Difference = dif;
                        }
                        #endregion
                     overview.Add(response);
                        // skip the Stock that had the wrong symbol
                    } catch { }
                   

                }
                // return OverviewItem List
                return overview;
            } catch (Exception e)
            {
                Response.StatusCode = 400;
                List<OverviewItem> overview = new List<OverviewItem>();
                OverviewItem fail = new OverviewItem();
                fail.Name = "Wrong input from User, may be the Symbol";
                overview.Add(fail);
                return overview;
            }
}
    }
}
