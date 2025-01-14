using Inventory.Data.Data;
using Inventory.Data.Reponsitories.Implements;
using Inventory.Models.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Data.Reponsitories.Interface
{
    public class StorageLocationsRepository : IStorageLocationsRepository
    {
        private readonly ApplicationDbContext dbContext;

        public StorageLocationsRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<StorageLocations> CreateAsync(StorageLocations obj)
        {
            try
            {
                dbContext.storageLocations.Add(obj);
                await dbContext.SaveChangesAsync();
                return obj;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating record: {ex.Message}");
                return null;
            }
        }

        public async Task<StorageLocations> DeleteAsync(int id)
        {
            var existing = await dbContext.storageLocations.FirstOrDefaultAsync(x => x.LocationId == id);

            if (existing is null)
            {
                return null;
            }

            dbContext.storageLocations.Remove(existing);
            await dbContext.SaveChangesAsync();
            return existing;
        }

        public async Task<IEnumerable<StorageLocations>> GetAllAsync()
        {
            try
            {
                return await dbContext.storageLocations.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching data: {ex.Message}");
                return Enumerable.Empty<StorageLocations>();
            }
        }

        public async Task<StorageLocations> GetByIdAsync(int id)
        {
            return await dbContext.storageLocations.FirstOrDefaultAsync(x => x.LocationId == id);
        }

        public async Task<StorageLocations> UpdateAsync(StorageLocations obj)
        {
            var existing = await dbContext.storageLocations.FirstOrDefaultAsync(x => x.LocationId == obj.LocationId);

            if (existing != null)
            {
                dbContext.Entry(existing).CurrentValues.SetValues(obj);
                await dbContext.SaveChangesAsync();
                return obj;
            }

            return null;
        }
    }
}
