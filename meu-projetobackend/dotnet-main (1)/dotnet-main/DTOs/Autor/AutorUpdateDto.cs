using System.ComponentModel.DataAnnotations;

namespace PrimeiraApi.Dtos;
public class AutorUpdateDto {   
    [Required(ErrorMessage = "O nome do autor é obrigatório.")]
    [MaxLength(120,ErrorMessage = "O nome do autor pode ter no máximo 120 caracteres.")]
    public string Nome { get; set; } = string.Empty;
}
