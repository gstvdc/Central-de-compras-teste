// src/pages/AdminDashboard.tsx
import React from "react";
import { TopBar } from "../components/TopBar";
import { StatCard } from "../components/StatCard";
import { EmptyState } from "../components/EmptyState";
import { useData } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";

export function AdminDashboard() {
  const { fornecedores, campaigns, orders } = useData();
  const navigate = useNavigate();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <>
      <TopBar
        title="Admin"
        links={[
          { label: "Painel", href: "/admin" },
          { label: "Fornecedores", href: "/admin-fornecedores" },
          { label: "Campanhas", href: "/admin-campanhas" },
          { label: "Ver como lojista", href: "/dashboard" },
        ]}
      />

      <main className="container">
        <div className="mb-8">
          <h1 className="mb-2">👋 Bem-vindo ao Painel Administrativo</h1>
          <p className="muted text-sm">
            Acompanhe as métricas principais e gerencie toda a plataforma
          </p>
        </div>

        <section className="grid-3 mb-6" id="adminOverview">
          <StatCard
            icon="🏪"
            label="Fornecedores"
            value={fornecedores.length}
            color="#1e40af"
            subtitle={
              fornecedores.length === 1
                ? "1 parceiro"
                : `${fornecedores.length} parceiros`
            }
          />
          <StatCard
            icon="📢"
            label="Campanhas"
            value={campaigns.length}
            color="#16a34a"
            subtitle={
              campaigns.length === 1 ? "1 ativa" : `${campaigns.length} ativas`
            }
          />
          <StatCard
            icon="📦"
            label="Pedidos"
            value={orders.length}
            color="#ea580c"
            subtitle={`R$ ${totalRevenue.toFixed(2)}`}
          />
        </section>

        <section className="card full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="m-0">📋 Pedidos Recebidos</h2>
            <span className="badge primary">Total: {orders.length}</span>
          </div>

          {orders.length === 0 ? (
            <EmptyState
              icon="📭"
              title="Nenhum pedido recebido"
              description="Os pedidos aparecerão aqui quando lojistas fizerem compras"
              fullWidth={false}
            />
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>Lojista</th>
                    <th>Fornecedor</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 500 }}>
                        {order.id.slice(0, 8)}
                      </td>
                      <td>{order.lojaName || "—"}</td>
                      <td>{order.fornecedorName}</td>
                      <td style={{ fontWeight: 600, color: "#1565c0" }}>
                        R$ {order.total.toFixed(2)}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            order.status === "Confirmado" ? "success" : "info"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="small muted">{order.date || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="card">
            <h3 className="mb-4 flex items-center gap-2">⚙️ Ações Rápidas</h3>
            <div className="flex flex-col gap-2">
              <button
                className="button primary text-sm py-2"
                onClick={() => navigate("/admin-fornecedores")}
              >
                🏪 Gerenciar Fornecedores
              </button>
              <button
                className="button primary text-sm py-2"
                onClick={() => navigate("/admin-campanhas")}
                style={{
                  justifyContent: "center",
                  fontSize: "14px",
                  padding: "10px",
                }}
              >
                📢 Gerenciar Campanhas
              </button>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-900">
            <h3 className="text-blue-900 mb-4 m-0">💡 Dica do Painel</h3>
            <p className="m-0 text-sm text-blue-900">
              📊 Monitore as métricas acima para acompanhar o desempenho da
              plataforma. Use as ações rápidas para gerenciar fornecedores e
              campanhas.
            </p>
          </div>

          <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-900">
            <h3 className="text-purple-900 mb-4 m-0">📈 Resumo</h3>
            <div className="text-sm text-purple-900 space-y-1">
              <p className="m-0">
                👥 <strong>{fornecedores.length}</strong> fornecedor(es)
              </p>
              <p className="m-0">
                🎯 <strong>{campaigns.length}</strong> campanha(s)
              </p>
              <p className="m-0">
                📦 <strong>{orders.length}</strong> pedido(s)
              </p>
              <p className="m-0 text-xs font-semibold mt-2 pt-2 border-t border-purple-200">
                💰 Total: R$ {totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
