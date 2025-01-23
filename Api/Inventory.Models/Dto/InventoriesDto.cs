using Inventory.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Models.Dto
{
    public class InventoriesDto
    {
        public int InventoryId { get; set; }
        public int ProductId { get; set; }
        public string Type { get; set; }
   
        public string Condition { get; set; }

        public DateTime TransactionDate { get; set; }

        public int Quantity { get; set; }

        public Product Product { get; set; } = new Product();
    }
}
