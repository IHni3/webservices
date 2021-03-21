using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CacheService.Models;
using System.Net;
using System.IO;
using Newtonsoft.Json;

namespace CacheService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CacheItemsController : ControllerBase
    {
      
        private readonly CacheContext _context;

        public CacheItemsController(CacheContext context)
        {
            _context = context;
        }

        /* POST: api/CacheItems
           Structure of the GET request
            "URL":"URL from asked API",
            "Querry":"Querry from Asked API",
            "Awnser":"" - Should be left blank - 

          To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

          Function to look up a querry in the cache. 
          If the awnser is blank it forwards it to the asked API for a an awnser,
          else it just returnes the information from the cache

        Needs to be Post, or else Swagger won't look for parameters in Body.
        */
        [HttpPost]
        public async Task<ActionResult<String>> GetCacheItem(CacheItem cacheItem)
        {
            try
            {
                if (cacheItem.ID.Equals(null) || cacheItem.Querry.Equals(null))
                {
                    throw new ArgumentNullException("CacheItem was null");
                }
                else
                {
                    int hash = (cacheItem.ID.GetHashCode()) + (cacheItem.Querry.GetHashCode());
                    var querry = Cache<CacheItem>.GetOrCreate(hash, () => cacheItem);
                    if (querry.Awnser.Equals(""))
                    {
                        cacheItem.Awnser = Get(cacheItem.ID);
                        querry = Cache<CacheItem>.GetOrCreate(hash, () => cacheItem);
                    }
                    return querry.Awnser;
                }
            } catch
            {
                Response.StatusCode = 400;
                CacheItem fail = new CacheItem();
                fail.Awnser = "Wrong Userinput";
                return fail.Awnser;
            }
        }

        // Function to forward the querry if it isn't in the cache
        [HttpPost, Route("Throw")]
        public string Get(string uri)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(uri);
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                return reader.ReadToEnd();
            }
        }   
    }
}
