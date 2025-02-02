namespace IdentityManagement.Models.Responses
{
    public class LoginResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }

        public LoginResponse(User user, string token)
        {
            Id = user.Id;
            FirstName = user.Firstname;
            LastName = user.Lastname;
            Email = user.Email;
            Token = token;
        }
    }
}