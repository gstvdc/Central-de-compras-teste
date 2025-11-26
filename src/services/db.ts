// src/services/db.ts
// LocalStorage data service - can be replaced with API calls to a backend

export interface User {
  email: string;
  password: string;
  role: "admin" | "lojista";
  nome: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  desc: string;
}

export interface Fornecedor {
  id: string;
  name: string;
  city: string;
  state: string;
  description: string;
  phone: string;
  representative: string;
  products: Product[];
  files: any[];
}

export interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  start: string;
  end: string;
  rules: string;
  fornecedorIds: string[];
}

export interface Order {
  id: string;
  lojaName?: string;
  fornecedorName: string;
  total: number;
  status: string;
  createdAt: string;
  items?: any[];
}

export interface AppState {
  users: User[];
  fornecedores: Fornecedor[];
  campaigns: Campaign[];
  orders: Order[];
  cashback: number;
  conditions: any[];
}

const LS_KEY = "cc_demo_data_v1";

function makeId(prefix = "id"): string {
  return prefix + "_" + Math.random().toString(36).slice(2, 9);
}

const seedData: AppState = {
  users: [
    {
      email: "lojista@example.com",
      password: "lojista123",
      role: "lojista",
      nome: "Lojista Demo",
    },
    {
      email: "admin@central.com",
      password: "admin123",
      role: "admin",
      nome: "Administrador",
    },
  ],
  fornecedores: [
    {
      id: "for_1",
      name: "Alimentos Norte",
      city: "Joinville",
      state: "SC",
      description: "Fornecedor regional de alimentos",
      phone: "(47)9000-0000",
      representative: "João",
      products: [
        { id: "p1", name: "Arroz 5kg", price: 29.9, desc: "Arroz tipo 1" },
        {
          id: "p2",
          name: "Feijão 1kg",
          price: 8.5,
          desc: "Feijão carioquinha",
        },
      ],
      files: [],
    },
    {
      id: "for_2",
      name: "Hortifruti Sul",
      city: "Florianópolis",
      state: "SC",
      description: "Frutas e verduras",
      phone: "(48)9000-0000",
      representative: "Maria",
      products: [
        { id: "p3", name: "Banana (cacho)", price: 6.5, desc: "Por kg" },
        { id: "p4", name: "Tomate (kg)", price: 5.2, desc: "Por kg" },
      ],
      files: [],
    },
  ],
  campaigns: [
    {
      id: "c1",
      title: "Campanha Verão",
      subtitle: "Cashback acima de R$100",
      description: "Compre mais de R$100 e ganhe cashback.",
      start: "2025-10-01",
      end: "2025-12-31",
      rules: "Cashback 5% em compras válidas",
      fornecedorIds: ["for_1", "for_2"],
    },
  ],
  orders: [],
  cashback: 12.5,
  conditions: [],
};

let appState: AppState = loadState();

function loadState(): AppState {
  const raw = localStorage.getItem(LS_KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(LS_KEY, JSON.stringify(seedData));
  return JSON.parse(JSON.stringify(seedData));
}

function saveState(): void {
  localStorage.setItem(LS_KEY, JSON.stringify(appState));
}

// Helper finders
function findFornecedor(id: string): Fornecedor | undefined {
  return appState.fornecedores.find((f) => f.id === id);
}

function findCampaign(id: string): Campaign | undefined {
  return appState.campaigns.find((c) => c.id === id);
}

export const db = {
  // Users
  getUsers(): User[] {
    return appState.users;
  },

  // Fornecedores
  getFornecedores(): Fornecedor[] {
    return appState.fornecedores;
  },

  getFornecedor(id: string): Fornecedor | undefined {
    return findFornecedor(id);
  },

  addFornecedor(obj: Partial<Fornecedor>): Fornecedor {
    const id = makeId("for");
    const f: Fornecedor = { id, products: [], files: [], ...obj } as Fornecedor;
    appState.fornecedores.push(f);
    saveState();
    return f;
  },

  updateFornecedor(id: string, patch: Partial<Fornecedor>): Fornecedor | null {
    const f = findFornecedor(id);
    if (!f) return null;
    Object.assign(f, patch);
    saveState();
    return f;
  },

  removeFornecedor(id: string): void {
    appState.fornecedores = appState.fornecedores.filter((x) => x.id !== id);
    saveState();
  },

  // Products
  addProduct(fornecedorId: string, product: Partial<Product>): Product | null {
    const f = findFornecedor(fornecedorId);
    if (!f) return null;
    const p: Product = { id: makeId("p"), ...product } as Product;
    f.products.push(p);
    saveState();
    return p;
  },

  updateProduct(
    fornecedorId: string,
    prodId: string,
    patch: Partial<Product>
  ): Product | null {
    const f = findFornecedor(fornecedorId);
    if (!f) return null;
    const p = f.products.find((x) => x.id === prodId);
    if (!p) return null;
    Object.assign(p, patch);
    saveState();
    return p;
  },

  removeProduct(fornecedorId: string, prodId: string): void {
    const f = findFornecedor(fornecedorId);
    if (!f) return;
    f.products = f.products.filter((x) => x.id !== prodId);
    saveState();
  },

  // Campaigns
  getCampaigns(): Campaign[] {
    return appState.campaigns;
  },

  getCampaign(id: string): Campaign | undefined {
    return findCampaign(id);
  },

  addCampaign(obj: Partial<Campaign>): Campaign {
    const c: Campaign = { id: makeId("c"), ...obj } as Campaign;
    appState.campaigns.push(c);
    saveState();
    return c;
  },

  updateCampaign(id: string, patch: Partial<Campaign>): Campaign | null {
    const c = findCampaign(id);
    if (!c) return null;
    Object.assign(c, patch);
    saveState();
    return c;
  },

  removeCampaign(id: string): void {
    appState.campaigns = appState.campaigns.filter((x) => x.id !== id);
    saveState();
  },

  // Orders & Cashback
  getOrders(): Order[] {
    return appState.orders;
  },

  createOrder(obj: Partial<Order>): Order {
    const id = makeId("ord");
    const order: Order = {
      id,
      createdAt: new Date().toISOString(),
      status: "Enviado",
      ...obj,
    } as Order;
    appState.orders.push(order);
    appState.cashback = (appState.cashback || 0) + (order.total || 0) * 0.02;
    saveState();
    return order;
  },

  getCashback(): number {
    return appState.cashback || 0;
  },

  // Admin
  reset(): void {
    localStorage.removeItem(LS_KEY);
    appState = loadState();
  },
};
