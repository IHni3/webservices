using Microsoft.EntityFrameworkCore;

namespace Glue.Models
{
    public class SearchContext : DbContext
    {
        public SearchContext(DbContextOptions<SearchContext> options)
              : base(options)
        {
        }

        public DbSet<SearchItem> SearchItems { get; set; }
    }
}
