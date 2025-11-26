// src/pages/AdminCampanhas.tsx
import React, { useState } from "react";
import { TopBar } from "../components/TopBar";
import { Modal } from "../components/Modal";
import { useData } from "../contexts/DataContext";

export function AdminCampanhas() {
  const { campaigns, fornecedores, addCampaign, removeCampaign } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    start: "",
    end: "",
    rules: "",
    fornecedorIds: [] as string[],
  });

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    addCampaign(formData);
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      start: "",
      end: "",
      rules: "",
      fornecedorIds: [],
    });
    setIsModalOpen(false);
  };

  const toggleFornecedor = (id: string) => {
    setFormData({
      ...formData,
      fornecedorIds: formData.fornecedorIds.includes(id)
        ? formData.fornecedorIds.filter((f) => f !== id)
        : [...formData.fornecedorIds, id],
    });
  };

  return (
    <>
      <TopBar
        title="Admin"
        links={[
          { label: "Painel", href: "/admin" },
          { label: "Fornecedores", href: "/admin-fornecedores" },
          { label: "Campanhas", href: "/admin-campanhas" },
        ]}
      />

      <main className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="mb-2">📢 Gerenciar Campanhas</h1>
            <p className="muted">Total: {campaigns.length} campanhas ativas</p>
          </div>
          <button
            className="button primary"
            onClick={() => setIsModalOpen(true)}
          >
            ➕ Nova Campanha
          </button>
        </div>

        {campaigns.length === 0 ? (
          <div className="card full text-center py-16 text-slate-400">
            <div className="text-8xl mb-4">📢</div>
            <h3 className="m-0 mb-2">Nenhuma campanha criada</h3>
            <p className="m-0 mb-5">
              Clique no botão acima para criar a primeira campanha
            </p>
            <button
              className="button primary"
              onClick={() => setIsModalOpen(true)}
            >
              ➕ Criar Campanha
            </button>
          </div>
        ) : (
          <div className="grid-3">
            {campaigns.map((campaign) => {
              const now = new Date();
              const start = new Date(campaign.start);
              const end = new Date(campaign.end);
              const statusColor =
                now < start
                  ? "bg-gradient-to-r from-amber-500 to-amber-600"
                  : now > end
                  ? "bg-gradient-to-r from-slate-500 to-slate-600"
                  : "bg-gradient-to-r from-green-500 to-green-600";
              const statusText =
                now < start ? "Pendente" : now > end ? "Encerrada" : "Ativa";

              return (
                <div key={campaign.id} className="card">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="m-0 flex-1">{campaign.title}</h3>
                    <span className={`badge ${statusColor}`}>{statusText}</span>
                  </div>

                  <p className="small muted m-1 mb-3">{campaign.subtitle}</p>

                  <p className="my-3 text-sm">{campaign.description}</p>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-3 py-2.5 rounded text-xs my-3 text-blue-800">
                    📅 {campaign.start} até {campaign.end}
                  </div>

                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 px-3 py-2.5 rounded text-xs mb-3">
                    <p className="m-0 mb-1 text-slate-600">📋 Regras</p>
                    <p className="m-0 text-slate-700">{campaign.rules}</p>
                  </div>

                  <button
                    className="button danger w-full text-xs py-1"
                    onClick={() => removeCampaign(campaign.id)}
                  >
                    🗑️ Remover Campanha
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nova Campanha"
      >
        <form onSubmit={handleAddCampaign} className="space-y-4">
          <div className="form-group">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Subtítulo</label>
            <input
              type="text"
              className="form-input"
              value={formData.subtitle}
              onChange={(e) =>
                setFormData({ ...formData, subtitle: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea
              className="form-input"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Data Início</label>
            <input
              type="date"
              className="form-input"
              value={formData.start}
              onChange={(e) =>
                setFormData({ ...formData, start: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Data Fim</label>
            <input
              type="date"
              className="form-input"
              value={formData.end}
              onChange={(e) =>
                setFormData({ ...formData, end: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Regras</label>
            <textarea
              className="form-input"
              value={formData.rules}
              onChange={(e) =>
                setFormData({ ...formData, rules: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Fornecedores Participantes</label>
            <div className="space-y-2">
              {fornecedores.map((f) => (
                <div key={f.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={f.id}
                    checked={formData.fornecedorIds.includes(f.id)}
                    onChange={() => toggleFornecedor(f.id)}
                    className="w-4 h-4 mr-2"
                  />
                  <label htmlFor={f.id} className="m-0 cursor-pointer">
                    {f.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="button alt"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="button primary">
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
