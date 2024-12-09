using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using JournalerBackend.DbContexts;
using Microsoft.AspNetCore.Identity;
using JournalerBackend.Entities;
using System.Security.Cryptography;
using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace JournalerBackend.Controllers {
    [Route("api/auth")]
    [ApiController]
    public class AuthController(JournalerDbContext context, IPasswordHasher<UserEntity> passwordHasher) : ControllerBase
    {
        private readonly JournalerDbContext _context = context;
        private readonly IPasswordHasher<UserEntity> _passwordHasher = passwordHasher;
        private readonly string ZohoMailPassword = Environment.GetEnvironmentVariable("ZohoMailPassword");
        private readonly string JWTKey = Environment.GetEnvironmentVariable("JWTKey");

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == login.Username);

            if (user == null || _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, login.Password) != PasswordVerificationResult.Success)
            {
                return Unauthorized();
            }

            var token = GenerateJwtToken(user.Id);
            return Ok(new { Token = token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginModel register)
        {
            if (await _context.Users.AnyAsync(u => u.Username == register.Username))
            {
                return BadRequest("Username already exists.");
            }

            var user = new UserEntity
            {
                Username = register.Username,
                PasswordHash = _passwordHasher.HashPassword(null, register.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully");
        }

        [HttpPost("request-password-reset")]
        public async Task<IActionResult> RequestPasswordReset([FromBody] RequestPasswordResetModel requestPasswordResetModel) {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == requestPasswordResetModel.Email);
            if(user == null) {
                return BadRequest("Username is not registered.");
            }

            var authenticationCode = RandomNumberGenerator.GetString("123456789", 6);
            user.ResetPasswordCode = authenticationCode;
            user.ResetPasswordCodeExpiration = DateTime.UtcNow.AddMinutes(15);

            await _context.SaveChangesAsync();

            var message = new MailMessage("no-reply@lifejournaler.com", requestPasswordResetModel.Email)
            {
                Subject = "LifeJournal Password Reset",
                Body = $"Please find your password reset code below.\n{authenticationCode}"
            };

            var client = new SmtpClient("smtp.zoho.com", 587)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential("no-reply@lifejournaler.com", ZohoMailPassword)
            };
            client.Send(message);

            return Ok();
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel resetPasswordModel) {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == resetPasswordModel.Email);
            if(user == null) {
                return BadRequest("Username is not registered.");
            }

            if(user.ResetPasswordCode != resetPasswordModel.AuthenticationCode) {
                return BadRequest("Authentication code is not valid");
            }

            if(DateTime.UtcNow >= user.ResetPasswordCodeExpiration) {
                return BadRequest("Authentication code is expired");
            }

            user.PasswordHash = _passwordHasher.HashPassword(null, resetPasswordModel.NewPassword);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize]
        [HttpDelete("delete-account")]
        public async Task<IActionResult> DeleteAccount() {
            if(!int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var userId)) {
                return BadRequest("The user was not found in the request");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if(user == null) {
                return BadRequest("Username is not registered.");
            }

            var entriesToRemove = await _context.Entries.Where(e => e.User == user).ToListAsync();
            _context.Entries.RemoveRange(entriesToRemove);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private string GenerateJwtToken(int userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(JWTKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] { new(ClaimTypes.NameIdentifier, userId.ToString()) }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = "JournalerBackend",
                Audience = "JournalerAudience",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

    public class LoginModel {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }

    public class RequestPasswordResetModel {
        public required string Email { get; set;}
    }

    public class ResetPasswordModel {
        public required string Email { get; set; }
        public required string AuthenticationCode { get; set; }
        public required string NewPassword { get; set; }
    }
}
