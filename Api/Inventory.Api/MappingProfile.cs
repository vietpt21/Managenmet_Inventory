using AutoMapper;
using Inventory.Models.Domain;
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

            CreateMap<Product, ProductDto>()
             .ForMember(dest => dest.StorageLocations, opt => opt.MapFrom(src => src.StorageLocations));
            CreateMap<ProductRequestDto, Product>();

            CreateMap<Inventories, InventoriesDto>()
           .ForMember(dest => dest.Product, opt => opt.MapFrom(src => src.Product));
            CreateMap<InventoriesRequestDto, Inventories>();

        }
    }
}
