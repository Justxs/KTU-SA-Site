using KTU_SA_API.Models.Enums;

namespace KTU_SA_API.Domain.Dto.PostDto;

public class PostCreateDto
{
    public string Title { get; set; }

    public string HtmlContent { get; set; }

    public string Description { get; set; }

    public PostType Type { get; set; }

    public Guid AuthorId { get; set; }
}
