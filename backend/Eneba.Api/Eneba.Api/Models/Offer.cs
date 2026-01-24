namespace Eneba.Api.Models;

public class Offer
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;
    public string GameName { get; set; } = null!;
    public string Platform { get; set; } = "PC";
    public string Region { get; set; } = "GLOBAL";

    public decimal Price { get; set; }
    public decimal? OldPrice { get; set; }
    public int? DiscountPercent { get; set; }

    public string ImageUrl { get; set; } = null!;
    public decimal? Cashback { get; set; }
}
