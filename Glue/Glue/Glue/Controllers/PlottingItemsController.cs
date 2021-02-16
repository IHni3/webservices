using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Glue.Models;

namespace Glue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlottingItemsController : ControllerBase
    {
        // GET: api/PlottingItems/id/intervall
        [HttpGet("{id}, {intervall}")]
        public List<PlottingItem> GetPlottingItem(string id, string intervall)
        {
            List<PlottingItem> plottingAwnsers = new List<PlottingItem>();

            switch (intervall)
            {
                case "today":
                    DayPlott dayPlott = new DayPlott();
                    plottingAwnsers = dayPlott.GetPlott(id, intervall);
                    break;

                case "month":
                    MonthPlott monthPlott = new MonthPlott();
                    plottingAwnsers = monthPlott.GetPlott(id, intervall);
                    break;

                case "6month":
                    SixMonthPlott sixMonthPlott = new SixMonthPlott();
                    plottingAwnsers = sixMonthPlott.GetPlott(id, intervall, 26);
                    break;

                case "year":
                    SixMonthPlott yearPlott = new SixMonthPlott();
                    plottingAwnsers = yearPlott.GetPlott(id, intervall, 52);
                    break;

                case "max":
                    MaxPlott maxPlott = new MaxPlott();
                    plottingAwnsers = maxPlott.GetPlott(id, intervall);
                    break;
            }
            // return PlottingItem List
            return plottingAwnsers;
        }        
    }
}
