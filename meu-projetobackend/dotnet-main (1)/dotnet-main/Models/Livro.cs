namespace PrimeiraApi.Models;

public class Livro{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public ICollection<Autor> Autores { get; set; } = new List<Autor>();
}