using AutoMapper;
using Inventory.Models.Dto;
using Inventory.Models.Model;

namespace Inventory.Api
{
    public class MappingProfile :Profile
    {
        public MappingProfile()
        {
            CreateMap<StorageLocations, StorageLocationsDto>();
            CreateMap<StorageLocationsRequestDto, StorageLocations>();
        }
    }
}
