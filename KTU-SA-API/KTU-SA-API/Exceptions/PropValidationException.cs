using System.Net;

namespace KTU_SA_API.Exceptions;

public class PropValidationException : ApiException
{
    public override HttpStatusCode StatusCode => HttpStatusCode.BadRequest;

    public sealed override string[] Messages { get; }

    public PropValidationException(IEnumerable<string> errorMessages)
    {
        Messages = errorMessages.ToArray();
    }

    public PropValidationException(string errorMessage)
    {
        Messages = new[] { errorMessage };
    }
}
