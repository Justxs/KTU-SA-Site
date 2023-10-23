using KTU_SA_API.Domain.Dto.StudentAsociationUnitDto;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace KTU_SA_API.Controllers;

public class StudentAsociationUnitController : BaseController
{
    private readonly IRepository<StudentAsociationUnit> _repository;
    private readonly IMapper _mapper;

    public StudentAsociationUnitController(IRepository<StudentAsociationUnit> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] StudentAsociationUnitCreateDto SaCreateDto)
    {
        var saUnit = _mapper.Map<StudentAsociationUnit>(SaCreateDto);
        saUnit.Id = Guid.NewGuid();

        await _repository.AddAsync(saUnit);
        return Ok("SA Unit created successfully");
    }

    [HttpGet]
    public async Task<IActionResult> GetById([FromQuery] Guid Id)
    {
        var saUnit  = await _repository.GetByIdAsync(Id);
        var saUnitDto = _mapper.Map<StudentAsociationUnitDto>(saUnit);

        return Ok(saUnitDto);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {

        var saUnits = await _repository.GetAllAsync();
        var saUnitsDto = _mapper.Map<IEnumerable<StudentAsociationUnitDto>>(saUnits);

        return Ok(saUnitsDto);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] StudentAsociationUnitUpdateDto saUpdateDto)
    {
        var saUnit = _mapper.Map<StudentAsociationUnit>(saUpdateDto);

        await _repository.Update(saUnit);
        return Ok("SA Unit updated successfully");
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteById([FromQuery] Guid Id)
    {
        await _repository.DeleteAsync(Id);

        return Ok("SA Unit deleted successfully");
    }
}
