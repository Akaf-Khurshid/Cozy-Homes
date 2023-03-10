using System.ComponentModel.DataAnnotations;

namespace WebAPI.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required (ErrorMessage = "Name is mandatory field")]
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }
    }
}
