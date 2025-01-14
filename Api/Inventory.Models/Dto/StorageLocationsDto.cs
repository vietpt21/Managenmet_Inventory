using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Models.Dto
{
    public class StorageLocationsDto
    {
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public string SpecificLocation { get; set; }
        public string Note { get; set; }
    }
}
