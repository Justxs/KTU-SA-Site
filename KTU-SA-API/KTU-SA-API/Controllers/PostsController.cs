using KTU_SA_API.Domain.Dto.PostDto;
using KTU_SA_API.Interfaces;
using KTU_SA_API.Models.Domain;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KTU_SA_API.Controllers;

[Authorize]
public class PostsController : BaseController
{
    private readonly IRepository<Post> _repository;
    private readonly IMapper _mapper;

    public PostsController(IRepository<Post> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PostCreateDto postCreateDto)
    {
        Post post = _mapper.Map<Post>(postCreateDto);
        post.Id = Guid.NewGuid();
        post.CreatedDate = DateTime.Now;

        await _repository.CreateAsync(post);
        return Created("~/api/Posts/" + post.Id, post);
    }

    [HttpGet]
    [Route("{Id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(Guid Id)
    {
        Post post = await _repository.GetByIdAsync(Id);
        var postDto = _mapper.Map<PostDto>(post);

        return Ok(postDto);
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var posts = await _repository.GetAllAsync();
        var postsDto = _mapper.Map<IEnumerable<PostDto>>(posts);

        return Ok(postsDto);
    }

    [HttpPut]
    [Route("{Id}")]
    public async Task<IActionResult> Update(Guid Id, [FromBody] PostCreateDto postDto)
    {
        var post = await _repository.GetByIdAsync(Id);
        post.Description = postDto.Description;
        post.Title = postDto.Title;
        post.HtmlContent = postDto.HtmlContent;
        post.Type = postDto.Type;

        post.CreatedDate = DateTime.Now;

        await _repository.UpdateAsync(post);
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
