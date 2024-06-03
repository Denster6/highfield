using highfield_api;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Text.Json;
using System.Text.RegularExpressions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<HighfieldDb>(opt => opt.UseInMemoryDatabase("UserList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
 //   app.PopulateDb();
}

app.UseCors(
   options => options.WithOrigins("http://localhost:4200")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials()
 );

app.UseHttpsRedirection();

app.MapGet("/users", async (HighfieldDb db) =>
    await db.Users.ToListAsync());

app.MapPost("/users", async (User user, HighfieldDb db) =>
{
    db.Users.Add(user);
    await db.SaveChangesAsync();

    return Results.Created($"/users/{user.id}", user);
});

app.MapPost("/users/populate", async (HighfieldDb db) =>
{
    WebClient client = new WebClient();
    string baseUrl = "https://recruitment.highfieldqualifications.com";

    string content = client.DownloadString($"{baseUrl}/api/test");
    string contentCleaned = Regex.Replace(content, @"\t|\n|\r", "");

    List<User> userList = JsonSerializer.Deserialize<List<User>>(contentCleaned);
    foreach (User user in userList)
    {
        db.Users.Add(user);
        await db.SaveChangesAsync();
    }
});

app.Run();
