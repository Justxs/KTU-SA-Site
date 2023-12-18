using KTU_SA_API.Domain.Models;
using KTU_SA_API.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace KTU_SA_API.Services;

public class JwtService : IJwtService
{
    private readonly IConfiguration _configuration;
    private readonly IRepository<User> _repository;

    public JwtService(IConfiguration configuration, IRepository<User> repository)
    {
        _configuration = configuration;
        _repository = repository;
    }

    public async Task DeleteTokens(User user)
    {
        user.RefreshToken = null;
        user.ExpiresIn = null;
        user.JwtToken = null;

        await _repository.UpdateAsync(user);
    }

    public string JWTGenerator(User user)
    {
        var claims = new List<Claim> 
        {
            new Claim("email", user.Email),
            new Claim("saRole", user.Role.ToString()),
            new Claim("userId", user.Id.ToString()),
            new Claim("saUnit", user.SaUnit.ToString())
        };

        var jwtSecret = _configuration["JwtSettings:Secret"] 
            ?? throw new Exception("Jwt secret is not set");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddMinutes(10),
            signingCredentials: creds);

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }

    public User RefreshTokenGenerator(User user)
    {
        user.RefreshToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
        user.ExpiresIn = DateTime.Now.AddHours(3);

        return user;
    }
}
