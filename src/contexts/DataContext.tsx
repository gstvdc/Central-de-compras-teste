// src/contexts/DataContext.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { db, Fornecedor, Campaign, Order, Product } from "../services/db";

interface DataContextType {
  fornecedores: Fornecedor[];
  campaigns: Campaign[];
  orders: Order[];
  cashback: number;
  refreshData: () => void;
  addFornecedor: (obj: Partial<Fornecedor>) => Fornecedor;
  updateFornecedor: (
    id: string,
    patch: Partial<Fornecedor>
  ) => Fornecedor | null;
  removeFornecedor: (id: string) => void;
  addProduct: (
    fornecedorId: string,
    product: Partial<Product>
  ) => Product | null;
  updateProduct: (
    fornecedorId: string,
    prodId: string,
    patch: Partial<Product>
  ) => Product | null;
  removeProduct: (fornecedorId: string, prodId: string) => void;
  addCampaign: (obj: Partial<Campaign>) => Campaign;
  updateCampaign: (id: string, patch: Partial<Campaign>) => Campaign | null;
  removeCampaign: (id: string) => void;
  createOrder: (obj: Partial<Order>) => Order;
  getFornecedor: (id: string) => Fornecedor | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>(() =>
    db.getFornecedores()
  );
  const [campaigns, setCampaigns] = useState<Campaign[]>(() =>
    db.getCampaigns()
  );
  const [orders, setOrders] = useState<Order[]>(() => db.getOrders());
  const [cashback, setCashback] = useState<number>(() => db.getCashback());

  const refreshData = useCallback(() => {
    setFornecedores(db.getFornecedores());
    setCampaigns(db.getCampaigns());
    setOrders(db.getOrders());
    setCashback(db.getCashback());
  }, []);

  const addFornecedor = (obj: Partial<Fornecedor>) => {
    const result = db.addFornecedor(obj);
    refreshData();
    return result;
  };

  const updateFornecedor = (id: string, patch: Partial<Fornecedor>) => {
    const result = db.updateFornecedor(id, patch);
    if (result) refreshData();
    return result;
  };

  const removeFornecedor = (id: string) => {
    db.removeFornecedor(id);
    refreshData();
  };

  const addProduct = (fornecedorId: string, product: Partial<Product>) => {
    const result = db.addProduct(fornecedorId, product);
    if (result) refreshData();
    return result;
  };

  const updateProduct = (
    fornecedorId: string,
    prodId: string,
    patch: Partial<Product>
  ) => {
    const result = db.updateProduct(fornecedorId, prodId, patch);
    if (result) refreshData();
    return result;
  };

  const removeProduct = (fornecedorId: string, prodId: string) => {
    db.removeProduct(fornecedorId, prodId);
    refreshData();
  };

  const addCampaign = (obj: Partial<Campaign>) => {
    const result = db.addCampaign(obj);
    refreshData();
    return result;
  };

  const updateCampaign = (id: string, patch: Partial<Campaign>) => {
    const result = db.updateCampaign(id, patch);
    if (result) refreshData();
    return result;
  };

  const removeCampaign = (id: string) => {
    db.removeCampaign(id);
    refreshData();
  };

  const createOrder = (obj: Partial<Order>) => {
    const result = db.createOrder(obj);
    refreshData();
    return result;
  };

  const getFornecedor = (id: string) => {
    return db.getFornecedor(id);
  };

  return (
    <DataContext.Provider
      value={{
        fornecedores,
        campaigns,
        orders,
        cashback,
        refreshData,
        addFornecedor,
        updateFornecedor,
        removeFornecedor,
        addProduct,
        updateProduct,
        removeProduct,
        addCampaign,
        updateCampaign,
        removeCampaign,
        createOrder,
        getFornecedor,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
