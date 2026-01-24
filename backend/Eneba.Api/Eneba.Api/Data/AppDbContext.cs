using Microsoft.EntityFrameworkCore;
using Eneba.Api.Models;

namespace Eneba.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Offer> Offers => Set<Offer>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Offer>(e =>
        {
            e.Property(x => x.Title).HasMaxLength(200).IsRequired();
            e.Property(x => x.GameName).HasMaxLength(120).IsRequired();
            e.Property(x => x.Platform).HasMaxLength(30).IsRequired();
            e.Property(x => x.Region).HasMaxLength(30).IsRequired();
            e.Property(x => x.ImageUrl).HasMaxLength(500).IsRequired();

            e.Property(x => x.Price).HasColumnType("decimal(10,2)");
            e.Property(x => x.OldPrice).HasColumnType("decimal(10,2)");
            e.Property(x => x.Cashback).HasColumnType("decimal(10,2)");
        });
    }
}
