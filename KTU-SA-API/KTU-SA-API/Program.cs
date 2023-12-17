using FluentValidation;
using FluentValidation.AspNetCore;
using KTU_SA_API.Domain.Data;
using KTU_SA_API.Filters;
using KTU_SA_API.Interfaces;
using KTU_SA_API.Mappings;
using KTU_SA_API.Services;
using KTU_SA_API.Validators.Posts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

services.AddControllers(options =>
{
    options.Filters.Add<ValidationFilter>();
    options.Filters.Add<ExceptionFilter>();
})
.AddJsonOptions(options =>
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

services.AddValidatorsFromAssemblyContaining<PostCreateValidator>();
services.AddFluentValidationAutoValidation();
services.AddFluentValidationClientsideAdapters();

services.AddEndpointsApiExplorer();
services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Insert google auth token here",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

services.AddDbContext<DatabaseContext>(options =>
{
    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
});

services.AddTransient<Seeder>();
services.AddScoped(typeof(IRepository<>),typeof(Repository<>));
services.AddScoped<IGoogleService, GoogleService>();
services.AddScoped<IJwtService, JwtService>();
services.AddSingleton(MapperProvider.Mapper);
services.AddHttpClient();

services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Secret"])),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });

services.AddCors(options =>
{
    options.AddPolicy(name: "CorsPolicy", builder =>
    {
        builder.WithOrigins(configuration["AllowedOrigins"])
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
    db.Database.Migrate();
}
//if (app.Environment.IsDevelopment()) To Do set it back for swagger in final version

app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


app.Run();
