namespace IdentityManagement.Models
{
    public class LoginRequest{
        public string email {get; set;}
        public string passwordHash {get; set;}
    }
}