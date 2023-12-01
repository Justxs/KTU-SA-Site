using KTU_SA_API.Domain.Dto.UserDto;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KTU_SA_API.Controllers;

[Authorize]
public class UserController : BaseController
{
    private readonly IRepository<User> _repository;
    private readonly IMapper _mapper;

    public UserController(IRepository<User> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _repository.GetAllAsync();
        var usersDto = _mapper.Map<IEnumerable<UserDto>>(users);

        return Ok(usersDto);
    }
}
