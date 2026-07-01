import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

export function LoginPage() {
  const navigate = useNavigate();
  const [loginValue, setLoginValue] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(loginValue, senha);
      navigate('/categorias');
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        'Falha ao autenticar. Verifique usuário/senha e se a API está rodando.';
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <form className="card" onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <h2 className="page-title">Login</h2>

        <div className="form-group">
          <label htmlFor="login">Usuário</label>
          <input
            id="login"
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
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
            autoComplete="current-password"
          />
        </div>

        <div className="form-actions">
          <button
            className="btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>

        {error && <div className="form-error">{error}</div>}
      </form>
    </div>
  );
}