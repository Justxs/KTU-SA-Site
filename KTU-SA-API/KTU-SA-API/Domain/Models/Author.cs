using KTU_SA_API.Models.Domain;

namespace KTU_SA_API.Domain.Models;

public class Author : Entity
{
    public string FullName { get; set; }

    public string Email { get; set; }

    public Guid StudentAsociationUnitId { get; set; }

    public virtual StudentAsociationUnit StudentAsociationUnit { get; set; }

    public virtual ICollection<Post> Posts { get; set; }
}
