using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Models.Dto
{
    public class InventorySummary
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string LocationName { get; set; }
        public string SpecificLocation { get; set; }
        public int TotalImportNew { get; set; }
        public int TotalImportOld { get; set; }
        public int TotalExportNew { get; set; }
        public int TotalExportOld { get; set; }
        public int FinalStockNew { get; set; }
        public int FinalStockOld { get; set; }
    }
}
