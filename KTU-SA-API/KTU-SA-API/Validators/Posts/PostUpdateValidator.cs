using FluentValidation;
using KTU_SA_API.Domain.Dto.PostDto;

namespace KTU_SA_API.Validators;

public class PostUpdateValidator : AbstractValidator<PostUpdateDto>
{
    public PostUpdateValidator()
    {
        RuleFor(p => p.Id)
            .NotEmpty();

        RuleFor(p => p.Title)
            .NotEmpty();

        RuleFor(p => p.HtmlContent)
            .NotEmpty();

        RuleFor(p => p.Description)
            .NotEmpty();

        RuleFor(p => p.Type)
            .IsInEnum();

        RuleFor(p => p.AuthorId)
            .NotEmpty();
    }
}
