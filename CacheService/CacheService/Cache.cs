using System;
using Microsoft.Extensions.Caching.Memory;

namespace CacheService
{
    public class Cache<TItem>
    {

        // Setting the size limit of the cache.
        private static MemoryCache _cache = new MemoryCache(new MemoryCacheOptions()
        {
            SizeLimit = 1024
        });

        public static TItem GetOrCreate(object key, Func<TItem> createItem)
        {
            TItem cacheEntry;
            if (!_cache.TryGetValue(key, out cacheEntry))// Look for cache hashkey.
            {
                // Hashkey not in cache, so get data.
                cacheEntry = createItem();

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                 .SetSize(1)//Size amount
                            //Priority on removing when reaching size limit (memory pressure)
                    .SetPriority(CacheItemPriority.High)
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromSeconds(30))
                    // Remove from cache after this time, regardless of sliding expiration
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(5));

                // Save data in cache.
                _cache.Set(key, cacheEntry, cacheEntryOptions);
            }
            return cacheEntry;
        }


    }
}
