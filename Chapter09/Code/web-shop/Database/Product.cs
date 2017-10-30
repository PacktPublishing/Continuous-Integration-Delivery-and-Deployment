using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace web_shop.Database
{
    [Table("product")]
    public class Product
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("price")]
        public decimal Price { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("category")]
        public string Category { get; set; }
    }
}