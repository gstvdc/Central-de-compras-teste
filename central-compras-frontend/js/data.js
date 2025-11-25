// js/data.js (ATUALIZADO)
// simulated data + simple db wrapper using localStorage
const db = (function(){
  const LS_KEY = 'cc_demo_data_v1';

  function makeId(prefix='id') { return prefix + '_' + Math.random().toString(36).slice(2,9); }

  const seed = {
    users: [
      {email:'lojista@example.com', password:'lojista123', role:'lojista', nome:'Lojista Demo'},
      {email:'admin@central.com', password:'admin123', role:'admin', nome:'Administrador'}
    ],
    fornecedores: [
      { id:'for_1', name:'Alimentos Norte', city:'Joinville', state:'SC', description:'Fornecedor regional de alimentos', phone:'(47)9000-0000', representative:'João', products:[
        {id:'p1', name:'Arroz 5kg', price:29.9, desc:'Arroz tipo 1'},
        {id:'p2', name:'Feijão 1kg', price:8.5, desc:'Feijão carioquinha'}
      ], files:[] },
      { id:'for_2', name:'Hortifruti Sul', city:'Florianópolis', state:'SC', description:'Frutas e verduras', phone:'(48)9000-0000', representative:'Maria', products:[
        {id:'p3', name:'Banana (cacho)', price:6.5, desc:'Por kg'},
        {id:'p4', name:'Tomate (kg)', price:5.2, desc:'Por kg'}
      ], files:[] }
    ],
    campaigns: [
      { id:'c1', title:'Campanha Verão', subtitle:'Cashback acima de R$100', description:'Compre mais de R$100 e ganhe cashback.', start:'2025-10-01', end:'2025-12-31', rules:'Cashback 5% em compras válidas', fornecedorIds:['for_1','for_2'] }
    ],
    orders: [],
    cashback: 12.50,
    conditions: [] // condições comerciais por estado (opcional)
  };

  function load(){
    const raw = localStorage.getItem(LS_KEY);
    if(raw) return JSON.parse(raw);
    localStorage.setItem(LS_KEY, JSON.stringify(seed));
    return JSON.parse(JSON.stringify(seed));
  }
  function save(data){ localStorage.setItem(LS_KEY, JSON.stringify(data)); }

  let state = load();

  // helper finders
  function findFornecedor(id){ return state.fornecedores.find(f=>f.id===id); }
  function findCampaign(id){ return state.campaigns.find(c=>c.id===id); }

  return {
    // users
    getUsers(){ return state.users; },

    // fornecedores
    getFornecedores(){ return state.fornecedores; },
    getFornecedor(id){ return findFornecedor(id); },
    addFornecedor(obj){
      const id = makeId('for');
      const f = Object.assign({ id, products: [], files: [] }, obj);
      state.fornecedores.push(f);
      save(state);
      return f;
    },
    updateFornecedor(id, patch){
      const f = findFornecedor(id);
      if(!f) return null;
      Object.assign(f, patch);
      save(state);
      return f;
    },
    removeFornecedor(id){
      state.fornecedores = state.fornecedores.filter(x=>x.id!==id);
      save(state);
    },

    // products (inside fornecedor)
    addProduct(fornecedorId, product){
      const f = findFornecedor(fornecedorId);
      if(!f) return null;
      const p = Object.assign({ id: makeId('p') }, product);
      f.products.push(p);
      save(state);
      return p;
    },
    updateProduct(fornecedorId, prodId, patch){
      const f = findFornecedor(fornecedorId);
      if(!f) return null;
      const p = f.products.find(x=>x.id===prodId);
      if(!p) return null;
      Object.assign(p, patch);
      save(state);
      return p;
    },
    removeProduct(fornecedorId, prodId){
      const f = findFornecedor(fornecedorId);
      if(!f) return;
      f.products = f.products.filter(x=>x.id!==prodId);
      save(state);
    },

    // campanhas
    getCampaigns(){ return state.campaigns; },
    getCampaign(id){ return findCampaign(id); },
    addCampaign(obj){
      const c = Object.assign({ id: makeId('c') }, obj);
      state.campaigns.push(c);
      save(state);
      return c;
    },
    updateCampaign(id, patch){
      const c = findCampaign(id);
      if(!c) return null;
      Object.assign(c, patch);
      save(state);
      return c;
    },
    removeCampaign(id){
      state.campaigns = state.campaigns.filter(x=>x.id!==id);
      save(state);
    },

    // conditions (por estado)
    getConditions(){ return state.conditions; },
    addCondition(cond){ cond.id = makeId('cond'); state.conditions.push(cond); save(state); return cond; },

    // orders & cashback
    getOrders(){ return state.orders; },
    createOrder(obj){
      const id = makeId('ord');
      const order = Object.assign({ id, createdAt: new Date().toISOString(), status: 'Enviado' }, obj);
      state.orders.push(order);
      // opcional: calcular cashback (simples)
      state.cashback = (state.cashback || 0) + (order.total * 0.02); // 2% simulated
      save(state);
      return order;
    },
    getCashback(){ return state.cashback || 0; },

    // admin helpers
    reset(){ localStorage.removeItem(LS_KEY); state = load(); }
  };
})();
