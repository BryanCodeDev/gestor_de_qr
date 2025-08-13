// src/components/StatusBar.jsx
import React from 'react';
import { useScheduleCheck } from '../hooks/useScheduleCheck';

const StatusBar = () => {
  const { isActive, timeString } = useScheduleCheck();

  return (
    <div className={`mb-8 p-6 rounded-2xl shadow-lg border-l-8 transition-all duration-500 ${
      isActive 
        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 shadow-green-100' 
        : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-500 shadow-red-100'
    }`}>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        
        {/* Información principal del estado */}
        <div className="flex items-center space-x-4">
          {/* Indicador visual animado */}
          <div className="relative">
            <div className={`w-5 h-5 rounded-full ${
              isActive ? 'bg-green-500' : 'bg-red-500'
            } ${isActive ? 'animate-pulse' : ''}`}></div>
            {isActive && (
              <div className="absolute inset-0 w-5 h-5 rounded-full bg-green-400 animate-ping opacity-75"></div>
            )}
          </div>

          {/* Texto del estado */}
          <div>
            <h2 className={`text-xl font-bold ${
              isActive ? 'text-green-800' : 'text-red-800'
            }`}>
              {isActive ? '🟢 SISTEMA ACTIVO' : '🔴 SISTEMA INACTIVO'}
            </h2>
            <p className={`text-sm mt-1 ${
              isActive ? 'text-green-700' : 'text-red-700'
            }`}>
              {isActive 
                ? 'Todos los códigos QR están funcionando correctamente' 
                : 'Horario de atención: 8:00 AM a 3:00 PM (Hora de Bogotá)'
              }
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="flex items-center space-x-4">
          {/* Hora actual */}
          <div className="text-center">
            <div className="text-lg font-mono font-bold text-gray-800">{timeString}</div>
            <div className="text-xs text-gray-600">Hora actual</div>
          </div>

          {/* Icono decorativo */}
          <div className={`text-4xl ${
            isActive ? 'animate-bounce' : ''
          }`}>
            {isActive ? '✅' : '⏰'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;