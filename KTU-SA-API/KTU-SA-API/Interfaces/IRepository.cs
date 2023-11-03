namespace KTU_SA_API.Interfaces;

public interface IRepository<T>
{
    Task CreateAsync(T model);

    Task UpdateAsync(T entity);

    Task DeleteByIdAsync(Guid id);

    Task<IEnumerable<T>> GetAllAsync();

    Task<T> GetByIdAsync(Guid id);

    IQueryable<T> AsQueryable();
}
