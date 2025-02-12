using AutoMapper;
using Inventory.Data.Reponsitories.Implements;
using Inventory.Models.Domain;
using Inventory.Models.Dto;
using Inventory.Models.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductRequestDto request)
        {

            var product = _mapper.Map<Product>(request);


            var storageLocation = await _unitOfWork.storageLocationsRepository.GetByIdAsync(product.LocationId);
            if (storageLocation != null)
            {
                product.StorageLocations = storageLocation;
                await _unitOfWork.productRepository.CreateAsync(product);
            }
            else
            {
                return BadRequest("Invalid location ID.");
            }

           
            var response = _mapper.Map<ProductDto>(product);

            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
           
            var products = await _unitOfWork.productRepository.GetAllAsync();
            var response = _mapper.Map<List<ProductDto>>(products);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _unitOfWork.productRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound("Product not found.");
            }
            var response = _mapper.Map<ProductDto>(product);

            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductRequestDto request)
        {
            var product = await _unitOfWork.productRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound("Product not found.");
            }
            _mapper.Map(request, product);
            var storageLocation = await _unitOfWork.storageLocationsRepository.GetByIdAsync(request.LocationId);
            if (storageLocation != null)
            {
                product.StorageLocations = storageLocation;
            }
            else
            {
                return BadRequest("Invalid location ID.");
            }
            await _unitOfWork.productRepository.UpdateAsync(product);
            var response = _mapper.Map<ProductDto>(product);

            return Ok(response);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {

            var product = await _unitOfWork.productRepository.DeleteAsync(id);
            if (product == null)
            {
                return NotFound("Product not found.");
            }
            var response = _mapper.Map<ProductDto>(product);
            return Ok(response);
        }


    }
}
