
namespace KTU_SA_API.Interfaces;

public interface IGoogleService
{
    public Task<string> ExchangeCodeForUserEmailAsync(string code, string redirectUri);
}
