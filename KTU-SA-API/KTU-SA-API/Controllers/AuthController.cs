using KTU_SA_API.Domain.Dto.UserDto;
using KTU_SA_API.Domain.Enums;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Exceptions;
using KTU_SA_API.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KTU_SA_API.Controllers;

public class AuthController : BaseController
{
    private readonly IGoogleService _googleAuthService;
    private readonly IJwtService _jwtService;
    private readonly IRepository<User> _repository;
    private readonly IMapper _mapper;

    public AuthController(IGoogleService googleAuthService, IJwtService jwtService, IRepository<User> repository, IMapper mapper)
    {
        _googleAuthService = googleAuthService;
        _jwtService = jwtService;
        _repository = repository;
        _mapper = mapper;
    }

    [HttpPost("Login")]
    public async Task<IActionResult> GoogleLogin([FromBody] string code)
    {
        var email = await _googleAuthService.ExchangeCodeForUserEmailAsync(code, "http://localhost:5173");
        var allUsers = await _repository.GetAllAsync();
        User user;

        if (allUsers.Any(user => user.Email == email))
        {
            user = allUsers.First(user => user.Email == email);

            user.JwtToken = _jwtService.JWTGenerator(user);
            user = _jwtService.RefreshTokenGenerator(user);
            await _repository.UpdateAsync(user);
        }
        else
        {
            user = new User
            {
                Id = Guid.NewGuid(),
                Email = email,
                SaUnit = SaUnit.Unknown,
                Role = Role.WaitingForApproval,
            };

            user.JwtToken = _jwtService.JWTGenerator(user);
            user = _jwtService.RefreshTokenGenerator(user);

            await _repository.CreateAsync(user);
        }

        SetRefreshTokenCookie(user);
        var userDto = _mapper.Map<UserDto>(user);

        return Ok(userDto);
    }

    [HttpPost("Refresh")]
    public async Task<ActionResult<string>> RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"];

        var allUsers = await _repository.GetAllAsync();
        var user = allUsers.FirstOrDefault(user => user.RefreshToken == refreshToken);

        if (user == null)
        {
            Response.Cookies.Delete("refreshToken");
            return Unauthorized("Invalid Refresh Token.");
        }
        else if (user.ExpiresIn < DateTime.Now)
        {
            await _jwtService.DeleteTokens(user);
            Response.Cookies.Delete("refreshToken");
            return Unauthorized("Token expired.");
        }

        string token = _jwtService.JWTGenerator(user);

        user.JwtToken = token;
        user = _jwtService.RefreshTokenGenerator(user);

        await _repository.UpdateAsync(user);
        SetRefreshTokenCookie(user);

        return Ok(token);
    }

    [HttpPost("Logout")]
    [Authorize]
    public async Task<ActionResult<string>> Logout()
    {
        var refreshToken = Request.Cookies["refreshToken"];

        var allUsers = await _repository.GetAllAsync();
        var user = allUsers.FirstOrDefault(user => user.RefreshToken == refreshToken);

        if (user == null)
        {
            Response.Cookies.Delete("refreshToken");
            return NoContent();
        }
        else
        {
            await _jwtService.DeleteTokens(user);
            Response.Cookies.Delete("refreshToken");
            return NoContent();
        }
    }

    private void SetRefreshTokenCookie(User user)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = user.ExpiresIn,
            Secure = true,
            SameSite = SameSiteMode.None
        };

        if (user.RefreshToken == null)
        {
            throw new UnauthorizedException("User don't have a refresh tokens");
        }

        Response.Cookies.Append("refreshToken", user.RefreshToken, cookieOptions);
    }
}
