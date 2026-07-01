import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../api/usuarios';

export function RegisterPage() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await cadastrarUsuario({ nome, login, senha, confirmarSenha });
      navigate('/login');
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        'Falha ao cadastrar usuário.';
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <form
        className="card"
        onSubmit={handleSubmit}
        style={{ maxWidth: 520 }}
      >
        <h2 className="page-title">Cadastro de Usuário</h2>

        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="login">Login</label>
          <input
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmarSenha">Confirmar senha</label>
          <input
            id="confirmarSenha"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <div className="form-actions">
          <button
            className="btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Cadastrar'}
          </button>
        </div>

        {error && <div className="form-error">{error}</div>}
      </form>
    </div>
  );
}