using System.ComponentModel.DataAnnotations;
namespace PrimeiraApi.Dtos;
public class UsuarioCreateDto{
    [Required(ErrorMessage = "Nome é obrigatório.")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "Login é obrigatório.")]
    public string Login { get; set; } = string.Empty;


    [Required(ErrorMessage = "Senha é obrigatória.")]
    public string Senha { get; set; } = string.Empty;
    

    [Required(ErrorMessage = "Confirmar Senha é obrigatória.")]
    public string ConfirmarSenha { get; set; } = string.Empty;
}