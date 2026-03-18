namespace Eneba.Api.Dtos;

public record OfferListDto(
    int Id,
    string Title,
    string GameName,
    string Region,
    decimal Price,
    decimal? OldPrice,
    int? DiscountPercent,
    string ImageUrl,
    decimal? Cashback,
    int Likes,
    bool LikedByMe
);
