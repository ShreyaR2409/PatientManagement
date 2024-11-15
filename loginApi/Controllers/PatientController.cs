using loginApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace loginApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IConfiguration _config;
        public readonly AppDbContext _context;

        public PatientController(IConfiguration config, AppDbContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpPost]
        public IActionResult Create(Patient pat)
        {
            if (_context.Patients.Where(x => x.email == pat.email).FirstOrDefault() != null)
            {
                return Ok("Already Exist");
            }

            //int patientCount = _context.Patients.Count();
            //string newPatientId = $"{pat.AgentId}PAT000{(patientCount + 1).ToString("D3")}";
            //// Assign the generated AgentId to the new agent
            //pat.PatientId = newPatientId;
            int agentPatientCount = _context.Patients.Count(x => x.AgentId == pat.AgentId);
            string newPatientId = $"{pat.AgentId}PAT{(agentPatientCount + 1).ToString("D3")}";
            pat.PatientId = newPatientId;
            _context.Patients.Add(pat);
            _context.SaveChanges();
            return Ok("Added Successfully");
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Patients.ToList());
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Patient pat)
        {
            var existingUser = _context.Patients.Find(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.firstname = pat.firstname;
            existingUser.lastname =  pat.lastname;
            existingUser.dob = pat.dob;
            existingUser.bloodgroup = pat.bloodgroup;
            existingUser.address = pat.address;
            existingUser.state = pat.state;
            existingUser.country = pat.country;
            existingUser.phonenumber = pat.phonenumber;
            existingUser.email = pat.email;
            existingUser.medicalhistory = pat.medicalhistory;
            existingUser.termsandcondition = pat.termsandcondition;
            existingUser.gender = pat.gender;
            existingUser.city = pat.city;

            _context.SaveChanges();
            return Ok(existingUser);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var pat = _context.Patients.Find(id);
            if (pat == null)
            {
                return NotFound();
            }

            pat.isActive = false;
            //_context.Patients.Remove(pat);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
