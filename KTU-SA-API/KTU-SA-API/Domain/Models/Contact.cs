namespace KTU_SA_API.Domain.Models;

public class Contact : Entity
{
    public string FullName { get; set; }

    public string Email { get; set; }

    public string PhoneNumber { get; set; }

    public string Position { get; set; }

    public Guid StudentAsociationUnitId { get; set; }

    public virtual StudentAsociationUnit StudentAsociationUnit { get; set; }
}
