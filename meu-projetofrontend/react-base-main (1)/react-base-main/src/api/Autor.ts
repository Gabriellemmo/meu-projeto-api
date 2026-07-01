import { http } from './http';
import { AutorDto } from './types';

export async function listarAutores() {
  const { data } = await http.get<AutorDto[]>('/api/Autores');
  return data;
}

export async function criarAutor(nome: string) {
  const { data } = await http.post<AutorDto>('/api/Autores', { nome });
  return data;
}

export async function atualizarAutor(id: number, nome: string) {
  await http.put(`/api/Autores/${id}`, { nome });
}

export async function removerAutor(id: number) {
  await http.delete(`/api/Autores/${id}`);
}

