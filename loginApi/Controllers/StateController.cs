using loginApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace loginApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : ControllerBase
    {
        private readonly IConfiguration _config;
        public readonly AppDbContext _context;
        public StateController(IConfiguration config, AppDbContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpGet("{countryId}")]
        public async Task<IActionResult> GetCities(int countryId)
        {
            var cities = await _context.States.Where(c => c.CountryId == countryId).ToListAsync();
            return Ok(cities);
        }
    }
}
