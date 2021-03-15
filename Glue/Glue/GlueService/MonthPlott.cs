﻿using System.Collections.Generic;
using Glue.Models;
using System.Net;
using System.IO;
using Newtonsoft.Json;

namespace Glue
{
    public class MonthPlott
    {
        string apiKey = Program.GetApiKey();
        string cacheServiceURI = Program.GetCacheServiceURI();
        List<PlottingItem> plottingAwnsers = new List<PlottingItem>();

        public List<PlottingItem> GetPlott(string id, string intervall)
        {
            // create CacheItem JSON and ask Cache about the Name resolving querry
            CacheItem cacheitemName = new CacheItem();
            cacheitemName.ID = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + id + "&apikey=" + apiKey;
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

            //deserializnig Json to a PlottingItem object
            var httpResponseName = (HttpWebResponse)requestName.GetResponse();
            using (var streamReader = new StreamReader(httpResponseName.GetResponseStream()))
            {
                //divide Json to single piece and cutoff escape characters and other unwanted stuff.
                var result = streamReader.ReadToEnd();
                string[] dat = result.Split('\n');
                // getting the data of the last 20 bussines days
                for (int i = 0; i < 20; i++)
                {
                    string date = dat[9 + (7 * i)];
                    string courseString = dat[13 + (7 * i)];
                    date = date.Substring(9, (date.Length - 13));
                    courseString = courseString.Substring(25, (courseString.Length - 27));
                    // transforming the String to a float number. Transforming the decimal mark from . to ,
                    float course = float.Parse(courseString, System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
                    PlottingItem tht = new PlottingItem();
                    tht.Date = date;
                    tht.Price = course;
                    tht.Symbol = id;
                    plottingAwnsers.Add(tht);
                }
            }
            return plottingAwnsers;
        }
    }
}
