using Inventory.Data.Data;
using Inventory.Data.Reponsitories.Implements;
using Inventory.Models.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Data.Reponsitories.Interface
{
    public class InventoryRepository : IInventoryRepository
    {
        private readonly ApplicationDbContext dbContext;

        public InventoryRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Inventories> CreateAsync(Inventories obj)
        {
            await dbContext.inventory.AddAsync(obj);
            await dbContext.SaveChangesAsync();
            return obj;
        }

        public async Task<Inventories?> DeleteAsync(int id)
        {
            var existing= await dbContext.inventory.FirstOrDefaultAsync(x => x.ProductId == id);

            if (existing != null)
            {
                dbContext.inventory.Remove(existing);
                await dbContext.SaveChangesAsync();
                return existing;
            }

            return null;
        }

        public async Task<IEnumerable<Inventories>> GetAllAsync()
        {
            return await dbContext.inventory.Include(x => x.Product).ToListAsync();
        }

        public async Task<Inventories?> GetByIdAsync(int id)
        {
            return await dbContext.inventory.Include(x => x.Product).FirstOrDefaultAsync(x => x.ProductId == id);
        }

        public async Task<Inventories?> UpdateAsync(Inventories obj)
        {
            var existing = await dbContext.inventory.Include(x => x.Product)
                 .FirstOrDefaultAsync(x => x.InventoryId == obj.InventoryId);

            if (existing == null)
            {
                return null;
            }

            dbContext.Entry(existing).CurrentValues.SetValues(obj);
            existing.Product = obj.Product;

            await dbContext.SaveChangesAsync();

            return obj;
        }
    }
}
