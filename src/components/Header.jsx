// src/components/Header.jsx
import React from 'react';
import { QrCode, LayoutDashboard } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b border-slate-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo y título */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <QrCode className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sistema QR
              </h1>
              <p className="text-sm text-slate-500">Gestión de Formularios</p>
            </div>
          </div>

          {/* Navegación simple */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <LayoutDashboard size={18} />
              <span className="text-sm font-medium">Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;