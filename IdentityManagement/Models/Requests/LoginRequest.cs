namespace IdentityManagement.Models.Requests
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