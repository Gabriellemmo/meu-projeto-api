  export type LoginResponse = {
    token: string;
    nome: string;
    usuario: string;
  };

  export type AutorDto = {
    id: number;
    nome: string;
  };

  export type LivroDto = {
    id: number;
    titulo: string;
    valor: number;
    autores?: AutorDto[];
  };

