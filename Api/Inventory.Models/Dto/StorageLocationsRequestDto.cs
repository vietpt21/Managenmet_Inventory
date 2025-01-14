using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Models.Dto
{
    public class StorageLocationsRequestDto
    {
        public string LocationName { get; set; }
        public string SpecificLocation { get; set; }
        public string Note { get; set; }
    }
}
