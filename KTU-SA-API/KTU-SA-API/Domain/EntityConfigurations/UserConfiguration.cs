using KTU_SA_API.Domain.Enums;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Helper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KTU_SA_API.Domain.EntityConfigurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
              .Property(x => x.Role)
              .HasConversion<EnumStringConverter<Role>>();

            builder
              .Property(x => x.SaUnit)
              .HasConversion<EnumStringConverter<SaUnit>>();
        }
    }
}
