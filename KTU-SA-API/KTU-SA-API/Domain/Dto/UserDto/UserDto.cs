using KTU_SA_API.Domain.Enums;

namespace KTU_SA_API.Domain.Dto.UserDto;

public class UserDto
{
    public Guid Id { get; set; }

    public string Email { get; set; }

    public Role Role { get; set; }

    public SaUnit SaUnit { get; set; }

    public string JwtToken { get; set; }
}
