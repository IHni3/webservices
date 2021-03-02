namespace IdentityManagement.Models
{
    public class LoginRequest{
        public string email {get; set;}
        public string passwordHash {get; set;}

        public LoginRequest(string email, string passwordHash){
            this.email = email;
            this.passwordHash = passwordHash;
        }
    }
}