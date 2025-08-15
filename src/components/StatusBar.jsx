// src/components/StatusBar.jsx
import React from 'react';
import { useScheduleCheck } from '../hooks/useScheduleCheck';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Download, 
  Lock,
  Calendar,
  MapPin,
  QrCode
} from 'lucide-react';

const StatusBar = () => {
  const { 
    isActive, 
    timeString, 
    dateString,
    nextSchedule, 
    timeRemaining, 
    scheduleInfo 
  } = useScheduleCheck();

  return (
    <div className="mb-6">
      
      {/* Información de fecha y hora */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Fecha y ubicación */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-slate-600">
              <Calendar className="text-blue-500" size={16} />
              <span className="font-medium capitalize">{dateString}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600">
              <MapPin className="text-blue-500" size={16} />
              <span className="text-sm">Bogotá, Colombia</span>
            </div>
          </div>

          {/* Hora actual */}
          <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
            <Clock className="text-blue-500" size={16} />
            <span className="font-mono text-lg font-semibold text-slate-800">{timeString}</span>
          </div>
        </div>
      </div>

      {/* Estado del sistema */}
      <div className={`rounded-xl shadow-sm border-l-4 p-6 ${
        isActive 
          ? 'bg-green-50 border-green-500' 
          : 'bg-red-50 border-red-500'
      }`}>
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Estado principal */}
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full shadow-lg ${
              isActive ? 'bg-green-500' : 'bg-red-500'
            }`}>
              {isActive ? (
                <CheckCircle className="text-white" size={20} />
              ) : (
                <XCircle className="text-white" size={20} />
              )}
            </div>
            
            <div>
              <h2 className={`text-xl font-bold mb-1 ${
                isActive ? 'text-green-800' : 'text-red-800'
              }`}>
                {isActive ? 'Sistema Activo' : 'Sistema Inactivo'}
              </h2>
              
              <p className={`text-sm mb-2 ${
                isActive ? 'text-green-700' : 'text-red-700'
              }`}>
                {isActive 
                  ? 'Todos los códigos QR están funcionando correctamente' 
                  : 'Fuera de horario de atención'
                }
              </p>
              
              <p className="text-xs text-slate-600">
                Horario: {scheduleInfo.startHour}:00 AM - {scheduleInfo.endHour}:00 PM
              </p>
              
              {/* Información de tiempo */}
              {isActive && timeRemaining ? (
                <p className="text-xs text-green-600 font-medium mt-1">
                  Tiempo restante: {timeRemaining.hours}h {timeRemaining.minutes}m
                </p>
              ) : (
                nextSchedule && (
                  <p className="text-xs text-red-600 font-medium mt-1">
                    Próximo horario: {nextSchedule.nextAvailable}
                  </p>
                )
              )}
            </div>
          </div>

          {/* Indicadores de servicios */}
          <div className="flex gap-4">
            
            {/* Estado QR Codes */}
            <div className={`flex flex-col items-center p-4 rounded-xl border-2 ${
              isActive 
                ? 'bg-white border-green-200 shadow-sm' 
                : 'bg-slate-50 border-red-200'
            }`}>
              <div className={`p-2 rounded-full mb-2 ${
                isActive ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {isActive ? (
                  <QrCode className="text-green-600" size={18} />
                ) : (
                  <Lock className="text-red-600" size={18} />
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

            {/* Estado Descargas */}
            <div className={`flex flex-col items-center p-4 rounded-xl border-2 ${
              isActive 
                ? 'bg-white border-blue-200 shadow-sm' 
                : 'bg-slate-50 border-slate-300'
            }`}>
              <div className={`p-2 rounded-full mb-2 ${
                isActive ? 'bg-blue-100' : 'bg-slate-100'
              }`}>
                {isActive ? (
                  <Download className="text-blue-600" size={18} />
                ) : (
                  <Lock className="text-slate-600" size={18} />
                )}
              </div>
              <span className={`text-xs font-bold ${
                isActive ? 'text-blue-800' : 'text-slate-600'
              }`}>
                DESCARGAS
              </span>
              <span className={`text-xs ${
                isActive ? 'text-blue-600' : 'text-slate-500'
              }`}>
                {isActive ? 'Disponibles' : 'Restringidas'}
              </span>
            </div>
          </div>
        </div>

        {/* Barra de progreso simple (solo si está activo) */}
        {isActive && timeRemaining && (
          <div className="mt-4 pt-4 border-t border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-green-700">Progreso del día</span>
              <span className="text-xs text-green-600">
                {Math.round(100 - (timeRemaining.totalMinutes / (22 * 60)) * 100)}% completado
              </span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.max(5, 100 - (timeRemaining.totalMinutes / (22 * 60)) * 100)}%`
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusBar;