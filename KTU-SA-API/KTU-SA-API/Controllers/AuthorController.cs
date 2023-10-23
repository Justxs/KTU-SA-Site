using KTU_SA_API.Domain.Dto.Author;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace KTU_SA_API.Controllers;

public class AuthorController : BaseController
{
    private readonly IRepository<Author> _repository;
    private readonly IMapper _mapper;

    public AuthorController(IRepository<Author> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AuthorCreateDto authorCreateDto)
    {
        Author author = _mapper.Map<Author>(authorCreateDto);
        author.Id = Guid.NewGuid();

        await _repository.AddAsync(author);
        return Ok("Author created successfully");
    }

    [HttpGet]
    public async Task<IActionResult> GetById([FromQuery] Guid Id)
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
    public async Task<IActionResult> Update([FromBody] AuthorUpdateDto authorDto)
    {
        Author author = await _repository.GetByIdAsync(authorDto.Id);
        author = _mapper.Map<Author>(authorDto);

        await _repository.Update(author);
        return Ok("Author updated successfully");
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteById([FromQuery] Guid Id)
    {
        await _repository.DeleteAsync(Id);

        return Ok("Author deleted successfully");
    }
}
