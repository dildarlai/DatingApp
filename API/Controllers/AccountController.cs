using System.Diagnostics.Tracing;
using System.Text;
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }
        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);
            if (user == null) return Unauthorized("Invalid username");
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var ComputedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < ComputedHash.Length; i++)
            {

                if (ComputedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }
            return new UserDto{

                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };

        }

        [HttpPost("Register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {

            if (await UserExist(registerDto.Username)) return BadRequest("User name is taken");
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {

                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;


        }
        private async Task<bool> UserExist(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());

        }

    }
}