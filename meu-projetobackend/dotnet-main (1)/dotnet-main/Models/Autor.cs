namespace PrimeiraApi.Models;

public class Autor{

    public int Id { get; set; }
public string Nome { get; set; } = string.Empty;
    // N:N
   public ICollection<Livro> Livros { get; set; } = new List<Livro>();
}
