using System.Text.Json;
using KTU_SA_API.Exceptions;
using Microsoft.AspNetCore.Mvc.Filters;

namespace KTU_SA_API.Filters;

public class ExceptionFilter : ExceptionFilterAttribute
{
    private readonly ILogger<ExceptionFilter> _logger;

    public ExceptionFilter(ILogger<ExceptionFilter> logger)
    {
        _logger = logger;
    }

    public override void OnException(ExceptionContext context)
    {
        _logger.LogError($"{context.Exception}");
        var errorResponse = ErrorResponse.FromException(context.Exception);
        AddErrorToContext(context, errorResponse);
    }

    private static void AddErrorToContext(ExceptionContext context, ErrorResponse errorResponse)
    {
        context.HttpContext.Response.StatusCode = (int)errorResponse.StatusCode;
        context.HttpContext.Response.ContentType = "application/json";
        context.HttpContext.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
        context.ExceptionHandled = true;
    }
}
