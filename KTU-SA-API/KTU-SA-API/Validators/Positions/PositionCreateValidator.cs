using FluentValidation;
using KTU_SA_API.Domain.Dto.Position;

namespace KTU_SA_API.Validators.Positions;

public class PositionCreateValidator : AbstractValidator<PositionCreateDto>
{
    public PositionCreateValidator()
    {
        RuleFor(p => p.Name)
            .NotEmpty();

        RuleFor(p => p.Description)
            .NotEmpty();

        RuleFor(p => p.SaUnitIds)
            .NotEmpty();
    }
}
