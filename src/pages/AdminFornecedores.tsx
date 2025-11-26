// src/pages/AdminFornecedores.tsx
import React, { useState } from "react";
import { TopBar } from "../components/TopBar";
import { Modal } from "../components/Modal";
import { useData } from "../contexts/DataContext";

export function AdminFornecedores() {
  const { fornecedores, addFornecedor, removeFornecedor } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    description: "",
    phone: "",
    representative: "",
  });

  const handleAddFornecedor = (e: React.FormEvent) => {
    e.preventDefault();
    addFornecedor(formData);
    setFormData({
      name: "",
      city: "",
      state: "",
      description: "",
      phone: "",
      representative: "",
    });
    setIsModalOpen(false);
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
            <h1 className="mb-2">🏪 Gerenciar Fornecedores</h1>
            <p className="muted">
              Total: {fornecedores.length} fornecedores cadastrados
            </p>
          </div>
          <button
            className="button primary"
            onClick={() => setIsModalOpen(true)}
          >
            ➕ Novo Fornecedor
          </button>
        </div>

        {fornecedores.length === 0 ? (
          <div className="card full text-center py-16 text-slate-400">
            <div className="text-8xl mb-4">🏪</div>
            <h3 className="m-0 mb-2">Nenhum fornecedor cadastrado</h3>
            <p className="m-0 mb-5">
              Clique no botão acima para adicionar o primeiro fornecedor
            </p>
            <button
              className="button primary"
              onClick={() => setIsModalOpen(true)}
            >
              ➕ Adicionar Fornecedor
            </button>
          </div>
        ) : (
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

                <div className="bg-gradient-to-br from-slate-100 to-slate-200 px-3 py-2.5 rounded text-xs my-3">
                  <p className="m-0 mb-1 text-slate-600">👤 Representante</p>
                  <p className="m-0 font-medium text-blue-900">
                    {fornecedor.representative}
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-3 mt-3">
                  <p className="m-0 mb-1 text-xs text-slate-400">📞 Telefone</p>
                  <p className="m-0 font-medium text-blue-900">
                    {fornecedor.phone}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button className="button alt text-xs py-1">✏️ Editar</button>
                  <button
                    className="button danger text-xs py-1"
                    onClick={() => removeFornecedor(fornecedor.id)}
                  >
                    🗑️ Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Fornecedor"
      >
        <form onSubmit={handleAddFornecedor} className="space-y-4">
          <div className="form-group">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Cidade</label>
            <input
              type="text"
              className="form-input"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Estado</label>
            <input
              type="text"
              className="form-input"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
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
            <label className="form-label">Telefone</label>
            <input
              type="tel"
              className="form-input"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Representante</label>
            <input
              type="text"
              className="form-input"
              value={formData.representative}
              onChange={(e) =>
                setFormData({ ...formData, representative: e.target.value })
              }
              required
            />
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
