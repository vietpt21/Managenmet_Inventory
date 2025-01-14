using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Models.Model
{
    public class StorageLocations
    {
        [Key]
        [Column("location_id")]
        public int LocationId { get; set; }
        [Required]
        [Column("location_name")]
        public string LocationName { get; set; }

        [Required]
        [Column("specific_location")]
        public string SpecificLocation { get; set; }
        [Required]
        [Column("note")]
        public string Note { get; set; }
        
    }
}
