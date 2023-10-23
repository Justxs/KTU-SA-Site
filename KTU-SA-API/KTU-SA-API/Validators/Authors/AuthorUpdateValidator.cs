using FluentValidation;
using KTU_SA_API.Domain.Dto.Author;

namespace KTU_SA_API.Validators.Authors;

public class AuthorUpdateValidator : AbstractValidator<AuthorUpdateDto>
{
    public AuthorUpdateValidator()
    {
        RuleFor(a => a.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(a => a.StudentAsociationUnitId)
            .NotEmpty();

        RuleFor(a => a.FullName)
            .NotEmpty();

        RuleFor(a => a.Id)
            .NotEmpty();
    }
}
