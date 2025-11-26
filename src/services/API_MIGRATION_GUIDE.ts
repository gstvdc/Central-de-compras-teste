// API Integration Guide
// ====================
// Para migrar do localStorage para um backend, siga estas instruções:

/*
1. AUTENTICAÇÃO
===============

Antes (localStorage):
  auth.login(email, password, users)

Depois (API):
  const response = await fetch('http://seu-api.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  // data.token será o JWT/Bearer token
  localStorage.setItem('cc_token', data.token);


2. FORNECEDORES
===============

Listar todos:
  GET /api/fornecedores

Buscar um:
  GET /api/fornecedores/:id

Criar:
  POST /api/fornecedores
  Body: { name, city, state, description, phone, representative }

Atualizar:
  PUT /api/fornecedores/:id
  Body: { ...patches }

Deletar:
  DELETE /api/fornecedores/:id


3. CAMPANHAS
============

Listar todas:
  GET /api/campaigns

Buscar uma:
  GET /api/campaigns/:id

Criar:
  POST /api/campaigns
  Body: { title, subtitle, description, start, end, rules, fornecedorIds }

Atualizar:
  PUT /api/campaigns/:id

Deletar:
  DELETE /api/campaigns/:id


4. PEDIDOS
==========

Listar todos:
  GET /api/orders

Criar:
  POST /api/orders
  Body: { lojaName, fornecedorName, total, items }


5. HEADERS IMPORTANTES
=====================

Todas as requisições (exceto login) devem incluir:
  Authorization: Bearer {token}
  Content-Type: application/json


6. MODIFICAR src/services/db.ts
==============================

Exemplo de migração para produtos:

// ANTES (localStorage):
getFornecedores(): Fornecedor[] {
  return appState.fornecedores;
}

// DEPOIS (API):
async getFornecedores(): Promise<Fornecedor[]> {
  const token = localStorage.getItem('cc_token');
  const response = await fetch('http://seu-api.com/api/fornecedores', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}

// Será necessário converter todas as funções para async/await
// e atualizar os Contexts para lidar com Promises


7. EXEMPLO COMPLETO - ADICIONAR FORNECEDOR
===========================================

// src/services/db.ts
async addFornecedor(obj: Partial<Fornecedor>): Promise<Fornecedor> {
  const token = localStorage.getItem('cc_token');
  const response = await fetch('http://seu-api.com/api/fornecedores', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });

  if (!response.ok) throw new Error('Erro ao criar fornecedor');
  return await response.json();
}

// Em src/contexts/DataContext.tsx, converter para:
const addFornecedor = async (obj: Partial<Fornecedor>) => {
  try {
    const result = await db.addFornecedor(obj);
    refreshData();
    return result;
  } catch (error) {
    console.error('Erro:', error);
    // Mostrar mensagem de erro ao usuário
  }
};


8. TRATAMENTO DE ERROS
======================

Sempre trate erros de rede e validação:

try {
  const response = await fetch(url, options);

  if (response.status === 401) {
    // Token expirado ou inválido
    localStorage.removeItem('cc_token');
    window.location.href = '/';
  }

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  return await response.json();
} catch (error) {
  console.error('API Error:', error);
  // Mostrar mensagem ao usuário
}
*/
