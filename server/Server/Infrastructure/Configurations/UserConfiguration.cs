using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models;

namespace Server.Infrastructure.Configurations
{
    public class UserConfiguration
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id); 

           

            builder.Property(x => x.Name).HasMaxLength(30);

            builder.HasIndex(x => x.Email).IsUnique();

            builder.HasMany(x => x.Orders).WithMany(x=>x.Users);


        }
    }
}
