using Microsoft.EntityFrameworkCore;

namespace Glue.Models
{
    public class TableItemContext : DbContext
    {
        public TableItemContext(DbContextOptions<TableItemContext> options)
              : base(options)
        {
        }

        public DbSet<TableItem> TableItems { get; set; }
    }
}