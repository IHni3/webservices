namespace IdentityManagement.Models.Requests
{
    public class UpdateRequest{
        public string Email {get; set;}
        public string Firstname {get; set;}
        public string Lastname {get; set;}
        public string PasswordHash {get; set;}
        public int Id {get; set;}
    }
}