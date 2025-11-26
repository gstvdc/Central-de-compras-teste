// src/services/dbAPI.ts (Exemplo)
// ================================
// Este arquivo é um EXEMPLO de como converter db.ts para usar uma API
// Descomente e adapte conforme sua API real

/*
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('cc_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}

async function handleResponse(response: Response) {
  if (response.status === 401) {
    localStorage.removeItem('cc_token');
    window.location.href = '/';
    throw new Error('Sessão expirada');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export const dbAPI = {
  // ===== FORNECEDORES =====

  async getFornecedores(): Promise<Fornecedor[]> {
    const response = await fetch(`${API_URL}/fornecedores`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  async getFornecedor(id: string): Promise<Fornecedor> {
    const response = await fetch(`${API_URL}/fornecedores/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  async addFornecedor(obj: Partial<Fornecedor>): Promise<Fornecedor> {
    const response = await fetch(`${API_URL}/fornecedores`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(obj),
    });
    return handleResponse(response);
  },

  async updateFornecedor(id: string, patch: Partial<Fornecedor>): Promise<Fornecedor> {
    const response = await fetch(`${API_URL}/fornecedores/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(patch),
    });
    return handleResponse(response);
  },

  async removeFornecedor(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/fornecedores/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // ===== CAMPANHAS =====

  async getCampaigns(): Promise<Campaign[]> {
    const response = await fetch(`${API_URL}/campaigns`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  async getCampaign(id: string): Promise<Campaign> {
    const response = await fetch(`${API_URL}/campaigns/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  async addCampaign(obj: Partial<Campaign>): Promise<Campaign> {
    const response = await fetch(`${API_URL}/campaigns`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(obj),
    });
    return handleResponse(response);
  },

  async updateCampaign(id: string, patch: Partial<Campaign>): Promise<Campaign> {
    const response = await fetch(`${API_URL}/campaigns/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(patch),
    });
    return handleResponse(response);
  },

  async removeCampaign(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/campaigns/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // ===== PEDIDOS =====

  async getOrders(): Promise<Order[]> {
    const response = await fetch(`${API_URL}/orders`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  async createOrder(obj: Partial<Order>): Promise<Order> {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(obj),
    });
    return handleResponse(response);
  },

  // ===== PRODUTOS =====

  async addProduct(fornecedorId: string, product: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_URL}/fornecedores/${fornecedorId}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(product),
    });
    return handleResponse(response);
  },

  async updateProduct(fornecedorId: string, prodId: string, patch: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_URL}/fornecedores/${fornecedorId}/products/${prodId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(patch),
    });
    return handleResponse(response);
  },

  async removeProduct(fornecedorId: string, prodId: string): Promise<void> {
    const response = await fetch(`${API_URL}/fornecedores/${fornecedorId}/products/${prodId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};
*/

// Para usar, substitua no DataContext.tsx:
// import { dbAPI as db } from './dbAPI';
// e converta todos os métodos para async
