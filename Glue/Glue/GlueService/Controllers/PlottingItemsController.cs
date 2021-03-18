using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Glue.Models;

namespace Glue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlottingItemsController : ControllerBase
    {
        // GET: api/PlottingItems/symbol/intervall
       // [HttpGet("{symbol}, {intervall}")]
        [HttpPost]
        public List<PlottingItem> GetPlottingItem(string symbol, string intervall)
        {
            List<PlottingItem> plottingAwnsers = new List<PlottingItem>();

            switch (intervall)
            {
                case "today":
                    DayPlott dayPlott = new DayPlott();
                    plottingAwnsers = dayPlott.GetPlott(symbol, intervall);
                    break;

                case "month":
                    MonthPlott monthPlott = new MonthPlott();
                    plottingAwnsers = monthPlott.GetPlott(symbol, intervall);
                    break;

                case "6month":
                    SixMonthPlott sixMonthPlott = new SixMonthPlott();
                    plottingAwnsers = sixMonthPlott.GetPlott(symbol, intervall, 26);
                    break;

                case "year":
                    SixMonthPlott yearPlott = new SixMonthPlott();
                    plottingAwnsers = yearPlott.GetPlott(symbol, intervall, 52);
                    break;

                case "max":
                    MaxPlott maxPlott = new MaxPlott();
                    plottingAwnsers = maxPlott.GetPlott(symbol, intervall);
                    break;
            }
            // return PlottingItem List
            return plottingAwnsers;
        }        
    }
}
