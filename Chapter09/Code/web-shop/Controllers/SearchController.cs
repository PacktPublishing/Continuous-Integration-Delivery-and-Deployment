using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using web_shop.Database;
using web_shop.Invoicing;

namespace web_shop.Controllers
{
    public class SearchController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SearchProducts([FromBody]ValueModel<string> model)
        {
            List<Product> products = null;
            if (!string.IsNullOrWhiteSpace(model.Value))
            {
                using (var context = new WebShopContext())
                {
                    products = context.Products
                        .Where(p => p.Name.ToLowerInvariant().Contains(model.Value.ToLowerInvariant()))
                        .ToList();
                }
            }
            return Json(products);
        }
    }
}
