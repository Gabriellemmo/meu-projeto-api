using PrimeiraApi.Dtos;
namespace PrimeiraApi.Dtos;

public class LivroDto {
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public List<AutorDto> Autores { get; set; } = new();
}
