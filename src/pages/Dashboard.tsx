// src/pages/Dashboard.tsx
import React from "react";
import { TopBar } from "../components/TopBar";
import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";

export function Dashboard() {
  const { fornecedores, campaigns, cashback } = useData();
  const { user } = useAuth();

  const StatCard = ({
    icon,
    label,
    value,
    color,
  }: {
    icon: string;
    label: string;
    value: string | number;
    color: string;
  }) => (
    <div className="card small">
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${color} 0%, rgba(21,101,192,0.5) 100%)`,
        }}
      />
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="m-0 mb-1 text-xs text-slate-400 uppercase">{label}</h3>
      <p className="big">{value}</p>
    </div>
  );

  return (
    <>
      <TopBar
        title="Dashboard Lojista"
        links={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Campanhas", href: "/campanhas" },
          { label: "Fornecedores", href: "/fornecedores" },
        ]}
      />

      <main className="container">
        <div className="mb-8">
          <h1 className="mb-2">👋 Bem-vindo, {user?.nome}!</h1>
          <p className="muted text-sm">
            Acompanhe suas campanhas, fornecedores e cashback em um único lugar
          </p>
        </div>

        <section className="grid-3 mb-8">
          <StatCard
            icon="🏪"
            label="Fornecedores"
            value={fornecedores.length}
            color="#1565c0"
          />
          <StatCard
            icon="📢"
            label="Campanhas Ativas"
            value={campaigns.length}
            color="#4caf50"
          />
          <StatCard
            icon="💰"
            label="Seu Cashback"
            value={`R$ ${cashback.toFixed(2)}`}
            color="#ff9800"
          />
        </section>

        <section className="card full mb-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="m-0">📢 Campanhas Disponíveis</h2>
            <span className="badge success">Ativas: {campaigns.length}</span>
          </div>
          <div className="grid-3">
            {campaigns.length === 0 ? (
              <div className="col-span-full text-center py-10 text-slate-400">
                <div className="text-6xl mb-4">📭</div>
                <p className="m-0">Nenhuma campanha disponível no momento</p>
              </div>
            ) : (
              campaigns.map((campaign) => (
                <div key={campaign.id} className="card">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="m-0">{campaign.title}</h3>
                    <span className="badge primary">Ativa</span>
                  </div>
                  <p className="small muted m-1 mb-3">{campaign.subtitle}</p>
                  <p className="my-3 text-sm">{campaign.description}</p>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-3 py-2 rounded text-xs text-blue-800">
                    📅 {campaign.start} até {campaign.end}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="card full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="m-0">🏪 Fornecedores Parceiros</h2>
            <span className="badge primary">Total: {fornecedores.length}</span>
          </div>
          <div className="grid-3">
            {fornecedores.map((fornecedor) => (
              <div key={fornecedor.id} className="card">
                <div className="mb-3">
                  <h3 className="m-0 mb-1">{fornecedor.name}</h3>
                  <p className="small muted m-0">
                    📍 {fornecedor.city}, {fornecedor.state}
                  </p>
                </div>
                <p className="my-3 text-sm">{fornecedor.description}</p>
                <div className="border-t border-slate-200 pt-3 mt-3 text-xs">
                  <p className="m-0 mb-1 text-slate-400">📞 Contato</p>
                  <p className="m-0 font-medium text-blue-900">
                    {fornecedor.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
