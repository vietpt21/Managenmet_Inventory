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
    public class Product
    {
        [Key]
        [Column("product_id")]
        public int ProductId { get; set; }

        [Required]
        [Column("product_name")]
        public string ProductName { get; set; }

        [Required]
        [Column("category")]
        public string Category { get; set; }

        [Required]
        [Column("device_type")]
        public string DeviceType { get; set; }

        [Required]
        [Column("location_id")]
        public int LocationId { get; set; } 

        [Required]
        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        
        [ForeignKey(nameof(LocationId))]
        public virtual StorageLocations StorageLocations { get; set; }

       
    }

}
