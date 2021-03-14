using Microsoft.EntityFrameworkCore;

namespace Glue.Models
{
    public class ExchangeContext : DbContext
    {
        public ExchangeContext(DbContextOptions<ExchangeContext> options) : base(options)
        {
        }

        public DbSet<ExchangeItem> ExchangeItems { get; set; }
    }
}
