using AutoMapper;
using Inventory.Data.Reponsitories.Implements;
using Inventory.Models.Domain;
using Inventory.Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoriesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public InventoriesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InventoriesRequestDto request)
        {

            var inventory = _mapper.Map<Inventories>(request);


            var product = await _unitOfWork.productRepository.GetByIdAsync(inventory.ProductId);
            if (product != null)
            {
                inventory.Product = product;
                await _unitOfWork.inventoryRepository.CreateAsync(inventory);
            }
            else
            {
                return BadRequest("Invalid location ID.");
            }


            var response = _mapper.Map<InventoriesDto>(inventory);

            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            var inventory = await _unitOfWork.inventoryRepository.GetAllAsync();
            var response = _mapper.Map<List<InventoriesDto>>(inventory);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var inventory = await _unitOfWork.inventoryRepository.GetByIdAsync(id);
            if (inventory == null)
            {
                return NotFound("Product not found.");
            }
            var response = _mapper.Map<InventoriesDto>(inventory);

            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] InventoriesRequestDto request)
        {
            var inventory = await _unitOfWork.inventoryRepository.GetByIdAsync(id);

            if (inventory == null)
            {
                return NotFound("Product not found.");
            }
            _mapper.Map(request, inventory);
            var product = await _unitOfWork.productRepository.GetByIdAsync(request.ProductId);
            if (product != null)
            {
                inventory.Product = product;
            }
            else
            {
                return BadRequest("Invalid location ID.");
            }
            await _unitOfWork.inventoryRepository.UpdateAsync(inventory);
            var response = _mapper.Map<InventoriesDto>(inventory);

            return Ok(response);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {

            var inventory = await _unitOfWork.inventoryRepository.DeleteAsync(id);
            if (inventory == null)
            {
                return NotFound("Product not found.");
            }
            var response = _mapper.Map<InventoriesDto>(inventory);
            return Ok("Product deleted successfully.");
        }

    }
}
