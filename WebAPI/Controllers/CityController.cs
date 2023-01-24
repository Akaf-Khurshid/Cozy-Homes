using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new[] { "Atlanta", "New York" };
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return  "Atlanta";
        }
    }
}
