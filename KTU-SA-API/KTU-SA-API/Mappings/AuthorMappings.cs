using KTU_SA_API.Domain.Dto.Author;
using KTU_SA_API.Domain.Models;
using Mapster;

namespace KTU_SA_API.Mappings;

public class AuthorMappings : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<Author, AuthorDto>()
            .Map(dto => dto.SaUnitName, author => author.StudentAsociationUnit.Name);
    }
}
