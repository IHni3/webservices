using System;

namespace Glue.Models
{
    public class OverviewItem
    {
        public String Name { get; set; }
        public String ID { get; set; }
        public float Price { get; set; }
        public float Trend { get; set; }
        public float Difference { get; set; }
        public string TimeStamp { get; set; }
    }
}
