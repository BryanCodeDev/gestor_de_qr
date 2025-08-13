// src/components/Header.jsx
import React from 'react';
import { useScheduleCheck } from '../hooks/useScheduleCheck';

const Header = () => {
  const { timeString, dateString, isActive } = useScheduleCheck();

  return (
    <header className="bg-white shadow-lg border-b-4 border-blue-500">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          
          {/* Logo y título */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">📱</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Sistema QR
              </h1>
              <p className="text-sm text-gray-600 font-medium">Gestión Inteligente de Formularios</p>
            </div>
          </div>

          {/* Información de fecha, hora y estado */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm">
            
            {/* Fecha */}
            <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg border shadow-sm">
              <span className="text-lg">📅</span>
              <span className="font-medium text-gray-700 capitalize">{dateString}</span>
            </div>
            
            {/* Hora en tiempo real */}
            <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg border shadow-sm">
              <span className="text-lg">🕐</span>
              <div className="flex flex-col">
                <span className="font-mono text-lg font-bold text-gray-800">{timeString}</span>
                <span className="text-xs text-gray-500">Bogotá, Colombia</span>
              </div>
            </div>

            {/* Estado del sistema */}
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border shadow-sm transition-colors duration-300 ${
              isActive 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}></div>
              <span className="font-semibold text-xs">
                {isActive ? 'EN LÍNEA' : 'FUERA DE HORARIO'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;