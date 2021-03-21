namespace IdentityManagement.Models
{
    public class User {
        public string Firstname {get; set;}
        public string Lastname {get; set;}
        public string Email {get; set;}
        public string PasswordHash {get; set;}
        public int Id {get; set;}
        
    }
}