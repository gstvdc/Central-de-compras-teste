// src/pages/Fornecedores.tsx
import React from "react";
import { useData } from "../contexts/DataContext";

export function Fornecedores() {
  const { fornecedores } = useData();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  return (
    <>
      <header className="topbar">
        <div className="brand">Central de Compras — Fornecedores</div>
      </header>

      <main className="container">
        <div className="mb-8">
          <h1 className="mb-2">🏪 Nossos Fornecedores</h1>
          <p className="muted">
            Conheça os fornecedores parceiros com os melhores produtos e
            serviços
          </p>
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

              <button
                className="button primary w-full mt-3 text-xs py-1"
                onClick={() =>
                  setExpandedId(
                    expandedId === fornecedor.id ? null : fornecedor.id
                  )
                }
              >
                {expandedId === fornecedor.id ? "▼ Ocultar" : "▶ Ver"} Produtos
                ({fornecedor.products.length})
              </button>

              {expandedId === fornecedor.id && (
                <div className="mt-4 pt-4 border-t border-slate-200 animate-fadeIn">
                  {fornecedor.products.map((product) => (
                    <div
                      key={product.id}
                      className="p-2.5 mb-2 bg-slate-50 rounded border-l-4 border-blue-900"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="m-0 mb-1 font-medium text-sm">
                            {product.name}
                          </p>
                          <p className="m-0 text-xs text-slate-400">
                            {product.desc}
                          </p>
                        </div>
                        <p className="m-0 text-sm font-semibold text-green-600 ml-2 whitespace-nowrap">
                          R$ {product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
