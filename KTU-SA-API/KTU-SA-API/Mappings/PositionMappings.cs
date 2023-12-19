using KTU_SA_API.Domain.Dto.Position;
using KTU_SA_API.Domain.Models;
using Mapster;

namespace KTU_SA_API.Mappings;

public class PositionMappings : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<Position, PositionDto>()
            .Map(dto => dto.SaUnits, position => position.StudentAsociationUnits
                .ToDictionary(sau => sau.Id, sau => sau.Name));
    }
}
