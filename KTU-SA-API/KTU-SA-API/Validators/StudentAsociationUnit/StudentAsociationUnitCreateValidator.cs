using FluentValidation;
using KTU_SA_API.Domain.Dto.StudentAsociationUnitDto;

namespace KTU_SA_API.Validators.StudentAsociationUnit;

public class StudentAsociationUnitCreateValidator : AbstractValidator<StudentAsociationUnitCreateDto>
{
    public StudentAsociationUnitCreateValidator()
    {
        RuleFor(s => s.Name)
            .IsInEnum();

        RuleFor(s => s.Description)
            .NotEmpty();
    }
}
