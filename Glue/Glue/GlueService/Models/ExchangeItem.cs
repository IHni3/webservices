namespace Glue.Models
{
    public class ExchangeItem
    {
        public string From_CurrencyCode { get; set; }
        public string From_CurrencyName { get; set; }
        public string CurrencyCode { get; set; }
        public string To_CurrencyName { get; set; }
        public float ExchangeRate { get; set; }       
    }
}
