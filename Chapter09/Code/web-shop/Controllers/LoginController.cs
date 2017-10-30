using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using web_shop.Database;
using web_shop.Models;

namespace web_shop.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Remove("Username");
            HttpContext.Session.Remove("IsAuthenticated");
            return RedirectToActionPermanent(nameof(Index));
        }

        [HttpPost]
        public IActionResult Login([FromBody]LoginModel model)
        {
            using (var context = new WebShopContext())
            {
                bool success = false;
                if (context.Users.Any(u => u.Username == model.Username && u.Password == model.Password))
                {
                    HttpContext.Session.SetString("Username", model.Username);
                    HttpContext.Session.SetString("IsAuthenticated", bool.TrueString);
                    success = true;
                }
                return Json(new
                {
                    Success = success
                });
            }
        }
    }
}
