using KTU_SA_API.Domain.Enums;

namespace KTU_SA_API.Domain.Dto.UserDto;

public class UserUpdateDto
{
    public Role Role { get; set; }

    public SaUnit SaUnit { get; set; }
}
