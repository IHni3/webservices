using IdentityManagement.Models.Exceptions;

namespace IdentityManagement.Models.Responses
{
    public class BadRequestResponse
    {
        public string Message {get; set;}

        public BadRequestResponse(BadRequestException exception){
            this.Message = exception.Message;
        }
    }
}