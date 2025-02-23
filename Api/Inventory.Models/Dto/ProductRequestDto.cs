using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Inventory.Models.Dto
{
    public class ProductRequestDto
    {
        public string ProductName { get; set; }
        public string Category { get; set; }
        public string DeviceType { get; set; }
        public int LocationId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public IFormFile Image { get; set; }
        
    }
}
