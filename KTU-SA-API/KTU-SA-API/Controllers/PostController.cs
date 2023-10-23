using KTU_SA_API.Domain.Dto.PostDto;
using KTU_SA_API.Domain.Models;
using KTU_SA_API.Interfaces;
using KTU_SA_API.Models.Domain;
using KTU_SA_API.Models.Enums;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace KTU_SA_API.Controllers;

public class PostController : BaseController
{
    private readonly IRepository<Post> _repository;
    private readonly IRepository<StudentAsociationUnit> _saUnitRepository;
    private readonly IMapper _mapper;

    public PostController(IRepository<Post> repository, 
        IRepository<StudentAsociationUnit> saUnitRepository,
        IMapper mapper)
    {
        _repository = repository;
        _saUnitRepository = saUnitRepository;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PostCreateDto postCreateDto)
    {
        Post post = _mapper.Map<Post>(postCreateDto);
        post.Id = Guid.NewGuid();
        post.CreatedDate = DateTime.Now;

        await _repository.AddAsync(post);
        return Ok("Post created successfully");
    }

    [HttpGet]
    public async Task<IActionResult> GetById([FromQuery] Guid Id)
    {
        Post post = await _repository.GetByIdAsync(Id);
        var postDto = _mapper.Map<PostDto>(post);

        return Ok(postDto);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var posts = await _repository.GetAllAsync();
        var postsDto = _mapper.Map<IEnumerable<PostDto>>(posts);

        return Ok(postsDto);
    }

    [HttpGet]
    public IActionResult GetAllEventBySaUnit([FromQuery] Guid saId)
    {
        var events = _saUnitRepository.AsQueryable()
            .Where(unit => unit.Id == saId)
            .SelectMany(unit => unit.Authors
                .SelectMany(author => author.Posts
                    .Where(post => post.Type == PostType.Event)
                    .Select(post => post )))
            .ToList();


        var postsDto = _mapper.Map<IEnumerable<PostDto>>(events);

        return Ok(postsDto);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] PostUpdateDto postDto)
    {
        Post post = await _repository.GetByIdAsync(postDto.Id);
        post = _mapper.Map<Post>(postDto);

        await _repository.Update(post);
        return Ok("Post updated successfully");
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteById([FromQuery] Guid Id)
    {
        await _repository.DeleteAsync(Id);

        return Ok("Post deleted successfully");
    }
}
