using KTU_SA_API.Domain.Enums;

namespace KTU_SA_API.Domain.Models;

public class User : Entity
{
    public string Email { get; set; }

    public SaUnit SaUnit { get; set; }

    public Role Role { get; set; }

    public string? JwtToken { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime? ExpiresIn { get; set; }
}
