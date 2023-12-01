using KTU_SA_API.Interfaces;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using System.IdentityModel.Tokens.Jwt;
using KTU_SA_API.Exceptions;
using Google.Apis.Auth.OAuth2.Responses;

namespace KTU_SA_API.Services;


public class GoogleService : IGoogleService
{
    private readonly IConfiguration _configuration;

    public GoogleService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<string> ExchangeCodeForUserEmailAsync(string code, string redirectUri)
    {
        var flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
        {
            ClientSecrets = new ClientSecrets
            {
                ClientId = _configuration["Authentication:Google:ClientId"],
                ClientSecret = _configuration["Authentication:Google:ClientSecret"],
            }
        });

        TokenResponse token;

        try
        {
             token = await flow.ExchangeCodeForTokenAsync(
                    string.Empty,
                    code,
                    redirectUri,
                    CancellationToken.None);
        }
        catch
        {
            throw new UnauthorizedException("Failed to login, try again");
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        string email = string.Empty;

        if (tokenHandler.ReadToken(token.IdToken) is JwtSecurityToken jsonToken)
        {
            var emailClaim = jsonToken.Claims.FirstOrDefault(c => c.Type == "email") 
                ?? throw new UnauthorizedException("Email claim not found in the JWT");

            email = emailClaim.Value;
        }
        else
        {
            throw new UnauthorizedException("Jwt token is wrong format");
        }

        return email;
    }
}
