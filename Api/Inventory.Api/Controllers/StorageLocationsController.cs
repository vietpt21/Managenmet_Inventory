using AutoMapper;
using Inventory.Data.Reponsitories.Implements;
using Inventory.Models.Dto;
using Inventory.Models.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StorageLocationsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public StorageLocationsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllWarehouses()
        {
            var warehouses = await _unitOfWork.storageLocationsRepository.GetAllAsync();
            var response = _mapper.Map<List<StorageLocationsDto>>(warehouses);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateWarehouse([FromBody] StorageLocationsRequestDto request)
        {
            var warehouse = _mapper.Map<StorageLocations>(request);
            await _unitOfWork.storageLocationsRepository.CreateAsync(warehouse);
            var response = _mapper.Map<StorageLocationsDto>(warehouse);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var warehouse = await _unitOfWork.storageLocationsRepository.GetByIdAsync(id);
            if (warehouse == null)
            {
                return NotFound();
            }

            var response = _mapper.Map<StorageLocationsDto>(warehouse);
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] StorageLocationsRequestDto request)
        {
            var obj = _mapper.Map<StorageLocations>(request);
            obj.LocationId = id;

            var updatedWarehouse = await _unitOfWork.storageLocationsRepository.UpdateAsync(obj);
            if (updatedWarehouse == null)
            {
                return NotFound();
            }

            var response = _mapper.Map<StorageLocationsDto>(updatedWarehouse);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var warehouse = await _unitOfWork.storageLocationsRepository.DeleteAsync(id);
            if (warehouse == null)
            {
                return NotFound();
            }

            var response = _mapper.Map<StorageLocationsDto>(warehouse);
            return Ok(response);
        }
    }
}
