using AutoMapper;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() 
        {
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<Property, PropertyListDto>().
                ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name));
        }
    }
}
