using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System;


namespace IdentityManagement.Models
{
    public class UserContext : DbContext
    {

        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}