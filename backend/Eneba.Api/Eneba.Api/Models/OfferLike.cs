using System.ComponentModel.DataAnnotations;

namespace Eneba.Api.Models;

public class OfferLike
{
    public int Id { get; set; }

    public int OfferId { get; set; }
    public Offer Offer { get; set; } = null!;

    [MaxLength(64)]
    public string ClientId { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
