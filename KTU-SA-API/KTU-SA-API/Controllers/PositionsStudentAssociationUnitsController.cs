using KTU_SA_API.Domain.Dto.ContactDto;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KTU_SA_API.Controllers;

[ApiController]
[Route("api/")]
[Authorize]
public class PositionsStudentAssociationUnitsController : ControllerBase
{
    private readonly IRepository<StudentAsociationUnit> _saUnitRepository;
    private readonly IRepository<Position> _positionRepository;
    private readonly IMapper _mapper;

    public PositionsStudentAssociationUnitsController(
        IRepository<StudentAsociationUnit> saUnitRepository, 
        IRepository<Position> positionRepository,
        IMapper mapper)
    {
        _saUnitRepository = saUnitRepository;
        _mapper = mapper;
        _positionRepository = positionRepository;
    }

    [HttpGet]
    [Route("StudentAssociationUnits/{SaUnitId}/Positions/{PositionId}/Contacts")]
    public IActionResult GetAllContactsByPosition(Guid SaUnitId, Guid PositionId)
    {
        var contacts = _saUnitRepository.AsQueryable()
            .Where(unit => unit.Id == SaUnitId)
            .SelectMany(unit => unit.Positions)
            .Where(position => position.Id == PositionId)
            .SelectMany(position => position.Contacts).ToList();

        var contactDto = _mapper.Map<IEnumerable<ContactDto>>(contacts);

        return Ok(contactDto);
    }

    [HttpPost]
    [Route("Positions/{PositionId}/StudentAssociationUnits")]
    public async Task<IActionResult> AddPositionToSaUnit([FromBody] List<Guid> SaUnitIds, Guid PositionId)
    {
        var positionToAssign = await _positionRepository.GetByIdAsync(PositionId);
        var saUnits = _saUnitRepository.AsQueryable().Where(pos => SaUnitIds.Contains(pos.Id)).ToList();

        foreach (var saUnit in saUnits)
        {
            saUnit.Positions.Add(positionToAssign);
            await _saUnitRepository.UpdateAsync(saUnit);
        }

        return NoContent();
    }
}
