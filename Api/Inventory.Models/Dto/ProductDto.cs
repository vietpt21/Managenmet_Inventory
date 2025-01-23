using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Models.Dto
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Category { get; set; }
        public string DeviceType { get; set; }
        public int LocationId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public StorageLocationsDto StorageLocations{ get; set; } = new StorageLocationsDto();
    }
}
