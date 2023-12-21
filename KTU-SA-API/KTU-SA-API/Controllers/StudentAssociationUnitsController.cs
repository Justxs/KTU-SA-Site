using KTU_SA_API.Domain.Dto.StudentAsociationUnitDto;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KTU_SA_API.Controllers;

[Authorize]
public class StudentAssociationUnitsController : BaseController
{
    private readonly IRepository<StudentAsociationUnit> _repository;
    private readonly IMapper _mapper;

    public StudentAssociationUnitsController(IRepository<StudentAsociationUnit> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] StudentAsociationUnitCreateDto SaCreateDto)
    {
        var saUnit = _mapper.Map<StudentAsociationUnit>(SaCreateDto);
        saUnit.Id = Guid.NewGuid();

        await _repository.CreateAsync(saUnit);
        return Created("~/api/StudentAsociationUnits/" + saUnit.Id, saUnit);
    }

    [HttpGet]
    [Route("{Id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(Guid Id)
    {
        var saUnit  = await _repository.GetByIdAsync(Id);
        var saUnitDto = _mapper.Map<StudentAsociationUnitDto>(saUnit);

        return Ok(saUnitDto);
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var saUnits = await _repository.GetAllAsync();
        var saUnitsDto = _mapper.Map<IEnumerable<StudentAsociationUnitDto>>(saUnits);

        return Ok(saUnitsDto);
    }

    [HttpPut]
    [Route("{Id}")]
    public async Task<IActionResult> Update(Guid Id, [FromBody] StudentAsociationUnitCreateDto saUpdateDto)
    {
        var saUnit = await _repository.GetByIdAsync(Id);
        saUnit = _mapper.Map<StudentAsociationUnit>(saUpdateDto);

        await _repository.UpdateAsync(saUnit);
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
