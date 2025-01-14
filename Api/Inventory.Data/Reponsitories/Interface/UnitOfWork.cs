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


        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            storageLocationsRepository = new StorageLocationsRepository(_db);
        }
    }
}
