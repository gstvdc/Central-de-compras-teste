// src/components/TopBar.tsx
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  title: string;
  links?: Array<{ label: string; href: string }>;
}

export function TopBar({ title, links = [] }: TopBarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="topbar">
      <div className="brand">Central de Compras — {title}</div>
      <nav>
        {links.map((link) => (
          <a key={link.href} onClick={() => navigate(link.href)}>
            {link.label}
          </a>
        ))}
        {user && (
          <span className="muted small" style={{ marginLeft: "14px" }}>
            Olá, {user.nome}
          </span>
        )}
        {user && (
          <a onClick={handleLogout} style={{ marginLeft: "14px" }}>
            Sair
          </a>
        )}
      </nav>
    </header>
  );
}
