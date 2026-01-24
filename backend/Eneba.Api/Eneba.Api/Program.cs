using Eneba.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("frontend", p =>
        p.WithOrigins("http://localhost:5173")
         .AllowAnyHeader()
         .AllowAnyMethod());
});


var app = builder.Build();

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
        // Логирование и понятное сообщение — приложение падает чтобы не работать с некорректной БД.
        logger.LogError(ex, "Ошибка подключения к Azure SQL: {Message}. Проверьте сетевые настройки сервера и строку подключения.", ex.Message);
        throw;
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Ошибка при инициализации БД: {Message}", ex.Message);
        throw;
    }
}


app.UseCors("frontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
