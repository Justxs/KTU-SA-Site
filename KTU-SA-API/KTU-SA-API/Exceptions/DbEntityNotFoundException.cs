using KTU_SA_API.Domain.Models;
using System.Net;

namespace KTU_SA_API.Exceptions;

public class DbEntityNotFoundException<T> : ApiException
    where T : Entity
{
    public override HttpStatusCode StatusCode => HttpStatusCode.NotFound;

    public sealed override string[] Messages { get; }

    public DbEntityNotFoundException()
    {
        Messages = new[] { $"{typeof(T).Name} entry not found", };
    }

    public DbEntityNotFoundException(Guid id)
    {
        Messages = new[] { $"{typeof(T).Name} entry {id} not found" };
    }
}

