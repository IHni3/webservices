using Microsoft.EntityFrameworkCore;

namespace Glue.Models
{
    public class PlottingContext : DbContext
    {
        public PlottingContext(DbContextOptions<PlottingContext> options)
              : base(options)
        {
        }

        public DbSet<PlottingItem> PlottingItems { get; set; }
    }
}
