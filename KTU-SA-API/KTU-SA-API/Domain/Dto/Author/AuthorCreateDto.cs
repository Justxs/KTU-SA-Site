namespace KTU_SA_API.Domain.Dto.Author;

public class AuthorCreateDto
{
    public string FullName { get; set; }

    public string Email { get; set; }

    public Guid StudentAsociationUnitId { get; set; }
}
