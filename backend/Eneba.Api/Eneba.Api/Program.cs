using Eneba.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

// Db
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("frontend", p =>
        p.WithOrigins(
            "http://localhost:5173",
            "https://eneba-web.azurewebsites.net" // <- сюда домен прод-фронта
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
    // если фронт будет отправлять cookies/authorization header с credentials:
    // .AllowCredentials()
    );
});

var app = builder.Build();

// ---- DB migrate + seed (как у тебя) ----
using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

    try
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        db.Database.Migrate();

        if (!db.Offers.Any())
        {
            db.Offers.AddRange(
                new Eneba.Api.Models.Offer
                {
                    Title = "FIFA 23 EA App Key (PC) GLOBAL",
                    GameName = "FIFA 23",
                    Platform = "PC",
                    Region = "GLOBAL",
                    Price = 29.99m,
                    OldPrice = 69.99m,
                    DiscountPercent = 57,
                    ImageUrl = "https://picsum.photos/seed/fifa23/600/400",
                    Cashback = 0.30m
                },
                new Eneba.Api.Models.Offer
                {
                    Title = "Red Dead Redemption 2 (PC) GLOBAL Key",
                    GameName = "Red Dead Redemption 2",
                    Platform = "PC",
                    Region = "GLOBAL",
                    Price = 34.99m,
                    OldPrice = 59.99m,
                    DiscountPercent = 42,
                    ImageUrl = "https://picsum.photos/seed/rdr2/600/400",
                    Cashback = 0.35m
                },
                new Eneba.Api.Models.Offer
                {
                    Title = "Split Fiction EA App Key (PC) GLOBAL",
                    GameName = "Split Fiction",
                    Platform = "PC",
                    Region = "GLOBAL",
                    Price = 40.93m,
                    OldPrice = 42.50m,
                    DiscountPercent = 4,
                    ImageUrl = "https://picsum.photos/seed/splitfiction/600/400",
                    Cashback = 0.41m
                }
            );
            db.SaveChanges();
        }
    }
    catch (SqlException ex)
    {
        logger.LogError(ex, "SQL connection error: {Message}", ex.Message);
        throw;
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "DB init error: {Message}", ex.Message);
        throw;
    }
}

// ---- HTTP pipeline ----
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Обычно можно оставить. Если будут проблемы с редиректами на Azure — временно отключим.
app.UseHttpsRedirection();

app.UseRouting();

// CORS должно быть между Routing и endpoints
app.UseCors("frontend");

app.UseAuthorization();


//app.UseWelcomePage();

app.MapControllers();

app.Run();
