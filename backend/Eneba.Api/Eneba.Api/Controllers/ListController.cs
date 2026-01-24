using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eneba.Api.Data;

namespace Eneba.Api.Controllers;

[ApiController]
[Route("list")]
public class ListController : ControllerBase
{
    private readonly AppDbContext _db;
    public ListController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string? search)
    {
        var q = _db.Offers.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim();

            // "fuzzy preferred" — начнём с нормального LIKE/Contains
            q = q.Where(x =>
                x.Title.Contains(s) ||
                x.GameName.Contains(s));
        }

        // можно ограничить, как на маркетплейсе
        var result = await q
            .OrderBy(x => x.GameName)
            .ThenBy(x => x.Price)
            .Take(50)
            .Select(x => new {
                id = x.Id,
                title = x.Title,
                gameName = x.GameName,
                platform = x.Platform,
                region = x.Region,
                price = x.Price,
                oldPrice = x.OldPrice,
                discountPercent = x.DiscountPercent,
                imageUrl = x.ImageUrl,
                cashback = x.Cashback
            })
            .ToListAsync();

        return Ok(result);
    }
}
