using System.Net;

namespace KTU_SA_API.Exceptions;

public class ErrorResponse
{
    public HttpStatusCode StatusCode { get; init; }

    public IEnumerable<string> Messages { get; init; }

    public static ErrorResponse FromException(Exception exception)
    {
        if (exception is ApiException apiException)
        {
            return new ErrorResponse
            {
                StatusCode = apiException.StatusCode,
                Messages = apiException.Messages,
            };
        }

        return new ErrorResponse
        {
            StatusCode = HttpStatusCode.InternalServerError,
            Messages = new[] { exception.Message },
        };
    }
}
