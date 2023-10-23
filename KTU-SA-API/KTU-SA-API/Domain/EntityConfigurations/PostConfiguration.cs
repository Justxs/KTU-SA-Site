using KTU_SA_API.Helper;
using KTU_SA_API.Models.Domain;
using KTU_SA_API.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KTU_SA_API.Domain.EntityConfigurations;

public class PostConfiguration : IEntityTypeConfiguration<Post>
{
    public void Configure(EntityTypeBuilder<Post> builder)
    {
        builder
            .Property(x => x.Type)
            .HasConversion<EnumStringConverter<PostType>>();
    }
}
