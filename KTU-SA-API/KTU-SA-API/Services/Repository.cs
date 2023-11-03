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

    public async Task CreateAsync(T model)
    {
        await _context.Set<T>().AddAsync(model);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteByIdAsync(Guid id)
    {
        var entity = await _context.Set<T>().SingleOrDefaultAsync(entity => entity.Id == id);

        if (entity is null)
        {
            throw new DbEntityNotFoundException<T>(id);
        }

        _context.Set<T>().Remove(entity);

        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(T entity)
    {
        var local = _context.Set<T>()
        .Local
        .FirstOrDefault(oldEntity => oldEntity.Id == entity.Id);

        if (local != null)
        {
            _context.Entry(local).State = EntityState.Detached;
        }

        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
    public IQueryable<T> AsQueryable()
    {
        return _context.Set<T>().AsQueryable();
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _context.Set<T>().AsQueryable().ToListAsync();
    }

    public async Task<T> GetByIdAsync(Guid id)
    {
        var entity = await _context.Set<T>().SingleOrDefaultAsync(entity => entity.Id == id);

        if (entity is null)
        {
            throw new DbEntityNotFoundException<T>();
        }

        return entity;
    }
}
