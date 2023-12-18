using KTU_SA_API.Domain.Dto.Position;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KTU_SA_API.Controllers;

[Authorize]
public class PositionsController : BaseController
{
    private readonly IRepository<Position> _repository;
    private readonly IRepository<StudentAsociationUnit> _saUnitRepository;
    private readonly IMapper _mapper;

    public PositionsController(IRepository<Position> repository, IMapper mapper, IRepository<StudentAsociationUnit> saUnitRepository)
    {
        _repository = repository;
        _saUnitRepository = saUnitRepository;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PositionCreateDto positionCreateDto)
    {
        var position = _mapper.Map<Position>(positionCreateDto);
        position.Id = Guid.NewGuid();

        foreach (var unitId in positionCreateDto.SaUnitIds)
        {
            var saUnit = await _saUnitRepository.GetByIdAsync(unitId);
            if (saUnit != null)
            {
                position.StudentAsociationUnits.Add(saUnit);
            }
        }

        await _repository.CreateAsync(position);
        return Created("~/api/Positions/" + position.Id, position);
    }

    [HttpGet]
    [Route("{Id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(Guid Id)
    {
        Position position = await _repository.GetByIdAsync(Id);
        var positionDto = _mapper.Map<PositionDto>(position);

        return Ok(positionDto);
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var positions = await _repository.GetAllAsync();
        var positionsDto = _mapper.Map<IEnumerable<PositionDto>>(positions);

        return Ok(positionsDto);
    }

    [HttpPut]
    [Route("{Id}")]
    public async Task<IActionResult> Update(Guid Id, [FromBody] PositionCreateDto positionDto)
    {
        Position position = await _repository.GetByIdAsync(Id);
        position.Description = positionDto.Description;
        position.Name = positionDto.Name;

        await _repository.UpdateAsync(position);
        return NoContent();
    }

    [HttpDelete]
    [Route("{Id}")]
    public async Task<IActionResult> DeleteById(Guid Id)
    {
        await _repository.DeleteByIdAsync(Id);

        return NoContent();
    }
}
