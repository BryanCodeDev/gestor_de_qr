// src/components/QRComponent.jsx - ACTUALIZADO para usar redirección inteligente
import React, { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { Download, ExternalLink, Clock, CheckCircle, Hash, Lock, AlertTriangle } from 'lucide-react';
import { useScheduleCheck } from '../hooks/useScheduleCheck';

const QRComponent = ({ formConfig }) => {
  const { isActive } = useScheduleCheck();
  const qrRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showAccessAlert, setShowAccessAlert] = useState(false);

  // 🎯 URL INTELIGENTE: Ahora TODOS los QR apuntan a la página de redirección
  const redirectUrl = `https://gestor-qr.netlify.app/qr/${formConfig.id}`;

  // Función para mostrar alerta de horario cuando no está activo
  const showScheduleAlert = () => {
    setShowAccessAlert(true);
    setTimeout(() => setShowAccessAlert(false), 4000);
  };

  // Función para manejar clic en QR
  const handleQRClick = () => {
    // Siempre abrir la página de redirección (que internamente manejará el horario)
    window.open(redirectUrl, '_blank');
  };

  // Función para descargar QR (solo si está activo)
  const downloadQR = async () => {
    // 🚫 Bloquear descarga si no está activo
    if (!isActive) {
      showScheduleAlert();
      return;
    }

    setIsDownloading(true);
    
    try {
      // Crear un canvas temporal para generar la imagen
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Configurar el tamaño del canvas (más grande para mejor calidad)
      const size = 500;
      const padding = 50;
      const qrSize = size - (padding * 2);
      
      canvas.width = size;
      canvas.height = size + 100; // Espacio extra para el texto
      
      // Fondo blanco con sutil gradiente
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(1, '#F8FAFC');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Obtener el SVG del QR
      const qrElement = qrRef.current;
      const svgData = new XMLSerializer().serializeToString(qrElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const img = new Image();
      img.onload = function() {
        // Sombra para el QR
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 5;
        
        // Dibujar el QR en el centro
        ctx.drawImage(img, padding, padding, qrSize, qrSize);
        
        // Resetear sombra
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
        // Agregar texto del nombre del formulario
        ctx.fillStyle = '#1E293B';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(formConfig.name, size / 2, size + 40);
        
        // Agregar número del formulario con estilo
        ctx.fillStyle = '#059669';
        ctx.font = 'bold 18px Arial';
        ctx.fillText(`#${formConfig.id}`, size / 2, size + 65);
        
        // Agregar marca de agua sutil
        ctx.fillStyle = '#94A3B8';
        ctx.font = '12px Arial';
        ctx.fillText('Sistema QR - MasterCode Company', size / 2, size + 85);
        
        // Crear enlace de descarga
        const link = document.createElement('a');
        link.download = `QR-${formConfig.name.replace(/\s+/g, '-')}-${formConfig.id}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        
        // Limpiar URL temporal
        URL.revokeObjectURL(svgUrl);
        
        // Mostrar feedback de éxito
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
      };
      
      img.src = svgUrl;
    } catch (error) {
      console.error('Error al descargar QR:', error);
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  return (
    <div className={`group relative bg-white rounded-3xl p-6 shadow-xl border-2 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 ${
      isActive 
        ? 'border-gradient-to-r from-green-200 to-emerald-200 hover:border-green-400 hover:shadow-green-200/50' 
        : 'border-gradient-to-r from-red-200 to-orange-200 hover:border-red-300 hover:shadow-red-200/50'
    } backdrop-blur-sm bg-gradient-to-br from-white via-slate-50 to-gray-50`}>
      
      {/* Decorative background gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Badge de número mejorado */}
      <div className={`absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-2xl z-20 transform transition-all duration-300 group-hover:scale-110 ${
        isActive 
          ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 shadow-green-500/30' 
          : 'bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 shadow-red-500/30'
      }`}>
        <Hash size={14} className="mr-0.5" />
        {formConfig.id}
      </div>

      {/* Botón de descarga mejorado - SOLO si está activo */}
      <div className="absolute -top-4 -left-4 z-20">
        <button
          onClick={downloadQR}
          disabled={isDownloading || !isActive} // 🚫 Deshabilitado si no está activo
          className={`group/btn relative w-10 h-10 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform ${
            isActive 
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-blue-500/30 hover:scale-110 hover:rotate-3 cursor-pointer' 
              : 'bg-gradient-to-r from-gray-400 to-gray-500 shadow-gray-500/30 cursor-not-allowed opacity-50'
          } ${isDownloading ? 'opacity-70 cursor-not-allowed' : ''}`}
          title={isActive ? 'Descargar QR como imagen HD' : 'Descarga no disponible fuera de horario'}
        >
          {!isActive ? (
            <Lock size={16} />
          ) : isDownloading ? (
            <div className="animate-spin">
              <Download size={16} className="animate-pulse" />
            </div>
          ) : (
            <Download size={16} className="group-hover/btn:animate-bounce" />
          )}
          
          {/* Efecto de pulso solo si está activo */}
          {isActive && (
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
          )}
        </button>
        
        {/* Tooltip de feedback */}
        {showTooltip && (
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-3 py-1 rounded-lg shadow-lg animate-fade-in-up z-30">
            ✅ ¡Descargado!
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-green-600"></div>
          </div>
        )}
      </div>

      {/* Alerta de acceso restringido */}
      {showAccessAlert && (
        <div className="absolute top-0 left-0 right-0 bg-red-600 text-white p-3 rounded-t-3xl z-30 animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 text-sm font-bold">
            <AlertTriangle size={16} className="animate-pulse" />
            <span>FUERA DE HORARIO</span>
          </div>
          <div className="text-xs text-center mt-1">
            Disponible de 8:00 AM a 3:00 PM
            <br />
            (Hora de Bogotá, Colombia)
          </div>
        </div>
      )}

      {/* Nombre del formulario mejorado */}
      <div className="text-center mb-6 relative z-10">
        <h3 className="text-base font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent leading-tight">
          {formConfig.name}
        </h3>
        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* QR Code con efectos premium */}
      <div className="flex justify-center mb-6 relative z-10">
        <div 
          className={`relative p-4 rounded-2xl transition-all duration-500 cursor-pointer transform group-hover:scale-105 ${
            isActive 
              ? 'bg-white shadow-2xl hover:shadow-3xl ring-4 ring-green-100 hover:ring-green-200 shadow-green-200/20' 
              : 'bg-white shadow-2xl ring-4 ring-red-100 shadow-red-200/20'
          }`}
          onClick={handleQRClick}
          title="Clic para acceder al formulario"
        >
          {/* Decorative corners */}
          <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 rounded-tl ${isActive ? 'border-blue-500' : 'border-red-500'}`}></div>
          <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 rounded-tr ${isActive ? 'border-blue-500' : 'border-red-500'}`}></div>
          <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 rounded-bl ${isActive ? 'border-blue-500' : 'border-red-500'}`}></div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 rounded-br ${isActive ? 'border-blue-500' : 'border-red-500'}`}></div>
          
          {/* 🎯 QR CODE INTELIGENTE - Siempre apunta a la página de redirección */}
          <QRCode 
            ref={qrRef}
            value={redirectUrl} // 🔥 CAMBIO CRÍTICO: Ahora usa redirectUrl
            size={140}
            style={{ 
              height: "140px", 
              maxWidth: "140px", 
              width: "140px",
              borderRadius: '12px'
            }}
          />
          
          {/* Icono de redirección */}
          <div className="absolute -bottom-2 -right-2 w-6 h-6 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
            <div className={`${isActive ? 'bg-blue-500' : 'bg-gray-500'} w-6 h-6 rounded-full flex items-center justify-center`}>
              <ExternalLink size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Estado con animación mejorado */}
      <div className="text-center relative z-10">
        <div className={`inline-flex items-center justify-center w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg ${
          isActive 
            ? 'bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 text-green-800 shadow-green-200/50 border border-green-200' 
            : 'bg-gradient-to-r from-red-100 via-orange-100 to-pink-100 text-red-800 shadow-red-200/50 border border-red-200'
        }`}>
          <div className={`mr-3 ${isActive ? 'animate-pulse' : ''}`}>
            {isActive ? <CheckCircle size={16} /> : <Clock size={16} />}
          </div>
          <span>{isActive ? 'DISPONIBLE AHORA' : 'FUERA DE HORARIO'}</span>
        </div>
      </div>

      {/* Información de descarga mejorada */}
      <div className="text-center mt-4 relative z-10">
        <p className={`text-xs flex items-center justify-center gap-2 ${
          isActive ? 'text-gray-500' : 'text-red-500'
        }`}>
          {isActive ? (
            <>
              <Download size={12} />
              <span>Descarga en alta resolución</span>
            </>
          ) : (
            <>
              <Lock size={12} />
              <span>Descarga restringida</span>
            </>
          )}
        </p>
      </div>

      {/* Badge de redirección inteligente */}
      <div className="text-center mt-2 relative z-10">
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
          <span>QR Inteligente</span>
        </div>
      </div>

      {/* Efectos de iluminación */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default QRComponent;