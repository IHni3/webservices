namespace IdentityManagement.Models
{
    public class RegisterRequest{
        public string Email {get; set;}
        public string Firstname {get; set;}
        public string Lastname {get; set;}
        public string PasswordHash {get; set;}
    }
}