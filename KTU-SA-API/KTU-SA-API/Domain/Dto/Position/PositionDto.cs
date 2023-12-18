namespace KTU_SA_API.Domain.Dto.Position;

public class PositionDto
{
    public Guid Id { get; set; }

    public List<Guid> SaUnitIds { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }
}
