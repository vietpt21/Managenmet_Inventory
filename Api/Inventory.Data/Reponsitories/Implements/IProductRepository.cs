using Inventory.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Data.Reponsitories.Implements
{
    public interface IProductRepository
    {
        Task<Product> CreateAsync(Product obj);

        Task<IEnumerable<Product>> GetAllAsync();

        Task<Product?> GetByIdAsync(int id);

        Task<Product?> UpdateAsync(Product obj);

        Task<Product?> DeleteAsync(int id);
    }
}
