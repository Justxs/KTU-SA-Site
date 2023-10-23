using KTU_SA_API.Domain.Models;
using KTU_SA_API.Models.Enums;

namespace KTU_SA_API.Models.Domain;

public class Post : Entity
{
    public string Title { get; set; }

    public string HtmlContent { get; set; }

    public string Description { get; set; }

    public DateTime CreatedDate { get; set; }

    public PostType Type { get; set; }

    public Guid AuthorId { get; set; }

    public virtual Author Author { get; set; }
}
