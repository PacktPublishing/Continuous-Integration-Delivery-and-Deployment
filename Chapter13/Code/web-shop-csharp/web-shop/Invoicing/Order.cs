using System.Collections.Generic;
using System.Linq;

namespace web_shop.Invoicing
{
    public class Order
    {
        public List<OrderLine> Lines { get; set; }
        public decimal GetTotal()
        {
            return Lines.Sum(l => l.GetSubTotal());
         }
    }
}