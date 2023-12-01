using System.Net;

namespace KTU_SA_API.Exceptions;

public class UnauthorizedException : ApiException
{
    public override HttpStatusCode StatusCode => HttpStatusCode.Unauthorized;

    public sealed override string[] Messages { get; }

    public UnauthorizedException(string errorMessage)
    {
        Messages = new[] { errorMessage };
    }
}
