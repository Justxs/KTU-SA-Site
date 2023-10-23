using KTU_SA_API.Domain.Data;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Exceptions;
using KTU_SA_API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KTU_SA_API.Services;

public class Repository<T> : IRepository<T> where T : Entity
{
    private readonly DatabaseContext _context;

    public Repository(DatabaseContext context)
    {
        _context = context;
    }

    public async Task AddAsync(T model)
    {
        await _context.Set<T>().AddAsync(model);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.Set<T>().SingleOrDefaultAsync(entity => entity.Id == id);

        if (entity is null)
        {
            throw new DbEntityNotFoundException<T>(id);
        }

        _context.Set<T>().Remove(entity);

        await _context.SaveChangesAsync();
    }

    public async Task Update(T model)
    {
        _context.Set<T>().Update(model);
        await _context.SaveChangesAsync();
    }
    public IQueryable<T> AsQueryable()
    {
        return _context.Set<T>().AsQueryable();
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<T> GetByIdAsync(Guid id)
    {
        var entity = await _context.Set<T>().FindAsync(id);

        if (entity is null)
        {
            throw new DbEntityNotFoundException<T>();
        }

        return entity;
    }
}
