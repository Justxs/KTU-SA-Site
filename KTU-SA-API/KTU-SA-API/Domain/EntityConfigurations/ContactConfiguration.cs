﻿using KTU_SA_API.Domain.Models;
using KTU_SA_API.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KTU_SA_API.Domain.EntityConfigurations
{
    public class ContactConfiguration : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {
        }
    }
}
