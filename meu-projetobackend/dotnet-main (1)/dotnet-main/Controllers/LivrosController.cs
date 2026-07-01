using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrimeiraApi.Data;
using PrimeiraApi.Models;
using PrimeiraApi.Dtos;

namespace PrimeiraApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LivrosController : ControllerBase {
    private readonly AppDbContext _context;

    public LivrosController(AppDbContext context) {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LivroDto>>> GetAllAsync() {
        var livro = await _context.Livros
            .Include(l => l.Autores)
            .AsNoTracking()
            .ToListAsync();

   var result = livro.Select(l => new LivroDto {
    Id = l.Id,
    Titulo = l.Titulo,
    Valor = l.Valor,
    Autores = l.Autores
        .Select(a => new AutorDto {
            Id = a.Id,
            Nome = a.Nome
        })
        .ToList()
});


        return Ok(result);
    }

    [HttpGet("{id:int}", Name = "GetLivroById")]
    public async Task<ActionResult<LivroDto>> GetByIdAsync(int id) {
        var livro = await _context.Livros
            .Include(l => l.Autores)
            .AsNoTracking()
            .FirstOrDefaultAsync(l => l.Id == id);

        if (livro is null) return NotFound();

        var result = new LivroDto {
            Id = livro.Id,
            Titulo = livro.Titulo,
            Valor = livro.Valor,
            Autores = livro .Autores 
                .Select(a => new AutorDto { Id = a.Id, Nome = a.Nome })
                .ToList()
        };

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<LivroDto>> CreateAsync(LivroCreateDto dto) {
        var autores = await _context.Autores
            .Where(a => dto.AutorIds.Contains(a.Id))
            .ToListAsync();

        var livro = new Livro {
            Titulo = dto.Titulo,
            Valor = dto.Valor,
            Autores = autores
        };

        _context.Livros.Add(livro);
        await _context.SaveChangesAsync();

        return CreatedAtRoute("GetLivroById", new { id = livro.Id }, new { id = livro.Id });
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateAsync(int id, LivroUpdateDto dto) {
        var livro = await _context.Livros
            .Include(l => l.Autores)
            .FirstOrDefaultAsync(l => l.Id == id);

        if (livro is null) return NotFound();

        livro.Titulo = dto.Titulo;
        livro.Valor = dto.Valor;

        var autores = await _context.Autores
            .Where(a => dto.AutorIds.Contains(a.Id))
            .ToListAsync();

        livro.Autores = autores;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAsync(int id) {
        var livro = await _context.Livros.FindAsync(id);

        if (livro is null) return NotFound();

        _context.Livros.Remove(livro);
        await _context.SaveChangesAsync();

        return NoContent(); 
    }
}