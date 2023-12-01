using KTU_SA_API.Domain.Models;

namespace KTU_SA_API.Interfaces;

public interface IJwtService
{
    string JWTGenerator(User user);

    User RefreshTokenGenerator(User user);

    Task DeleteTokens(User user);
}
