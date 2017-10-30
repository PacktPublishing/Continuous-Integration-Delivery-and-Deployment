using System.ComponentModel.DataAnnotations.Schema;

namespace web_shop.Database
{
    [Table("user")]
    public class User
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("username")]
        public string Username { get; set; }
        [Column("password")]
        public string Password { get; set; }
    }
}