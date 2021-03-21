using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System;


namespace Stocks.Models
{
    public class UserContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
            .Property(u => u.isins)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());
        }       
    }
}