namespace KTU_SA_API.Interfaces;

public interface IRepository<T>
{
    Task AddAsync(T model);

    Task Update(T model);

    Task DeleteAsync(Guid id);

    Task<IEnumerable<T>> GetAllAsync();

    Task<T> GetByIdAsync(Guid id);

    IQueryable<T> AsQueryable();
}
