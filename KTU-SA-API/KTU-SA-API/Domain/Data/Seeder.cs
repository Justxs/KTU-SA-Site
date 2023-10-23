using KTU_SA_API.Domain.Enums;
using KTU_SA_API.Domain.Models;

namespace KTU_SA_API.Domain.Data;

public class Seeder
{
    private readonly DatabaseContext _context;
    public Seeder(DatabaseContext context)
    {
        _context = context;
    }
    public void Seed()
    {
        if (_context.Set<StudentAsociationUnit>().Any())
        {
            return;
        }
        var SaUnits = AllSaUnits();

        _context.Set<StudentAsociationUnit>().AddRange(SaUnits);
        _context.SaveChanges();
    }

    private static List<StudentAsociationUnit> AllSaUnits()
    {
        var allSa = new List<StudentAsociationUnit>();

        foreach (SaUnit sa in Enum.GetValues(typeof(SaUnit)))
        {
            allSa.Add(new StudentAsociationUnit
            {
                Id = Guid.NewGuid(),
                Name = sa,
            });
        }

        return allSa;
    }
}
