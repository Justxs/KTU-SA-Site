using KTU_SA_API.Domain.Dto.ContactDto;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace KTU_SA_API.Controllers;

public class ContactController : BaseController
{
    private readonly IRepository<Contact> _repository;
    private readonly IMapper _mapper;

    public ContactController(IRepository<Contact> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ContactCreateDto contactCreateDto)
    {
        Contact contact = _mapper.Map<Contact>(contactCreateDto);
        contact.Id = Guid.NewGuid();

        await _repository.AddAsync(contact);
        return Ok("Contact created successfully");
    }

    [HttpGet]
    public IActionResult GetBySaUnit([FromQuery] Guid saUnitId)
    {
        var contacts = _repository.AsQueryable().Where(contact => contact.StudentAsociationUnitId == saUnitId);
        var contactsDto = _mapper.Map<IEnumerable<ContactDto>>(contacts);

        return Ok(contactsDto);
    }

    [HttpGet]
    public async Task<IActionResult> GetById([FromQuery] Guid Id)
    {
        var contact = await _repository.GetByIdAsync(Id);
        var contactDto = _mapper.Map<ContactDto>(contact);

        return Ok(contactDto);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] ContactUpdateDto contactUpdate)
    {
        var contact = await _repository.GetByIdAsync(contactUpdate.Id);
        contact = _mapper.Map<Contact>(contactUpdate);

        await _repository.Update(contact);

        return Ok("Contact is updated successfully");
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteById([FromQuery] Guid Id)
    {
        await _repository.DeleteAsync(Id);

        return Ok("Contact deleted successfully");
    }
}
