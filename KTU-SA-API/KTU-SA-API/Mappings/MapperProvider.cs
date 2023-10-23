using Mapster;
using MapsterMapper;

namespace KTU_SA_API.Mappings;

public static class MapperProvider
{
    public static IMapper Mapper
    {
        get
        {
            var config = TypeAdapterConfig.GlobalSettings;
            config.Scan(typeof(MapperProvider).Assembly);
            var mapper = new Mapper(config);
            return mapper;
        }
    }
}
