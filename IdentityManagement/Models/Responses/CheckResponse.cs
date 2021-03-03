namespace IdentityManagement.Models.Responses
{
    public class CheckResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public CheckResponse(User user)
        {
            Id = user.Id;
            FirstName = user.Firstname;
            LastName = user.Lastname;
            Email = user.Email;
        }
    }
}