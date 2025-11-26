// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../services/db";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simular delay de rede
    setTimeout(() => {
      const users = db.getUsers();
      if (login(email.trim(), password.trim(), users)) {
        const user = users.find(
          (u) => u.email === email.trim() && u.password === password.trim()
        );
        setLoading(false);
        if (user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Credenciais inválidas. Tente novamente.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <div className="card w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent mb-2">
            🏢 Central de Compras
          </h1>
          <p className="muted text-sm">Acesse seu painel administrativo</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">📧 Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@teste.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">🔒 Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-blue-900 transition-colors text-lg"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg text-red-600 text-sm">
              <strong>⚠️ Erro:</strong> {error}
            </div>
          )}

          <button
            type="submit"
            className="button primary w-full mb-2"
            disabled={loading}
          >
            {loading ? "🔄 Entrando..." : "✨ Entrar"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/campanhas")}
            className="button alt w-full"
            disabled={loading}
          >
            👁️ Ver como convidado
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-500">Credenciais de teste</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-900">
          <div className="mb-3">
            <p className="text-sm font-semibold text-blue-900 mb-1">👨‍💼 Admin</p>
            <p className="text-xs text-blue-700">admin@teste.com / 123456</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">
              🛍️ Lojista
            </p>
            <p className="text-xs text-blue-700">loja@teste.com / 123456</p>
          </div>
        </div>
      </div>
    </main>
  );
}
