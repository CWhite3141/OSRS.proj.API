using OSRS.proj.API.Data.Interface;
using OSRS.proj.API.Data.Logic;
using OSRS.proj.API.Business.Interfaces;
using OSRS.proj.API.Business.Logic;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();

IConfiguration configuration = builder.Configuration;

builder.Services.AddHttpClient("OSRS_GE", c =>
{
    c.BaseAddress = new Uri(configuration["OSRS_GE:AppSettings:BaseUrl"]);
    c.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
    c.DefaultRequestHeaders.Add("ApplicationName", configuration["OSRS_GE:AppKeys:ApplicationName"]);
});
builder.Services.AddScoped<IOSRSGeRepository, OSRSGeRepository>();
builder.Services.AddScoped<IOSRSGeService, OSRSGeService>();


// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev",
        builder => builder.WithOrigins("http://localhost:3000")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});


var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Apply CORS middleware
app.UseRouting();
app.UseCors("AllowReactDev");


app.UseAuthorization();

app.MapControllers();

app.Run();
