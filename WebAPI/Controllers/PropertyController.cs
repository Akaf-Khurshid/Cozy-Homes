using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork uow;

        public PropertyController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            Mapper = mapper;
        }

        public IMapper Mapper { get; }

        [HttpGet("type/{sellRent}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyList(int sellRent)
        {
            var properties = await uow.PropertyRepository.GetPropertiesAsync(sellRent);
            var proprtyListDTO = Mapper.Map<IEnumerable<PropertyListDto>>(properties);
            return Ok(proprtyListDTO);
        }
    }
}
