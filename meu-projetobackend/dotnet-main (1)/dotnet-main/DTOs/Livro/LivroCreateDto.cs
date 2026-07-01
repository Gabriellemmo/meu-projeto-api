using System.ComponentModel.DataAnnotations;
namespace PrimeiraApi.Dtos;

public class LivroCreateDto {

    [Required(ErrorMessage = "O título é obrigatório.")]
    [MaxLength(120, ErrorMessage = "O título pode ter no máximo 120 caracteres.")]
    public string Titulo { get; set; } = string.Empty;

    [Range(typeof(decimal), "0", "999999999999,99", ErrorMessage = "O valor deve ser positivo.")]
    public decimal Valor { get; set; }

    public List<int> AutorIds { get; set; } = new();
}
