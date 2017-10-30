using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using web_shop.Database;
using web_shop.Invoicing;

namespace web_shop.Controllers
{
    public class ShoppingCartController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetCart()
        {
            string username = HttpContext.Session.GetString("Username");
            IActionResult result = null;
            if (!string.IsNullOrWhiteSpace(username))
            {
                using (var context = new WebShopContext())
                {
                    result = Json(new
                    {
                        Authenticated = true,
                        ShoppingCart = context.ShoppingCarts
                            .Where(c => c.User.Username == username)
                            .Select(c => new
                            {
                                Number = c.Number,
                                Product = new
                                {
                                    Id = c.ProductId,
                                    Name = c.Product.Name,
                                    Price = c.Product.Price
                                }
                            }).ToList()
                    });
                }
            }
            return result ?? Json(new
            {
                Authenticated = false
            });
        }

        public IActionResult AddProductToCart([FromBody]ValueModel<int> model)
        {
            string username = HttpContext.Session.GetString("Username");
            bool authenticated = false;
            if (!string.IsNullOrWhiteSpace(username))
            {
                using (var context = new WebShopContext())
                {
                    context.AddProductToCart(username, model.Value);
                    authenticated = true;
                }
            }
            return Json(new
            {
                Authenticated = authenticated
            });
        }

        public IActionResult RemoveProductFromCart([FromBody]ValueModel<int> model)
        {
            string username = HttpContext.Session.GetString("Username");
            bool authenticated = false;
            if (!string.IsNullOrWhiteSpace(username))
            {
                using (var context = new WebShopContext())
                {
                    var cart = context.ShoppingCarts
                        .Where(c => c.User.Username == username && c.ProductId == model.Value)
                        .Single();
                    context.ShoppingCarts.Remove(cart);
                    context.SaveChanges();
                    authenticated = true;
                }
            }
            return Json(new
            {
                Authenticated = authenticated
            });
        }
    }
}
