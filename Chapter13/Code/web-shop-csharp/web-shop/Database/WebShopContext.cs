using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace web_shop.Database
{
    public class WebShopContext : DbContext
    {
        public WebShopContext(DbContextOptions<WebShopContext> context)
            : base(context)
        { }

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        
        public  virtual void AddProductToCart(string username, int productId)
        {
            this.Database.ExecuteSqlCommand("SELECT add_product_to_cart(@username, @product_id);",
                new NpgsqlParameter("@username", username),
                new NpgsqlParameter("@product_id", productId));
        }
    }
}
