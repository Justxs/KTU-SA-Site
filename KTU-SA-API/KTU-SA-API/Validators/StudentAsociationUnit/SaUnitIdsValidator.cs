using FluentValidation;
using KTU_SA_API.Domain.Dto.StudentAsociationUnitDto;

namespace KTU_SA_API.Validators.StudentAsociationUnit;

public class SaUnitIdsValidator : AbstractValidator<SaUnitIdsDto>
{
    public SaUnitIdsValidator()
    {
        RuleFor(s => s.SaUnitIds)
            .NotEmpty();
    }
}
