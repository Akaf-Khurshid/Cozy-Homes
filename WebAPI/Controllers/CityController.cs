using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityRepository repo;

        public CityController(ICityRepository repo) 
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var cities = await repo.GetCitiesAsync();
            return Ok(cities);
        }

        [HttpPost("post")]
        public async Task<IActionResult> AddCity(City city)
        {
            repo.AddCity(city);
            await repo.SaveAsync();
            return StatusCode(201);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            repo.DeleteCity(id);
            await repo.SaveAsync();
            return Ok(id);
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return  "Atlanta";
        }
    }
}
