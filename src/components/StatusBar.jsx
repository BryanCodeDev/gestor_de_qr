// src/components/StatusBar.jsx
import React from 'react';
import { useScheduleCheck } from '../hooks/useScheduleCheck';
import { Clock, CheckCircle, XCircle, Download, Lock } from 'lucide-react';

const StatusBar = () => {
  const { 
    isActive, 
    timeString, 
    nextSchedule, 
    timeRemaining, 
    scheduleInfo 
  } = useScheduleCheck();

  return (
    <div className={`mb-8 p-6 rounded-2xl shadow-lg border-l-8 transition-all duration-500 relative overflow-hidden ${
      isActive 
        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 shadow-green-100' 
        : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-500 shadow-red-100'
    }`}>
      
      {/* Fondo decorativo animado */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-10 ${
        isActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'
      }`}></div>
      
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 relative z-10">
        
        {/* Información principal del estado */}
        <div className="flex items-center space-x-6">
          {/* Indicador visual animado mejorado */}
          <div className="relative">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isActive ? 'bg-green-500' : 'bg-red-500'
            } ${isActive ? 'animate-pulse' : ''}`}>
              {isActive ? (
                <CheckCircle className="text-white" size={14} />
              ) : (
                <XCircle className="text-white" size={14} />
              )}
            </div>
            {isActive && (
              <div className="absolute inset-0 w-6 h-6 rounded-full bg-green-400 animate-ping opacity-75"></div>
            )}
          </div>

          {/* Texto del estado */}
          <div className="flex-1">
            <h2 className={`text-2xl font-black mb-2 ${
              isActive ? 'text-green-800' : 'text-red-800'
            }`}>
              {isActive ? '🟢 SISTEMA ACTIVO' : '🔴 SISTEMA INACTIVO'}
            </h2>
            
            <div className="space-y-1">
              <p className={`text-sm font-medium ${
                isActive ? 'text-green-700' : 'text-red-700'
              }`}>
                {isActive 
                  ? '✅ Todos los códigos QR están funcionando correctamente' 
                  : '⏰ Fuera de horario de atención'
                }
              </p>
              
              {/* Información adicional sobre horarios */}
              <p className="text-xs text-gray-600">
                📅 Horario de servicio: {scheduleInfo.startHour}:00 AM - {scheduleInfo.endHour}:00 PM (Hora de Bogotá)
              </p>
              
              {/* Tiempo restante o próximo horario */}
              {isActive && timeRemaining ? (
                <p className="text-xs text-green-600 font-medium">
                  ⏱️ Tiempo restante: {timeRemaining.hours}h {timeRemaining.minutes}m
                </p>
              ) : (
                nextSchedule && (
                  <p className="text-xs text-red-600 font-medium">
                    🔄 Próximo horario disponible: {nextSchedule.nextAvailable}
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Panel de información derecho */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          
          {/* Hora actual mejorada */}
          <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border">
            <div className="text-2xl font-mono font-black text-gray-800 mb-1">{timeString}</div>
            <div className="text-xs text-gray-600 font-medium">🌎 Bogotá, Colombia</div>
          </div>

          {/* Indicadores de funcionalidad */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Estado de QR */}
            <div className={`flex flex-col items-center p-3 rounded-lg text-center transition-all duration-300 ${
              isActive 
                ? 'bg-green-100 border-2 border-green-200' 
                : 'bg-red-100 border-2 border-red-200'
            }`}>
              <div className={`p-2 rounded-full mb-2 ${
                isActive ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {isActive ? (
                  <CheckCircle className="text-white" size={16} />
                ) : (
                  <Lock className="text-white" size={16} />
                )}
              </div>
              <span className={`text-xs font-bold ${
                isActive ? 'text-green-800' : 'text-red-800'
              }`}>
                QR CODES
              </span>
              <span className={`text-xs ${
                isActive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isActive ? 'Activos' : 'Bloqueados'}
              </span>
            </div>

            {/* Estado de descarga */}
            <div className={`flex flex-col items-center p-3 rounded-lg text-center transition-all duration-300 ${
              isActive 
                ? 'bg-blue-100 border-2 border-blue-200' 
                : 'bg-gray-100 border-2 border-gray-300'
            }`}>
              <div className={`p-2 rounded-full mb-2 ${
                isActive ? 'bg-blue-500' : 'bg-gray-400'
              }`}>
                {isActive ? (
                  <Download className="text-white" size={16} />
                ) : (
                  <Lock className="text-white" size={16} />
                )}
              </div>
              <span className={`text-xs font-bold ${
                isActive ? 'text-blue-800' : 'text-gray-600'
              }`}>
                DESCARGAS
              </span>
              <span className={`text-xs ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {isActive ? 'Disponibles' : 'Restringidas'}
              </span>
            </div>
          </div>

          {/* Icono decorativo grande */}
          <div className={`text-5xl transition-all duration-500 ${
            isActive ? 'animate-bounce' : 'opacity-50'
          }`}>
            {isActive ? '✅' : '⏰'}
          </div>
        </div>
      </div>

      {/* Barra de progreso del tiempo (solo si está activo) */}
      {isActive && timeRemaining && (
        <div className="mt-6 pt-4 border-t border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-green-700">Tiempo de servicio restante</span>
            <span className="text-xs font-mono text-green-600">
              {timeRemaining.hours}h {timeRemaining.minutes}m
            </span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000 animate-shimmer-slow"
              style={{ 
                width: `${Math.max(5, (timeRemaining.totalMinutes / (7 * 60)) * 100)}%` // 7 horas total de servicio
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Información de próximo horario (solo si está inactivo) */}
      {!isActive && nextSchedule && (
        <div className="mt-6 pt-4 border-t border-red-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500 rounded-full">
              <Clock className="text-white" size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-red-800">
                Próximo horario disponible
              </p>
              <p className="text-xs text-red-600">
                {nextSchedule.nextAvailable} • En aproximadamente {nextSchedule.hoursUntil} horas
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Efectos decorativos adicionales */}
      <div className={`absolute bottom-0 left-0 w-full h-1 ${
        isActive 
          ? 'bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400' 
          : 'bg-gradient-to-r from-red-400 via-orange-400 to-pink-400'
      } ${isActive ? 'animate-shimmer' : ''}`}></div>
    </div>
  );
};

export default StatusBar;