import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, AlertTriangle, CheckCircle, ArrowRight, Calendar, MapPin, Home } from 'lucide-react';
import { FORM_CONFIGS } from '../config/formsConfig';
import { useScheduleCheck } from '../hooks/useScheduleCheck';

const QRRedirect = () => {
  const { formId } = useParams();
  const { isActive, timeString, scheduleInfo, nextSchedule } = useScheduleCheck();
  const [countdown, setCountdown] = useState(3);
  const [redirectCountdown, setRedirectCountdown] = useState(8); // 8 segundos para redirigir a página principal
  const [formConfig, setFormConfig] = useState(null);

  useEffect(() => {
    // Encontrar la configuración del formulario
    const config = FORM_CONFIGS.find(f => f.id === parseInt(formId));
    setFormConfig(config);

    // Si está ACTIVO, redirigir al formulario de Google después del countdown
    if (isActive && config) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // 🎯 REDIRECCIÓN AL FORMULARIO DE GOOGLE
            window.location.href = config.url;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }

    // Si está INACTIVO, redirigir a la página principal después de 8 segundos
    if (!isActive) {
      const redirectTimer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            // 🏠 REDIRECCIÓN A LA PÁGINA PRINCIPAL DEL SISTEMA QR
            window.location.href = 'https://gestor-qr.netlify.app/';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(redirectTimer);
    }
  }, [formId, isActive, formConfig]);

  // Si no encuentra el formulario
  if (!formConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-red-200 max-w-md w-full text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-800 mb-4">Formulario No Encontrado</h1>
          <p className="text-red-600 mb-6">El código QR escaneado no es válido</p>
          <button 
            onClick={() => window.location.href = 'https://gestor-qr.netlify.app/'}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300"
          >
            Volver al Sistema QR
          </button>
        </div>
      </div>
    );
  }

  // Si está ACTIVO - Página de redirección automática AL FORMULARIO DE GOOGLE
  if (isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-200 max-w-lg w-full text-center relative overflow-hidden">
          
          {/* Efectos de fondo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-400 rounded-full opacity-10 animate-pulse -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full opacity-10 animate-bounce -ml-12 -mb-12"></div>
          
          <div className="relative z-10">
            {/* Icono de éxito */}
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="text-white" size={40} />
            </div>

            {/* Título */}
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              ✅ Sistema Activo
            </h1>

            {/* Info del formulario */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6 border border-green-200">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{formConfig.name}</h2>
              <p className="text-sm text-gray-600 mb-4">🎯 Redirigiendo al formulario de Google...</p>
              
              {/* Countdown */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl animate-pulse">
                  {countdown}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-700">Accediendo en</p>
                  <p className="text-xs text-gray-500">{countdown} segundo{countdown !== 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 animate-pulse"
                  style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Información de horario actual */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <Clock className="mx-auto text-blue-500 mb-1" size={20} />
                <p className="text-xs text-gray-500">Hora Actual</p>
                <p className="text-sm font-bold text-gray-800">{timeString}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <Calendar className="mx-auto text-green-500 mb-1" size={20} />
                <p className="text-xs text-gray-500">Estado</p>
                <p className="text-sm font-bold text-green-600">DISPONIBLE</p>
              </div>
            </div>

            {/* Botón de redirección manual AL FORMULARIO */}
            <button 
              onClick={() => window.location.href = formConfig.url}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Ir Ahora al Formulario</span>
              <ArrowRight size={20} />
            </button>

            <p className="text-xs text-gray-400 mt-3">
              🎯 Te llevamos directamente al formulario de Google Forms
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Si está INACTIVO - Página de horario restringido CON REDIRECCIÓN A PÁGINA PRINCIPAL
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 shadow-2xl border border-red-200 max-w-lg w-full text-center relative overflow-hidden">
        
        {/* Efectos de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-400 rounded-full opacity-10 -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-400 rounded-full opacity-10 -ml-12 -mb-12"></div>
        
        <div className="relative z-10">
          {/* Icono de restricción */}
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="text-white animate-pulse" size={40} />
          </div>

          {/* Título */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
            🚫 Fuera de Horario
          </h1>

          {/* Info del formulario solicitado */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 mb-6 border border-red-200">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{formConfig.name}</h2>
            <p className="text-sm text-red-600 font-semibold mb-4">
              ⏰ Acceso restringido fuera del horario de atención
            </p>
            
            {/* 🏠 CONTADOR DE REDIRECCIÓN A PÁGINA PRINCIPAL */}
            <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-200">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm animate-pulse">
                  {redirectCountdown}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                    <Home size={16} />
                    Regresando al sistema
                  </p>
                  <p className="text-xs text-blue-600">{redirectCountdown} segundos</p>
                </div>
              </div>
              
              {/* Barra de progreso de redirección */}
              <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((8 - redirectCountdown) / 8) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Horarios de servicio */}
            <div className="bg-white rounded-xl p-4 mb-4 border border-red-100">
              <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center justify-center gap-2">
                <Clock size={16} />
                Horarios de Atención
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <span className="font-semibold">Días:</span> Lunes a Viernes
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Horario:</span> {scheduleInfo.startHour}:00 AM - {scheduleInfo.endHour}:00 PM
                </p>
                <p className="text-gray-700 flex items-center justify-center gap-1">
                  <MapPin size={14} />
                  <span className="font-semibold">Zona:</span> Bogotá, Colombia
                </p>
              </div>
            </div>

            {/* Próximo horario disponible */}
            {nextSchedule && (
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-sm text-amber-800">
                  <span className="font-semibold">📅 Próximo acceso:</span>
                  <br />
                  {nextSchedule.nextAvailable}
                </p>
              </div>
            )}
          </div>

          {/* Información actual */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <Clock className="mx-auto text-red-500 mb-1" size={20} />
              <p className="text-xs text-gray-500">Hora Actual</p>
              <p className="text-sm font-bold text-gray-800">{timeString}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <AlertTriangle className="mx-auto text-red-500 mb-1" size={20} />
              <p className="text-xs text-gray-500">Estado</p>
              <p className="text-sm font-bold text-red-600">NO DISPONIBLE</p>
            </div>
          </div>

          {/* Botón para volver al sistema MANUALMENTE */}
          <button 
            onClick={() => window.location.href = 'https://gestor-qr.netlify.app/'}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mb-4"
          >
            <Home size={20} />
            <span>Ir al Sistema QR Ahora</span>
          </button>

          <p className="text-xs text-gray-500">
            💡 Este código QR será funcional durante los horarios de atención establecidos
          </p>

          {/* Información de contacto opcional */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              Sistema desarrollado por MasterCode Company
              <br />
              QR Codes Inteligentes con redirección automática
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRRedirect;