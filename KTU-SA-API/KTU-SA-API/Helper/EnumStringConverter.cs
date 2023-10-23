using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace KTU_SA_API.Helper;

public class EnumStringConverter<TEnum> : ValueConverter<TEnum, string> where TEnum : struct, Enum
{
    public EnumStringConverter()
            : base(
                v => v.ToString(),
                v => ParseOrDefault(v))
    {
    }

    private static TEnum ParseOrDefault(string value)
    {
        var isParsed = Enum.TryParse<TEnum>(value, out var enumVal);
        return isParsed ? enumVal : default;
    }
}
