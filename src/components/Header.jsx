// src/components/Header.jsx
import React from 'react';
import { QrCode, LayoutDashboard } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo y título */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <QrCode className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Sistema QR
              </h1>
              <p className="text-sm text-gray-500">Gestión de Formularios</p>
            </div>
          </div>

          {/* Navegación simple */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">
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