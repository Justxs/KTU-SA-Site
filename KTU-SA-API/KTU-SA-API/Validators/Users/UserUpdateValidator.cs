using FluentValidation;
using KTU_SA_API.Domain.Dto.UserDto;

namespace KTU_SA_API.Validators.Users;

public class UserUpdateValidator : AbstractValidator<UserUpdateDto>
{
    public UserUpdateValidator()
    {
        RuleFor(s => s.Role)
            .IsInEnum();

        RuleFor(s => s.SaUnit)
            .IsInEnum();
    }
}
