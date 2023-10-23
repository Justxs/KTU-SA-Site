using FluentValidation;
using KTU_SA_API.Domain.Dto.Author;

namespace KTU_SA_API.Validators.Authors;

public class AuthorCreateValidator : AbstractValidator<AuthorCreateDto>
{
    public AuthorCreateValidator()
    {
        RuleFor(a=> a.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(a => a.StudentAsociationUnitId)
            .NotEmpty();

        RuleFor(a => a.FullName)
            .NotEmpty();
    }
}
