import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AutoresPage } from './pages/AutorPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { LivrosPage } from './pages/LivroPage';
import { RegisterPage } from './pages/RegisterPage';
import { RequireAuth } from './routes/RequireAuth';
import { Layout } from './ui/Layout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/autores"
          element={
            <RequireAuth>
              <AutoresPage />
            </RequireAuth>
          }
        />
        <Route
          path="/livros"
          element={
            <RequireAuth>
              <LivrosPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
