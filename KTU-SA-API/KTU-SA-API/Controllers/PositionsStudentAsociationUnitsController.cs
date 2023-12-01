using KTU_SA_API.Domain.Dto.ContactDto;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Exceptions;
using KTU_SA_API.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KTU_SA_API.Controllers;

[ApiController]
[Route("api/StudentAsociationUnits")]
[Authorize]
public class PositionsStudentAsociationUnitsController : ControllerBase
{
    private readonly IRepository<StudentAsociationUnit> _saUnitRepository;
    private readonly IRepository<Position> _positionRepository;
    private readonly IMapper _mapper;

    public PositionsStudentAsociationUnitsController(
        IRepository<StudentAsociationUnit> saUnitRepository, 
        IRepository<Position> positionRepository,
        IMapper mapper)
    {
        _saUnitRepository = saUnitRepository;
        _mapper = mapper;
        _positionRepository = positionRepository;
    }

    [HttpGet]
    [Route("{SaUnitId}/Positions/{PositionId}/Contacts")]
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
    [Route("{SaUnitId}/Positions/{PositionId}")]
    public async Task<IActionResult> AddPositioToSaUnit(Guid SaUnitId, Guid PositionId)
    {
        var saUnit = await _saUnitRepository.GetByIdAsync(SaUnitId);
        var position = await _positionRepository.GetByIdAsync(PositionId);

        if (saUnit.Positions.Contains(position))
        {
            throw new ConflictException("SA unit already has this position");
        }

        saUnit.Positions.Add(position);
        await _saUnitRepository.UpdateAsync(saUnit);

        return Created("~/api/StudentAsociationUnits/" + SaUnitId + "/Positions/" + PositionId + "/Contacts", saUnit);
    }
}
