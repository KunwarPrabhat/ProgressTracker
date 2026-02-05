using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuestionTracker.Api.Data;
using QuestionTracker.Api.Models;
using System.Security.Cryptography;
using System.Text;

namespace QuestionTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public AuthController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(User user)
    {
        if (await _db.Users.AnyAsync(u => u.Email == user.Email))
            return BadRequest("User already exists");

        user.PasswordHash = HashPassword(user.PasswordHash);

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("login")]
    public async Task<ActionResult<User>> Login(User login)
    {
        var user = await _db.Users
            .FirstOrDefaultAsync(u => u.Email == login.Email);

        if (user == null)
            return Unauthorized();

        var hash = HashPassword(login.PasswordHash);

        if (user.PasswordHash != hash)
            return Unauthorized();

        return user;
    }

    private string HashPassword(string password)
    {
        using var sha = SHA256.Create();
        var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }
}
