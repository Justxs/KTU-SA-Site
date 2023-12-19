using KTU_SA_API.Domain.Dto.UserDto;
using KTU_SA_API.Domain.Enums;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Exceptions;
using KTU_SA_API.Filters;
using KTU_SA_API.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace KTU_SA_API.Controllers;

[AuthorizeUser(roles: new Role[] { Role.Admin })]
public class UsersController : BaseController
{
    private readonly IRepository<User> _repository;
    private readonly IMapper _mapper;

    public UsersController(IRepository<User> repository, IMapper mapper)
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

    [HttpPatch]
    [Route("{Id}")]
    public async Task<IActionResult> Update(Guid Id, [FromBody] UserUpdateDto userDto)
    {
        User user = await _repository.GetByIdAsync(Id);
        user.SaUnit = userDto.SaUnit;
        user.Role = userDto.Role;

        await _repository.UpdateAsync(user);
        return NoContent();
    }

    [HttpDelete]
    [Route("{Id}")]
    public async Task<IActionResult> DeleteById(Guid Id)
    {
        Guid.TryParse(User.FindFirst("userId")?.Value, out Guid userIdClaim);

        if (userIdClaim == Id)
        {
            throw new ConflictException("You can't delete your own account");
        }
        
        await _repository.DeleteByIdAsync(Id);

        return NoContent();
    }
}
