namespace KTU_SA_API.Domain.Dto.Position;

public class PositionCreateDto
{
    public string Name { get; set; }

    public string Description { get; set; }

    public List<Guid> SaUnitIds { get; set; }
}
