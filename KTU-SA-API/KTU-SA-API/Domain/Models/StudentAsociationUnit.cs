using KTU_SA_API.Domain.Enums;

namespace KTU_SA_API.Domain.Models;

public class StudentAsociationUnit : Entity
{
    public SaUnit Name { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Contact> Contacts { get; set; }

    public virtual ICollection<Author> Authors { get; set; }
}
