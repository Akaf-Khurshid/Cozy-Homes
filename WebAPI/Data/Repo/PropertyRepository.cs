using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DataContext dc;

        public PropertyRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddProperty(Property property)
        {
            throw new NotImplementedException();
        }

        public void DeleteProperty(Property property)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Property>> GetPropertiesAsync(int sellRent)
        {
            var properties = await dc.Properties
            .Include(p => p.PropertyType)
            .Include(p => p.City)
            .Include(p => p.FurnishingType)
            .Where(p => p.SellRent == sellRent)
            .ToListAsync();

            return properties;
        }
    }
}
