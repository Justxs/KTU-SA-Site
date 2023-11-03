using System.Net;

namespace KTU_SA_API.Exceptions;

public class ConflictException : ApiException
{
    public override HttpStatusCode StatusCode => HttpStatusCode.Conflict;

    public sealed override string[] Messages { get; }

    public ConflictException(string errorMessage)
    {
        Messages = new[] { errorMessage };
    }
}
