using KTU_SA_API.Domain.Enums;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Helper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KTU_SA_API.Domain.EntityConfigurations
{
    public class StudentAsociationUnitConfiguration : IEntityTypeConfiguration<StudentAsociationUnit>
    {
        public void Configure(EntityTypeBuilder<StudentAsociationUnit> builder)
        {
            builder
               .Property(x => x.Name)
               .HasConversion<EnumStringConverter<SaUnit>>();
        }
    }
}
