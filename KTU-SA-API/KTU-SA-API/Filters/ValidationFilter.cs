using FluentValidation;
using KTU_SA_API.Exceptions;
using Microsoft.AspNetCore.Mvc.Filters;

namespace KTU_SA_API.Filters;

public class ValidationFilter : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var arguments = context.ActionArguments;

        foreach (var argument in arguments.Values)
        {
            if (argument is IValidator validator)
            {
                var result = await validator.ValidateAsync((IValidationContext)argument);

                if (!result.IsValid)
                {
                    var errors = result.Errors.Select(error => error.ErrorMessage);
                    throw new PropValidationException(errors);
                }
            }
        }

        await next();
    }
}
