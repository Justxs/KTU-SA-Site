namespace KTU_SA_API.Domain.Dto.PostDto;

public class PostDto
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string HtmlContent { get; set; }

    public string Description { get; set; }

    public DateTime CreatedDate { get; set; }
}
