using KTU_SA_API.Domain.Enums;

namespace KTU_SA_API.Domain.Dto.StudentAsociationUnitDto;

public class StudentAsociationUnitCreateDto
{
    public SaUnit Name { get; set; }

    public string Description { get; set; }
}
