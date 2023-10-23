using FluentValidation;
using KTU_SA_API.Domain.Dto.PostDto;

namespace KTU_SA_API.Validators.Posts;

public class PostCreateValidator : AbstractValidator<PostCreateDto>
{
    public PostCreateValidator()
    {
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
