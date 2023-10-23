using System.Net;

namespace KTU_SA_API.Exceptions;

public abstract class ApiException : Exception
{
    public abstract HttpStatusCode StatusCode { get; }

    public abstract string[] Messages { get; }
}
