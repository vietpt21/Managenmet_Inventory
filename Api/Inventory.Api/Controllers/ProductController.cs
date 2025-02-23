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
        public async Task<IActionResult> Create([FromForm] ProductRequestDto request)
        {
            var product = _mapper.Map<Product>(request);
            var storageLocation = await _unitOfWork.storageLocationsRepository.GetByIdAsync(product.LocationId);
            if (storageLocation != null)
            {
                product.StorageLocations = storageLocation;
            }
            else
            {
                return BadRequest("Invalid location ID.");
            }
            if (request.Image != null)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");//check tồn tại chưa nếu chưa thi tạo
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                var fileName = $"{Guid.NewGuid()}_{request.Image.FileName}"; 
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await request.Image.CopyToAsync(stream);
                }

                product.ImageUrl = $"{fileName}"; 
            }
            await _unitOfWork.productRepository.CreateAsync(product);

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
        public async Task<IActionResult> Update(int id, [FromForm] ProductRequestDto request)
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
            if (request.Image != null)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                if (!string.IsNullOrEmpty(product.ImageUrl))
                {
                    var oldFilePath = Path.Combine(uploadsFolder, product.ImageUrl);
                    if (System.IO.File.Exists(oldFilePath))
                    {
                        System.IO.File.Delete(oldFilePath);
                    }
                }
                var fileName = $"{Guid.NewGuid()}_{request.Image.FileName}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await request.Image.CopyToAsync(stream);
                }

                product.ImageUrl = fileName; 
            }
            await _unitOfWork.productRepository.UpdateAsync(product);
            var response = _mapper.Map<ProductDto>(product);

            return Ok(response);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete( int id)
        {

            var product = await _unitOfWork.productRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound("Product not found.");
            }
            if (!string.IsNullOrEmpty(product.ImageUrl))
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                var filePath = Path.Combine(uploadsFolder, product.ImageUrl);

                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath); 
                }
            }
            await _unitOfWork.productRepository.DeleteAsync(id);
            var response = _mapper.Map<ProductDto>(product);
            return Ok(response);
        }


    }
}
