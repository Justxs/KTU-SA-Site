using FluentValidation;
using KTU_SA_API.Domain.Dto.StudentAsociationUnitDto;

namespace KTU_SA_API.Validators.StudentAsociationUnit;

public class StudentAsociationUnitUpdateValidator : AbstractValidator<StudentAsociationUnitUpdateDto>
{
    public StudentAsociationUnitUpdateValidator()
    {
        RuleFor(s => s.Description)
            .NotEmpty();

        RuleFor(s => s.Id)
            .NotEmpty();
    }
}
