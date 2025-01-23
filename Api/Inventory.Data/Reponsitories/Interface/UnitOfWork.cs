using Inventory.Data.Data;
using Inventory.Data.Reponsitories.Implements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Data.Reponsitories.Interface
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _db;
        public IStorageLocationsRepository storageLocationsRepository { get; private set; }

        public IProductRepository productRepository { get; private set; }
        public IInventoryRepository inventoryRepository { get; private set; }
        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            storageLocationsRepository = new StorageLocationsRepository(_db);
            productRepository = new ProductRepository(_db);
            inventoryRepository = new InventoryRepository(_db);

        }
    }
}
