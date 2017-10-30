using System.ComponentModel.DataAnnotations.Schema;

namespace web_shop.Database
{
    [Table("shopping_cart")]
    public class ShoppingCart
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("product_id")]
        public int ProductId { get; set; }
        [Column("number")]
        public int Number { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}