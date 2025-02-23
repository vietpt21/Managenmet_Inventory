using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Data.Reponsitories.Implements
{
    public interface IUnitOfWork
    {
        IStorageLocationsRepository storageLocationsRepository { get; }
        IProductRepository productRepository { get; }
        IInventoryRepository inventoryRepository { get; }
       
    }
}
