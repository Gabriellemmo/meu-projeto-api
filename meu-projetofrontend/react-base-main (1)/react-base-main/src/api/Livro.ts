import { http } from './http';
import { LivroDto } from './types';

export async function listarLivros() {
  const { data } = await http.get<LivroDto[]>('/api/Livros');
  return data;
}

export async function criarLivro(payload: {
  titulo: string;
  valor: number;
  autorIds: number[];
}) {
  const { data } = await http.post<{ id: number }>('/api/Livros', payload);
  return data;
}

export async function atualizarLivro(id: number, payload: { titulo: string; valor: number; autorIds: number[] }) {
  await http.put(`/api/Livros/${id}`, payload);
}

export async function removerLivro(id: number) {
  await http.delete(`/api/Livros/${id}`);
}

