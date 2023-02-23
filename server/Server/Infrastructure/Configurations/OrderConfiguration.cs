using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models;

namespace Server.Infrastructure.Configurations
{
    public class OrderConfiguration
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.Id).IsUnique();

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            /*builder.HasMany(x => x.ProductAmount)
                    .WithOne(x=>x.Id)
                   .HasForeignKey(x => x.Id).(x=>x.Id);*/
        }
    }
}
