using System.Collections.Generic;
using Stocks.Models.Exceptions;

namespace Stocks.Models.Responses
{
    public class ListResponse
    {
        public IList<string> isins {get; set;}
    }
}