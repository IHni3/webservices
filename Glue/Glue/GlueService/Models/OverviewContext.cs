using Microsoft.EntityFrameworkCore;

namespace Glue.Models
{
    public class OverviewContext : DbContext
    {
        public OverviewContext(DbContextOptions<OverviewContext> options)
            : base(options)
        {
        }

        public DbSet<OverviewItem> OverviewItems { get; set; }
    }
}
