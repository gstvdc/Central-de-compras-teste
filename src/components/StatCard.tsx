// src/components/StatCard.tsx
import React from "react";

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  color: string;
  subtitle?: string;
}

export function StatCard({
  icon,
  label,
  value,
  color,
  subtitle,
}: StatCardProps) {
  return (
    <div className="card small">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: `linear-gradient(90deg, ${color} 0%, rgba(21,101,192,0.5) 100%)`,
        }}
      />
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="m-0 mb-1 text-xs text-slate-400 uppercase">{label}</h3>
      <p className="big m-0 mb-1">{value}</p>
      {subtitle && <p className="small m-0 text-xs">{subtitle}</p>}
    </div>
  );
}
