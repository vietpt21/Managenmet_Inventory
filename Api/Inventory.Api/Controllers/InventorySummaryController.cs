using AutoMapper;
using Inventory.Data.Reponsitories.Implements;
using Inventory.Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventorySummaryController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public InventorySummaryController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var productList = await _unitOfWork.productRepository.GetAllAsync();
            var inventoryList = await _unitOfWork.inventoryRepository.GetAllAsync();

            var viewModel = productList.Select(product =>
            {
                var inventories = inventoryList.Where(i => i.ProductId == product.ProductId);

                return new InventorySummary
                {
                    ProductId = product.ProductId,
                    ProductName = product.ProductName,
                    LocationName = product.StorageLocations?.LocationName,
                    SpecificLocation = product.StorageLocations?.SpecificLocation,
                    TotalImportNew = inventories.Where(i => i.Type == "import" && i.Condition == "new").Sum(i => i.Quantity),
                    TotalImportOld = inventories.Where(i => i.Type == "import" && i.Condition == "old").Sum(i => i.Quantity),
                    TotalExportNew = inventories.Where(i => i.Type == "export" && i.Condition == "new").Sum(i => i.Quantity),
                    TotalExportOld = inventories.Where(i => i.Type == "export" && i.Condition == "old").Sum(i => i.Quantity),
                    FinalStockNew = inventories.Where(i => i.Type == "import" && i.Condition == "new").Sum(i => i.Quantity)
                                   - inventories.Where(i => i.Type == "export" && i.Condition == "new").Sum(i => i.Quantity),
                    FinalStockOld = inventories.Where(i => i.Type == "import" && i.Condition == "old").Sum(i => i.Quantity)
                                   - inventories.Where(i => i.Type == "export" && i.Condition == "old").Sum(i => i.Quantity)
                };
            });
            return Ok(viewModel);


        }
        [HttpGet("summary")]
        public async Task<IActionResult> GetAllWithDateRange(DateTime startDate, DateTime endDate)
        {
            var productList = await _unitOfWork.productRepository.GetAllAsync();
            var inventoryList = await _unitOfWork.inventoryRepository.GetAllAsync();
            var viewModel = productList.Select((product, index) =>
            {
                var inventories = inventoryList.Where(i => i.ProductId == product.ProductId);

                return new InventorySummaryDetail
                {
                    STT = index + 1,
                    ProductName = product.ProductName,
                    Category = product.Category,
                    DeviceType = product.DeviceType,
                    SpecificLocation = product.StorageLocations?.SpecificLocation,
                    BeginningStockNew = inventories.Where(i => i.TransactionDate < startDate && i.Condition == "new")
                                                    .Sum(i => i.Type == "import" ? i.Quantity : -i.Quantity),
                    BeginningStockOld = inventories.Where(i => i.TransactionDate < startDate && i.Condition == "old")
                                                    .Sum(i => i.Type == "import" ? i.Quantity : -i.Quantity),
                    ImportDuringPeriodNew = inventories.Where(i => i.TransactionDate >= startDate && i.TransactionDate <= endDate && i.Type == "import" && i.Condition == "new")
                                                       .Sum(i => i.Quantity),
                    ImportDuringPeriodOld = inventories.Where(i => i.TransactionDate >= startDate && i.TransactionDate <= endDate && i.Type == "import" && i.Condition == "old")
                                                       .Sum(i => i.Quantity),
                    ExportDuringPeriodNew = inventories.Where(i => i.TransactionDate >= startDate && i.TransactionDate <= endDate && i.Type == "export" && i.Condition == "new")
                                                       .Sum(i => i.Quantity),
                    ExportDuringPeriodOld = inventories.Where(i => i.TransactionDate >= startDate && i.TransactionDate <= endDate && i.Type == "export" && i.Condition == "old")
                                                       .Sum(i => i.Quantity),
                    EndingStockNew = inventories.Where(i => i.TransactionDate <= endDate && i.Condition == "new")
                                                 .Sum(i => i.Type == "import" ? i.Quantity : -i.Quantity),
                    EndingStockOld = inventories.Where(i => i.TransactionDate <= endDate && i.Condition == "old")
                                                 .Sum(i => i.Type == "import" ? i.Quantity : -i.Quantity)
                };
            }).ToList();
            return Ok(viewModel);
        }

    }
}
