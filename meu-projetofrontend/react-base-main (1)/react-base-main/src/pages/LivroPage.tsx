import React, { useEffect, useMemo, useState } from 'react';
import { listarAutores } from '../api/Autor';
import {
  atualizarLivro,
  criarLivro,
  listarLivros,
  removerLivro,
} from '../api/Livro';
import { AutorDto, LivroDto } from '../api/types';

export function LivrosPage() {
  const [livros, setLivros] = useState<LivroDto[]>([]);
  const [autores, setAutores] = useState<AutorDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<LivroDto | null>(null);

  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState<number>(0);
  const [autorIds, setAutorIds] = useState<number[]>([]);

  const sortedLivros = useMemo(
    () => [...livros].sort((a, b) => a.titulo.localeCompare(b.titulo)),
    [livros]
  );

  const sortedAutores = useMemo(
    () => [...autores].sort((a, b) => a.nome.localeCompare(b.nome)),
    [autores]
  );

  async function refresh() {
    setError(null);
    setLoading(true);

    try {
      const [auts, livs] = await Promise.all([
        listarAutores(),
        listarLivros(),
      ]);

      setAutores(auts);
      setLivros(livs);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
        err?.message ??
        'Falha ao carregar dados.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  function resetForm() {
    setEditing(null);
    setTitulo('');
    setValor(0);
    setAutorIds([]);
  }

  function toggleAutor(id: number) {
    setAutorIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const payload = {
        titulo,
        valor: Number(valor),
        autorIds,
      };

      if (editing) {
        await atualizarLivro(editing.id, payload);
      } else {
        await criarLivro(payload);
      }

      resetForm();
      await refresh();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
        err?.message ??
        'Falha ao salvar livro.'
      );
    }
  }

  return (
    <div className="page">
      <h2 className="page-title">Livros</h2>

      <form className="card" onSubmit={handleSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: 12,
          }}
        >
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="valor">Valor</label>
            <input
              id="valor"
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Autores</label>

          <select
            multiple
            value={autorIds.map(String)}
            size={Math.min(6, sortedAutores.length)}
          >
            {sortedAutores.map((a) => (
              <option
                key={a.id}
                value={a.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  toggleAutor(a.id);
                }}
              >
                {a.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button
            className="btn-primary"
            type="submit"
            disabled={!titulo.trim()}
          >
            {editing ? 'Atualizar' : 'Criar'}
          </button>

          {editing && (
            <button
              className="btn-secondary"
              type="button"
              onClick={resetForm}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {error && <div className="form-error">{error}</div>}
      {loading && <div className="loading">Carregando...</div>}

      <div className="list">
        {sortedLivros.map((l) => (
          <div key={l.id} className="list-item">
            <div>
              <strong>{l.titulo}</strong>{' '}
              <span className="muted">#{l.id}</span>

              <div className="muted">
                Valor: R$ {Number(l.valor).toFixed(2)}
              </div>

              <div className="muted">
                Autores:{' '}
                {(l.autores ?? []).map((a) => a.nome).join(', ') || '-'}
              </div>
            </div>

            <div className="form-actions">
              <button
                className="btn-outline"
                type="button"
                onClick={() => {
                  setEditing(l);
                  setTitulo(l.titulo);
                  setValor(Number(l.valor));
                  setAutorIds((l.autores ?? []).map((a) => a.id));
                }}
              >
                Editar
              </button>

              <button
                className="btn-danger"
                type="button"
                onClick={async () => {
                  if (!window.confirm(`Remover livro "${l.titulo}"?`))
                    return;

                  try {
                    await removerLivro(l.id);
                    await refresh();
                  } catch (err: any) {
                    setError(
                      err?.response?.data?.message ??
                      err?.message ??
                      'Falha ao remover livro.'
                    );
                  }
                }}
              >
                Remover
              </button>
            </div>
          </div>
        ))}

        {!loading && sortedLivros.length === 0 && (
          <div className="empty-state">
            Nenhum livro encontrado.
          </div>
        )}
      </div>
    </div>
  );
}