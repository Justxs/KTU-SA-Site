using KTU_SA_API.Domain.Dto.Author;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace KTU_SA_API.Controllers;

public class AuthorsController : BaseController
{
    private readonly IRepository<Author> _repository;
    private readonly IMapper _mapper;

    public AuthorsController(IRepository<Author> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AuthorCreateDto authorCreateDto)
    {
        Author author = _mapper.Map<Author>(authorCreateDto);
        author.Id = Guid.NewGuid();

        await _repository.CreateAsync(author);
        return Created("~/api/Authors" + author.Id, author);
    }

    [HttpGet]
    [Route("{Id}")]
    public async Task<IActionResult> GetById(Guid Id)
    {
        Author author = await _repository.GetByIdAsync(Id);
        var authorDto = _mapper.Map<AuthorDto>(author);

        return Ok(authorDto);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var authors = await _repository.GetAllAsync();
        var authorsDto = _mapper.Map<IEnumerable<AuthorDto>>(authors);

        return Ok(authorsDto);
    }

    [HttpPut]
    [Route("{Id}")]
    public async Task<IActionResult> Update(Guid Id, [FromBody] AuthorCreateDto authorDto)
    {
        Author author = await _repository.GetByIdAsync(Id);
        author.Email = authorDto.Email;
        author.FullName = authorDto.FullName;
        author.StudentAsociationUnitId = authorDto.StudentAsociationUnitId;

        await _repository.UpdateAsync(author);
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
