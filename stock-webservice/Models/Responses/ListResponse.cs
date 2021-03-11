using System.Collections.Generic;
using IdentityManagement.Models.Exceptions;

namespace IdentityManagement.Models.Responses
{
    public class ListResponse
    {
        public IList<string> isins {get; set;}
    }
}