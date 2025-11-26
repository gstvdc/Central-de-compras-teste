// src/pages/Campanhas.tsx
import React from "react";
import { useData } from "../contexts/DataContext";

export function Campanhas() {
  const { campaigns } = useData();

  const getStatusColor = (campaign: any): string => {
    const now = new Date();
    const start = new Date(campaign.start);
    const end = new Date(campaign.end);
    if (now < start) return "bg-gradient-to-r from-amber-500 to-amber-600";
    if (now > end) return "bg-gradient-to-r from-slate-500 to-slate-600";
    return "bg-gradient-to-r from-green-500 to-green-600";
  };

  const getStatusText = (campaign: any): string => {
    const now = new Date();
    const start = new Date(campaign.start);
    const end = new Date(campaign.end);
    if (now < start) return "Pendente";
    if (now > end) return "Encerrada";
    return "Ativa";
  };

  return (
    <>
      <header className="topbar">
        <div className="brand">Central de Compras — Campanhas Públicas</div>
      </header>

      <main className="container">
        <div className="mb-8">
          <h1 className="mb-2">📢 Campanhas Disponíveis</h1>
          <p className="muted">
            Confira nossas campanhas atuais e participe das promoções exclusivas
          </p>
        </div>

        <div className="grid-3">
          {campaigns.length === 0 ? (
            <div className="col-span-full text-center py-16 text-slate-400">
              <div className="text-8xl mb-4">📭</div>
              <h3 className="m-0 mb-2">Nenhuma Campanha Disponível</h3>
              <p className="m-0">
                Volte em breve para conferir as próximas promoções
              </p>
            </div>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="card">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="m-0 flex-1">{campaign.title}</h3>
                  <span className={`badge ${getStatusColor(campaign)} ml-2`}>
                    {getStatusText(campaign)}
                  </span>
                </div>
                <p className="small muted m-1 mb-3">{campaign.subtitle}</p>
                <p className="my-3 text-sm">{campaign.description}</p>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <p className="m-0 mb-1.5 text-xs text-slate-400">
                    📅 Vigência
                  </p>
                  <p className="m-0 text-xs font-medium text-blue-900">
                    {campaign.start} até {campaign.end}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-100 to-slate-200 px-3 py-2.5 rounded text-xs mt-3">
                  <p className="m-0 mb-1 text-slate-600">📋 Regras</p>
                  <p className="m-0 text-slate-700">{campaign.rules}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
