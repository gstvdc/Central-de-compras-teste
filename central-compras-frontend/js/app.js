// js/app.js (ATUALIZADO)
// basic auth and helpers
const appAuth = (function(){
  function login(email, password){
    const users = db.getUsers();
    const u = users.find(x=>x.email===email && x.password===password);
    if(u){
      sessionStorage.setItem('cc_user', JSON.stringify({email:u.email,nome:u.nome,role:u.role}));
      return true;
    }
    return false;
  }
  function logout(){ sessionStorage.removeItem('cc_user'); }
  function currentUser(){ return JSON.parse(sessionStorage.getItem('cc_user') || 'null'); }
  function requireLogin(){
    if(!currentUser()){ alert('Você precisa estar logado.'); location.href='index.html'; }
  }
  function maybeRequireLogin(){ /* allow public access if needed */ }

  function requireAdmin(){
    const u = currentUser();
    if(!u || u.role!=='admin'){
      alert('Acesso restrito: administrador.');
      location.href='index.html';
    }
  }

  return { login, logout, currentUser, requireLogin, maybeRequireLogin, requireAdmin };
})();
