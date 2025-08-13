// src/components/QRComponent.jsx
import React from 'react';
import QRCode from 'react-qr-code';
import { useScheduleCheck } from '../hooks/useScheduleCheck';

const QRComponent = ({ formConfig }) => {
  const { isActive } = useScheduleCheck();

  const handleQRClick = () => {
    if (isActive) {
      window.open(formConfig.url, '_blank');
    } else {
      alert('⏰ Fuera de horario\nLos formularios están disponibles de 8:00 AM a 3:00 PM\n(Hora de Bogotá, Colombia)');
    }
  };

  return (
    <div className={`group relative bg-white rounded-2xl p-5 shadow-md border-2 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 ${
      isActive 
        ? 'border-green-200 hover:border-green-400 hover:shadow-green-100' 
        : 'border-red-200 hover:border-red-300 hover:shadow-red-100'
    }`}>
      
      {/* Badge de número */}
      <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg z-10 ${
        isActive ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-orange-500'
      }`}>
        {formConfig.id}
      </div>

      {/* Nombre del formulario */}
      <div className="text-center mb-4">
        <h3 className="text-sm font-bold text-gray-800 leading-tight">
          {formConfig.name}
        </h3>
      </div>

      {/* QR Code con efecto hover */}
      <div className="flex justify-center mb-4">
        <div 
          className={`p-3 rounded-xl transition-all duration-300 cursor-pointer transform group-hover:scale-105 ${
            isActive 
              ? 'bg-white shadow-lg hover:shadow-xl ring-2 ring-green-100 hover:ring-green-300' 
              : 'bg-gray-50 opacity-70 ring-2 ring-red-100'
          }`}
          onClick={handleQRClick}
          title={isActive ? 'Clic para abrir formulario' : 'Fuera de horario'}
        >
          <QRCode 
            value={formConfig.url} 
            size={120}
            style={{ 
              height: "120px", 
              maxWidth: "120px", 
              width: "120px",
              filter: isActive ? 'none' : 'grayscale(100%)',
              borderRadius: '8px'
            }}
          />
        </div>
      </div>

      {/* Estado con animación */}
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-full py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 shadow-sm' 
            : 'bg-gradient-to-r from-red-100 to-orange-100 text-red-800 shadow-sm'
        }`}>
          <span className="mr-2">{isActive ? '✅' : '⏰'}</span>
          <span>{isActive ? 'DISPONIBLE' : 'INACTIVO'}</span>
        </div>
      </div>

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default QRComponent;