using Microsoft.EntityFrameworkCore;

namespace CacheService.Models
{
    public class CacheContext : DbContext
    {
        public CacheContext(DbContextOptions<CacheContext> options)
            : base(options)
        {
        }

        public DbSet<CacheItem> CacheItems { get; set; }
    }
}
