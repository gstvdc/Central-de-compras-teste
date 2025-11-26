// src/components/EmptyState.tsx
import React from "react";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  fullWidth?: boolean;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  fullWidth = true,
}: EmptyStateProps) {
  return (
    <div
      className={`${
        fullWidth ? "card full" : "card"
      } text-center py-12 text-slate-400`}
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="m-0 mb-2 text-slate-900">{title}</h3>
      <p className="m-0 mb-5">{description}</p>
      {action && (
        <button className="button primary mt-3" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
