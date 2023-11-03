using KTU_SA_API.Domain.Enums;
using System.Text.Json.Serialization;

namespace KTU_SA_API.Domain.Models;

public class StudentAsociationUnit : Entity
{
    public SaUnit Name { get; set; }

    public string? Description { get; set; }

    [JsonIgnore]
    public virtual ICollection<Position> Positions { get; set; } = new List<Position>();

    [JsonIgnore]
    public virtual ICollection<Author> Authors { get; set; }
}
