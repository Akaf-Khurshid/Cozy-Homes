using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetPropertiesAsync(int sellRent);
        void AddProperty(Property property);
        void DeleteProperty(Property property); 
    }
}
