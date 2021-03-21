using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Glue.Models;
using System.Net;
using System.IO;
using Newtonsoft.Json;
using Glue;

namespace GlueService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableItemsController : ControllerBase
    {
        private readonly TableItemContext _context;

        public TableItemsController(TableItemContext context)
        {
            _context = context;
        }



        // POST: api/TableItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public List<TableItem> GetTableItem(string id)
        {
            string apiKey = Program.GetApiKey();
            string cacheServiceURI = Program.GetCacheServiceURI();
            List<TableItem> tableAwnsers = new List<TableItem>();
            try
            {

                // create CacheItem JSON and ask Cache about the Name resolving querry
                CacheItem cacheitemName = new CacheItem();
                cacheitemName.ID = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + id + "&apikey=" + apiKey;
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

                //deserializnig Json to a TableItem object
                var httpResponseName = (HttpWebResponse)requestName.GetResponse();
                using (var streamReader = new StreamReader(httpResponseName.GetResponseStream()))
                {
                    //divide Json to single piece and cutoff escape characters and other unwanted stuff.
                    var result = streamReader.ReadToEnd();
                    string[] dat = result.Split('\n');
                    TableItem threeMonth = new TableItem();

                    // generating table for 3 Months
                    threeMonth.Period = "3 month";
                    string courseString = dat[12];
                    courseString = courseString.Substring(25, (courseString.Length - 27));
                    // transforming the String to a float number. Transforming the decimal mark from . to ,
                    float price = float.Parse(courseString, System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
                    courseString = dat[12 + (7 * 3)];
                    courseString = courseString.Substring(25, (courseString.Length - 27));
                    // transforming the String to a float number. Transforming the decimal mark from . to ,
                    float course = float.Parse(courseString, System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
                    float dif = ((price / course) - 1) * 100;
                    threeMonth.Abs = dif;
                    threeMonth.PerAnno = dif;
                    tableAwnsers.Add(threeMonth);

                    // generating table for 6 months
                    TableItem sixMonth = new TableItem();
                    sixMonth.Period = "6 month";
                    courseString = dat[12 + (7 * 6)];
                    courseString = courseString.Substring(25, (courseString.Length - 27));
                    // transforming the String to a float number. Transforming the decimal mark from . to ,
                    course = float.Parse(courseString, System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
                    dif = ((price / course) - 1) * 100;
                    sixMonth.Abs = dif;
                    sixMonth.PerAnno = dif;
                    tableAwnsers.Add(sixMonth);

                    // generating table for 1 year
                    TableItem oneYear = new TableItem();
                    oneYear.Period = "1 year";
                    courseString = dat[12 + (7 * 12)];
                    courseString = courseString.Substring(25, (courseString.Length - 27));
                    // transforming the String to a float number. Transforming the decimal mark from . to ,
                    course = float.Parse(courseString, System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
                    dif = ((price / course) - 1) * 100;
                    oneYear.Abs = dif;
                    oneYear.PerAnno = dif;
                    tableAwnsers.Add(oneYear);

                    // generating table for 5 years
                    TableItem fiveYear = new TableItem();
                    fiveYear.Period = "5 years";
                    courseString = dat[12 + (7 * 60)];
                    courseString = courseString.Substring(25, (courseString.Length - 27));
                    // transforming the String to a float number. Transforming the decimal mark from . to ,
                    course = float.Parse(courseString, System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
                    dif = ((price / course) - 1) * 100;
                    fiveYear.Abs = dif;
                    fiveYear.PerAnno = dif / 5;
                    tableAwnsers.Add(fiveYear);

                    // generating table for 10 years
                    TableItem tenYear = new TableItem();
                    tenYear.Period = "10 years";
                    courseString = dat[12 + (7 * 120)];
                    courseString = courseString.Substring(25, (courseString.Length - 27));
                    // transforming the String to a float number. Transforming the decimal mark from . to ,
                    course = float.Parse(courseString, System.Globalization.CultureInfo.InvariantCulture.NumberFormat);
                    dif = ((price / course) - 1) * 100;
                    tenYear.Abs = dif;
                    tenYear.PerAnno = dif / 10;
                    tableAwnsers.Add(tenYear);
                }
                return tableAwnsers;
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                TableItem fail = new TableItem();
                fail.Period = "Wrong Userinput";
                tableAwnsers.Add(fail);
                return tableAwnsers;
            }
        }
    }
}
