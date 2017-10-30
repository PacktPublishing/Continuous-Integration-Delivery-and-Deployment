using System;
using web_shop.Database;

namespace web_shop.Invoicing
{
    public class OrderLine
    {
        public Product Product { get; set; }
        public int Number { get; set; }
        public decimal GetSubTotal()
        {
            return Product.Price * Number;
        }
    }
}