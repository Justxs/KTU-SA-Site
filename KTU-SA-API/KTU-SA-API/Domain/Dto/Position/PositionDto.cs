namespace KTU_SA_API.Domain.Dto.Position;

public class PositionDto
{
    public Guid Id { get; set; }

    public Dictionary<Guid, string> SaUnits { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }
}
