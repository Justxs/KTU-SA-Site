using KTU_SA_API.Domain.Dto.ContactDto;
using KTU_SA_API.Domain.Models;
using Mapster;

namespace KTU_SA_API.Mappings;

public class ContactMappings : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<Contact, ContactDto>()
            .Map(dto => dto.PositionName, contact => contact.Position.Name);

        config.NewConfig<Position, ContactDto>()
            .Map(dto => dto.PositionName, position => position.Name)
            .Map(dto => dto.PositionId, position => position.Id);
    }
}
