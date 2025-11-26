// src/services/auth.ts
// Authentication service using localStorage

export interface AuthUser {
  email: string;
  nome: string;
  role: "admin" | "lojista";
}

const AUTH_KEY = "cc_user";

export const auth = {
  login(email: string, password: string, users: any[]): boolean {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({
          email: user.email,
          nome: user.nome,
          role: user.role,
        })
      );
      return true;
    }
    return false;
  },

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  },

  getCurrentUser(): AuthUser | null {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  },

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === "admin";
  },

  isLojista(): boolean {
    const user = this.getCurrentUser();
    return user?.role === "lojista";
  },
};
