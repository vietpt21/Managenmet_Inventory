using Inventory.Models.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Data.Reponsitories.Implements
{
    public interface IStorageLocationsRepository
    {
        Task<IEnumerable<StorageLocations>> GetAllAsync();
        Task<StorageLocations> CreateAsync(StorageLocations obj);
        Task<StorageLocations> UpdateAsync(StorageLocations obj);
        Task<StorageLocations> DeleteAsync(int id);
        Task<StorageLocations> GetByIdAsync(int id);
    }
}
