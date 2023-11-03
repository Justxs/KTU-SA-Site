using System.Text.Json.Serialization;

namespace KTU_SA_API.Domain.Models;

public class Position : Entity
{
    public string Name { get; set; }

    public string Description { get; set; }

    [JsonIgnore]
    public virtual ICollection<StudentAsociationUnit> StudentAsociationUnits { get; set; } = new List<StudentAsociationUnit>();

    [JsonIgnore]
    public virtual ICollection<Contact> Contacts { get; set; }
}
