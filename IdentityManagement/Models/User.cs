using System;

namespace IdentityManagement.Models
{
    public class User{
        public string name {get; set;}
        public string surename {get; set;}
        public DateTime birthday {get; set;}
        public string email {get; set;}
        public string passwordHash {get; set;}
    }
}