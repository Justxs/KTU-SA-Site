using FluentValidation;
using KTU_SA_API.Domain.Dto.ContactDto;

namespace KTU_SA_API.Validators.Contacts;

public class ContactCreateValidator : AbstractValidator<ContactCreateDto>
{
    public ContactCreateValidator()
    {
        RuleFor(c=>c.FullName)
            .NotEmpty();

        RuleFor(c => c.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(c => c.PhoneNumber)
            .NotEmpty()
            .Matches(@"^\+370\d{8}$");

        RuleFor(c => c.StudentAsociationUnitId)
            .NotEmpty();

        RuleFor(c => c.Position)
            .NotEmpty();
    }
}
