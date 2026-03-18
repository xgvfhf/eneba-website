using Eneba.Api.Data;
using Eneba.Api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("")]
public class ListController : ControllerBase
{
    private readonly AppDbContext _db;
    public ListController(AppDbContext db) => _db = db;

    [HttpGet("list")]
    public async Task<ActionResult<List<OfferListDto>>> List(
        [FromQuery] string? search,
        [FromQuery] string? clientId)
    {
        var q = _db.Offers.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim();
            q = q.Where(o => o.GameName.Contains(s) || o.Title.Contains(s));
        }

        // Сначала получаем офферы (можно ограничить как маркетплейс)
        var offers = await q
            .OrderBy(o => o.Id)
            .Take(50)
            .Select(o => new
            {
                o.Id,
                o.Title,
                o.GameName,
                o.Region,
                o.Price,
                o.OldPrice,
                o.DiscountPercent,
                o.ImageUrl,
                o.Cashback
            })
            .ToListAsync();

        var offerIds = offers.Select(o => o.Id).ToList();

        // Лайки по офферам (1 запрос)
        var likesDict = await _db.OfferLikes.AsNoTracking()
            .Where(l => offerIds.Contains(l.OfferId))
            .GroupBy(l => l.OfferId)
            .Select(g => new { OfferId = g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.OfferId, x => x.Count);

        // Мои лайки (1 запрос, только если есть clientId)
        HashSet<int> myLikes = new();
        if (!string.IsNullOrWhiteSpace(clientId))
        {
            myLikes = (await _db.OfferLikes.AsNoTracking()
                    .Where(l => offerIds.Contains(l.OfferId) && l.ClientId == clientId)
                    .Select(l => l.OfferId)
                    .ToListAsync())
                .ToHashSet();
        }

        var result = offers.Select(o => new OfferListDto(
            o.Id,
            o.Title,
            o.GameName,
            o.Region,
            o.Price,
            o.OldPrice,
            o.DiscountPercent,
            o.ImageUrl,
            o.Cashback,
            Likes: likesDict.TryGetValue(o.Id, out var c) ? c : 0,
            LikedByMe: myLikes.Contains(o.Id)
        )).ToList();

        return Ok(result);
    }
}
