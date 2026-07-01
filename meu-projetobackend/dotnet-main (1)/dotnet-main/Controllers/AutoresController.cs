using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrimeiraApi.Data;
using PrimeiraApi.Models;
using PrimeiraApi.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace PrimeiraApi.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AutoresController : ControllerBase {
    private readonly AppDbContext _context;

    public AutoresController(AppDbContext context) {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AutorDto>>> GetAllAsync() {
        var autores = await _context.Autores
            .AsNoTracking()
            .ToListAsync();

        var result = autores.Select(a => new AutorDto {
            Id = a.Id,
            Nome = a.Nome
        });

        return Ok(result);
    }

    [HttpGet("{id:int}", Name = "GetAutorById")]
    public async Task<ActionResult<AutorDto>> GetByIdAsync(int id) {
        var autor = await _context.Autores
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id);

        if (autor is null)
            return NotFound();

        var result = new AutorDto {
            Id = autor.Id,
            Nome = autor.Nome
        };

        return Ok(result);
    }

    [HttpGet("{id:int}/Livros")]
    public async Task<ActionResult<AutorComLivrosDTO>> GetAutorComLivrosAsync(int id) {
        var autor = await _context.Autores
            .Include(a => a.Livros)
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id);

        if (autor is null)
            return NotFound();

        var result = new AutorComLivrosDTO {
            Id = autor.Id,
            Nome = autor.Nome,
            Livros = autor.Livros.Select(l => new LivroDto {
                Id = l.Id,
                Titulo = l.Titulo,
                Valor = l.Valor
            }).ToList()
        };

        return Ok(result);
        
    }

    [HttpPost]
    public async Task<ActionResult<AutorDto>> CreateAsync(AutorCreateDto dto) {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var autor = new Autor {
            Nome = dto.Nome
        };
        

        _context.Autores.Add(autor);
        await _context.SaveChangesAsync();

        var result = new AutorDto {
            Id = autor.Id,
            Nome = autor.Nome
        };

        return CreatedAtRoute("GetAutorById", new { id = autor.Id }, result);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateAsync(int id, AutorUpdateDto dto) {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var autor = await _context.Autores.FindAsync(id);

        if (autor is null)
            return NotFound();

        autor.Nome = dto.Nome;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAsync(int id) {
        var autor = await _context.Autores.FindAsync(id);

        if (autor is null)
            return NotFound();

        _context.Autores.Remove(autor);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}