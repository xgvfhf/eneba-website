using Eneba.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Eneba.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Offer> Offers => Set<Offer>();
    public DbSet<OfferLike> OfferLikes => Set<OfferLike>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ---------- Offer ----------
        modelBuilder.Entity<Offer>(e =>
        {
            e.Property(x => x.Title)
                .HasMaxLength(200)
                .IsRequired();

            e.Property(x => x.GameName)
                .HasMaxLength(120)
                .IsRequired();

            e.Property(x => x.Platform)
                .HasMaxLength(30)
                .IsRequired();

            e.Property(x => x.Region)
                .HasMaxLength(30)
                .IsRequired();

            e.Property(x => x.ImageUrl)
                .HasMaxLength(500)
                .IsRequired();

            e.Property(x => x.Price)
                .HasColumnType("decimal(10,2)");

            e.Property(x => x.OldPrice)
                .HasColumnType("decimal(10,2)");

            e.Property(x => x.Cashback)
                .HasColumnType("decimal(10,2)");
        });

        // ---------- OfferLike ----------
        modelBuilder.Entity<OfferLike>(e =>
        {
            e.HasIndex(x => new { x.OfferId, x.ClientId })
             .IsUnique(); // один клиент может лайкнуть оффер только 1 раз

            e.Property(x => x.ClientId)
             .HasMaxLength(64)
             .IsRequired();

            e.HasOne(x => x.Offer)
             .WithMany(o => o.Likes)
             .HasForeignKey(x => x.OfferId)
             .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
