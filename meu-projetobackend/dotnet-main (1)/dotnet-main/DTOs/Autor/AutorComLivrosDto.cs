namespace PrimeiraApi.Dtos;
public class AutorComLivrosDTO {
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public List<LivroDto> Livros { get; set; } = new();
}
