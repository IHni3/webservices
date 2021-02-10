using System;

namespace CacheService.Models
{
    public class CacheItem
    {
        // Class for the data structure that the cache uses.
        //public long Hash { get; set; }
        public String URL { get; set; }
        public String Querry { get; set; }
        public String Awnser { get; set; }

    }
}
