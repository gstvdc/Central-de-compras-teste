// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Pages
import { Login } from "./pages/Login";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminFornecedores } from "./pages/AdminFornecedores";
import { AdminCampanhas } from "./pages/AdminCampanhas";
import { Dashboard } from "./pages/Dashboard";
import { Campanhas } from "./pages/Campanhas";
import { Fornecedores } from "./pages/Fornecedores";

// Styles
import "./styles/global.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/campanhas" element={<Campanhas />} />
            <Route path="/fornecedores" element={<Fornecedores />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-fornecedores"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminFornecedores />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-campanhas"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminCampanhas />
                </ProtectedRoute>
              }
            />

            {/* Lojista Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole="lojista">
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
