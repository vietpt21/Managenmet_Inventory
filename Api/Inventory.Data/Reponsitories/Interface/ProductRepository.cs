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
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext dbContext;

        public ProductRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Product> CreateAsync(Product obj)
        {
            await dbContext.products.AddAsync(obj);
            await dbContext.SaveChangesAsync();
            return obj;
        }

        public async Task<Product?> DeleteAsync(int id)
        {
            var existing = await dbContext.products.FirstOrDefaultAsync(x => x.ProductId == id);

            if (existing != null)
            {
                dbContext.products.Remove(existing);
                await dbContext.SaveChangesAsync();
                return existing;
            }

            return null;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await dbContext.products.Include(x => x.StorageLocations).ToListAsync();
        }

        public async Task<Product?> GetByIdAsync(int id)
        {
            return await dbContext.products.Include(x => x.StorageLocations).FirstOrDefaultAsync(x => x.ProductId == id);
        }

        public async Task<Product?> UpdateAsync(Product obj)
        {
            var existingProduct = await dbContext.products.Include(x => x.StorageLocations)
                 .FirstOrDefaultAsync(x => x.ProductId == obj.ProductId);

            if (existingProduct == null)
            {
                return null;
            }

            dbContext.Entry(existingProduct).CurrentValues.SetValues(obj);
            existingProduct.StorageLocations = obj.StorageLocations;

            await dbContext.SaveChangesAsync();

            return obj;
        }
    }
}
