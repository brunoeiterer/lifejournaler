using JournalerBackend.DbContexts;
using JournalerBackend.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("JWTKey"));

var builder = WebApplication.CreateBuilder(args);

var allowedOrigins = "frontend";

builder.Services.AddHttpLogging(o => {});

builder.Services.AddCors(options =>
    options.AddPolicy(name: allowedOrigins,
        policy => {
            policy.WithOrigins("https://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        }));

builder.Services.AddAuthentication(options => {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "JournalerBackend",
            ValidAudience = "JournalerAudience",
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddScoped<IPasswordHasher<UserEntity>, PasswordHasher<UserEntity>>();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers()
                .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

builder.Services.AddScoped<JournalerDbContext>();

builder.Services.AddDbContext<JournalerDbContext>(options => 
    options.UseNpgsql(Environment.GetEnvironmentVariable("DatabaseConnectionString")));

var app = builder.Build();

app.UseHttpLogging();

app.UseCors(allowedOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();
