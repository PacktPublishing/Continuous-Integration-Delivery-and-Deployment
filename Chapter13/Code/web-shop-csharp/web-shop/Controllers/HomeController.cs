using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web_shop.Database;

namespace web_shop.Controllers
{
    public class HomeController : Controller
    {
        private readonly WebShopContext context;

        public HomeController(WebShopContext context)
        {
            this.context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult GetTopProducts()
        {
            var products = context?.Products
                .Select(p => new
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price
                }).Take(3)
                .ToList();
            return Json(products);
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
