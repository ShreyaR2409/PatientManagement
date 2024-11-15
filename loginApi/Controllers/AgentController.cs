using loginApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace loginApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgentController : ControllerBase
    {
        private readonly IConfiguration _config;
        public readonly AppDbContext _context;
        private readonly IPasswordHasher<Agent> _passwordHasher;
        public AgentController(IConfiguration config, AppDbContext context, IPasswordHasher<Agent> passwordHasher)
        {
            _config = config;
            _context = context;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("CreateUser")]
        public IActionResult Create(Agent user)
        {
            if(_context.Agent.Where(x =>x.email == user.email).FirstOrDefault() != null)
            {
                return Ok("Already Exist");
            }
            int agentCount = _context.Agent.Count();
            string newAgentId = $"AGENT{(agentCount + 1).ToString("D3")}";

            // Assign the generated AgentId to the new agent
            user.AgentId = newAgentId;
            user.password = _passwordHasher.HashPassword(user, user.password);

            _context.Agent.Add(user);
            _context.SaveChanges();
            return Ok("Added Successfully");
        }

        [HttpPost("login")]
        public IActionResult Login(Login user)
        {
            var validUser = _context.Agent.FirstOrDefault(x => x.email == user.Email);

            if (validUser != null)
            {
                var result = _passwordHasher.VerifyHashedPassword(validUser, validUser.password, user.Password);

                if (result == PasswordVerificationResult.Success)
                {
                    var token = GenerateJwtToken(validUser);
                    return Ok(new { status = "Success", token = token });
                }
            }
            return Ok(new { status = "Failure" });
        }

        private string GenerateJwtToken(Agent user)
        {
            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, user.email),
        new Claim("UserId", user.AgentId),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("reset-password")]
        public IActionResult ResetPassword(Login request)
        {
            var user = _context.Agent.FirstOrDefault(u => u.email == request.Email);
            if (user == null)
                return Ok("Email not found.");

            user.password = _passwordHasher.HashPassword(user, request.Password);

            _context.SaveChanges();

            return Ok("Password reset successfully.");
        }

        [Authorize]
        [HttpPost("ChangePassword")]
        public IActionResult ChangePassword(ChangePasswordRequest request)
        {
            var user = _context.Agent.FirstOrDefault(u => u.email == request.Email);
            if (user == null)
            {
                return Ok("Email not found.");
            }

            // Verify old password
            var result = _passwordHasher.VerifyHashedPassword(user, user.password, request.OldPassword);
            if (result != PasswordVerificationResult.Success)
            {
                return Ok("Old password is incorrect.");
            }

            // Hash and set the new password
            user.password = _passwordHasher.HashPassword(user, request.NewPassword);
            _context.SaveChanges();

            return Ok("Password changed successfully.");
        }

    }
}
