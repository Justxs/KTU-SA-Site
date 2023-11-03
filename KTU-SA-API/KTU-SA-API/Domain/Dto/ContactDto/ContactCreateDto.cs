namespace KTU_SA_API.Domain.Dto.ContactDto;

public class ContactCreateDto
{
    public string FullName { get; set; }

    public string Email { get; set; }

    public string PhoneNumber { get; set; }
        
    public Guid PositionId { get; set; }
}
