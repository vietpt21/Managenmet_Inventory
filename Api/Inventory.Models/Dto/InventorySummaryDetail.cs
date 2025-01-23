using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Models.Dto
{
    public class InventorySummaryDetail
    {
        public int STT { get; set; }
        public string ProductName { get; set; } 
        public string Category { get; set; }
        public string DeviceType { get; set; } 
        public string SpecificLocation { get; set; }
        public int BeginningStockNew { get; set; }
        public int BeginningStockOld { get; set; }
        public int ImportDuringPeriodNew { get; set; }
        public int ImportDuringPeriodOld { get; set; }
        public int ExportDuringPeriodNew { get; set; }
        public int ExportDuringPeriodOld { get; set; }
        public int EndingStockNew { get; set; }
        public int EndingStockOld { get; set; }
    }
}
