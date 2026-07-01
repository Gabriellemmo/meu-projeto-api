using System.ComponentModel.DataAnnotations;
namespace PrimeiraApi.Dtos;
public class UsuarioDto{
    public int Id { get; set; }
    [Required(ErrorMessage = "Nome é obrigatório.")]
    public string Nome { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Login é obrigatório.")]
    public string Login { get; set; } = string.Empty;
}