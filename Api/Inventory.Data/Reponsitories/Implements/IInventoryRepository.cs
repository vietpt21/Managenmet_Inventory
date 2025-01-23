using Inventory.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Data.Reponsitories.Implements
{
    public interface IInventoryRepository
    {
        Task<Inventories> CreateAsync(Inventories obj);
        Task<IEnumerable<Inventories>> GetAllAsync();
        Task<Inventories?> GetByIdAsync(int id);
        Task<Inventories?> UpdateAsync(Inventories obj);
        Task<Inventories?> DeleteAsync(int id);
    }
}
