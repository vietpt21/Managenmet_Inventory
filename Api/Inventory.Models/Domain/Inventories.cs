using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inventory.Models.Model;

namespace Inventory.Models.Domain
{
    public class Inventories
    {
        [Key]
        [Column("inventory_id")]
        public int InventoryId { get; set; } 

        [Column("product_id")]
        public int ProductId { get; set; } 

        [Required]
        [Column("type")]
        public string Type { get; set; } 

        [Required]
        [Column("condition")]
        public string Condition { get; set; } 

        [Required]
        [Column("transaction_date")]
        public DateTime TransactionDate { get; set; } 

        [Required]
        [Column("quantity")]
        public int Quantity { get; set; }

        [ForeignKey(nameof(ProductId))]
        public virtual Product Product { get; set; }
    }
}
