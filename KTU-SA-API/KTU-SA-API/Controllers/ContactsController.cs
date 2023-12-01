using KTU_SA_API.Domain.Dto.ContactDto;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KTU_SA_API.Controllers;

[Authorize]
public class ContactsController : BaseController
{
    private readonly IRepository<Contact> _repository;
    private readonly IMapper _mapper;

    public ContactsController(IRepository<Contact> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ContactCreateDto contactCreateDto)
    {
        Contact contact = _mapper.Map<Contact>(contactCreateDto);
        contact.Id = Guid.NewGuid();

        await _repository.CreateAsync(contact);
        return Created("~/api/Contacts/" + contact.Id, contact);
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var authors = await _repository.GetAllAsync();
        var authorsDto = _mapper.Map<IEnumerable<ContactDto>>(authors);

        return Ok(authorsDto);
    }

    [HttpGet]
    [Route("{Id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(Guid Id)
    {
        var contact = await _repository.GetByIdAsync(Id);
        var contactDto = _mapper.Map<ContactDto>(contact);

        return Ok(contactDto);
    }

    [HttpPut]
    [Route("{Id}")]
    public async Task<IActionResult> Update(Guid Id, [FromBody] ContactCreateDto contactUpdate)
    {
        var contact = await _repository.GetByIdAsync(Id);
        contact.FullName = contactUpdate.FullName;
        contact.PhoneNumber = contactUpdate.PhoneNumber;
        contact.Email = contactUpdate.Email;
        contact.PositionId = contactUpdate.PositionId;

        await _repository.UpdateAsync(contact);

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
