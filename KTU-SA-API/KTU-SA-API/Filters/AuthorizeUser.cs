using KTU_SA_API.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace KTU_SA_API.Filters;

public class AuthorizeUser : AuthorizeAttribute, IAuthorizationFilter
{
    private readonly Role[] _roles;
    private readonly SaUnit[] _saUnits;

    public AuthorizeUser(Role[] roles = null, SaUnit[] saUnits = null)
    {
        _roles = roles ?? Array.Empty<Role>();
        _saUnits = saUnits ?? Array.Empty<SaUnit>();
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;
        if (!user.Identity.IsAuthenticated)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        var userRole = user.Claims.FirstOrDefault(c => c.Type == "saRole")?.Value;
        var userSaUnit = user.Claims.FirstOrDefault(c => c.Type == "saUnit")?.Value;

        bool isRoleAllowed = !_roles.Any() || _roles.Any(role => role.ToString() == userRole);
        bool isSaUnitAllowed = !_saUnits.Any() || _saUnits.Any(saUnit => saUnit.ToString() == userSaUnit);

        if (!isRoleAllowed || !isSaUnitAllowed)
        {
            context.Result = new ForbidResult();
        }
    }
}

