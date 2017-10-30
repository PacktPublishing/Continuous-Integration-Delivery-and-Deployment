using System.Linq;
using Microsoft.AspNetCore.Mvc;
using web_shop.Database;
using web_shop.Invoicing;

namespace web_shop.Controllers
{
    public class ProductController : Controller
    {
        private readonly WebShopContext context;

        public ProductController(WebShopContext context)
        {
            this.context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult GetProduct([FromBody]ValueModel<int> model)
        {
            var product = context.Products
                .Select(p => new
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Description = p.Description,
                    Category = p.Category
                })
                .SingleOrDefault(p => p.Id == model.Value);
            return Json(product);
        }
    }
}
