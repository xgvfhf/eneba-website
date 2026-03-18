using Eneba.Api.Data;
using Eneba.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("likes")]
public class LikesController : ControllerBase
{
    private readonly AppDbContext _db;
    public LikesController(AppDbContext db) => _db = db;

    // POST /likes/toggle?offerId=1&clientId=abc
    [HttpPost("toggle")]
    public async Task<IActionResult> Toggle([FromQuery] int offerId, [FromQuery] string clientId)
    {
        if (string.IsNullOrWhiteSpace(clientId))
            return BadRequest("clientId is required");

        var existing = await _db.OfferLikes
            .FirstOrDefaultAsync(x => x.OfferId == offerId && x.ClientId == clientId);

        bool liked;

        if (existing is null)
        {
            _db.OfferLikes.Add(new OfferLike { OfferId = offerId, ClientId = clientId });
            liked = true;
        }
        else
        {
            _db.OfferLikes.Remove(existing);
            liked = false;
        }

        await _db.SaveChangesAsync();

        var likes = await _db.OfferLikes.CountAsync(x => x.OfferId == offerId);

        return Ok(new { offerId, liked, likes });
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string clientId)
    {
        if (string.IsNullOrWhiteSpace(clientId))
            return BadRequest("clientId is required");

        var result = await _db.OfferLikes
            .Where(l => l.ClientId == clientId)
            .Select(l => l.Offer)
            .Select(o => new
            {
                id = o.Id,
                title = o.Title,
                gameName = o.GameName,
                region = o.Region,
                price = o.Price,
                oldPrice = o.OldPrice,
                discountPercent = o.DiscountPercent,
                imageUrl = o.ImageUrl,
                cashback = o.Cashback
            })
            .ToListAsync();

        return Ok(result);
    }
}
