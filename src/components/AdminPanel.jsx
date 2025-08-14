// src/components/AdminPanel.jsx - VERSIÓN MEJORADA PARA PRODUCCIÓN
import React, { useState, useEffect } from 'react';
import { Settings, Save, Eye, EyeOff, Shield, Clock } from 'lucide-react';
import { SCHEDULE_CONFIG, getScheduleDisplayText } from '../config/scheduleConfig';

const AdminPanel = ({ onScheduleUpdate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);
  const [tempConfig, setTempConfig] = useState({
    startHour: SCHEDULE_CONFIG.START_HOUR,
    endHour: SCHEDULE_CONFIG.END_HOUR,
    activeDays: [...SCHEDULE_CONFIG.ACTIVE_DAYS]
  });

  // 🔐 CLAVES DE ADMINISTRADOR MÚLTIPLES (más seguro)
  const ADMIN_KEYS = [
    'mastercode2025',
    'admin2025qr',
    'gestor2025',
    'bryan2025'
  ];

  // ⏱️ Sistema de bloqueo temporal
  useEffect(() => {
    if (isBlocked && blockTimeRemaining > 0) {
      const timer = setTimeout(() => {
        setBlockTimeRemaining(blockTimeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isBlocked && blockTimeRemaining === 0) {
      setIsBlocked(false);
      setAttempts(0);
    }
  }, [isBlocked, blockTimeRemaining]);

  // 🛡️ Verificación de autenticación mejorada
  const handleAuth = () => {
    if (isBlocked) {
      alert(`🚫 Acceso bloqueado. Intenta en ${blockTimeRemaining} segundos.`);
      return;
    }

    if (ADMIN_KEYS.includes(adminKey.toLowerCase())) {
      setIsAuthenticated(true);
      setAttempts(0);
      setAdminKey('');
      console.log('🔓 Acceso administrativo concedido');
    } else {
      setAttempts(prev => prev + 1);
      const remainingAttempts = 3 - attempts - 1;
      
      if (attempts >= 2) {
        setIsBlocked(true);
        setBlockTimeRemaining(60); // 1 minuto de bloqueo
        alert('🚫 Demasiados intentos fallidos. Acceso bloqueado por 1 minuto.');
      } else {
        alert(`❌ Clave incorrecta. Te quedan ${remainingAttempts} intentos.`);
      }
      
      setAdminKey('');
    }
  };

  // 💾 Función de guardar mejorada
  const handleSave = () => {
    // Validaciones
    if (tempConfig.startHour >= tempConfig.endHour) {
      alert('⚠️ La hora de inicio debe ser anterior a la hora de fin');
      return;
    }
    
    if (tempConfig.activeDays.length === 0) {
      alert('⚠️ Debe seleccionar al menos un día activo');
      return;
    }

    // En producción, esto requeriría una API backend
    if (onScheduleUpdate) {
      onScheduleUpdate(tempConfig);
    }
    
    // Simular guardado exitoso
    alert('✅ Configuración guardada correctamente\n\nNota: En producción, los cambios requieren redeploy para ser permanentes.');
    
    // Log para debugging
    console.log('📝 Nueva configuración:', tempConfig);
    
    // Cerrar panel
    setIsVisible(false);
    setIsAuthenticated(false);
  };

  // 🔄 Toggle de días
  const toggleDay = (dayIndex) => {
    setTempConfig(prev => ({
      ...prev,
      activeDays: prev.activeDays.includes(dayIndex)
        ? prev.activeDays.filter(d => d !== dayIndex)
        : [...prev.activeDays, dayIndex].sort()
    }));
  };

  // 🔒 Cerrar sesión de administrador
  const handleLogout = () => {
    setIsVisible(false);
    setIsAuthenticated(false);
    setAdminKey('');
    setAttempts(0);
    console.log('🔐 Sesión administrativa cerrada');
  };

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // 🎯 Botón de acceso (siempre visible)
  if (!isVisible) {
    return (
      <>
        {/* Botón principal de acceso */}
        <button
          onClick={() => setIsVisible(true)}
          className="fixed bottom-4 right-4 p-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group z-50"
          title="Panel de Administración"
        >
          <div className="relative">
            <Settings size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            {/* Indicador de disponibilidad */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </button>

        {/* Badge informativo */}
        {isBlocked && (
          <div className="fixed bottom-16 right-4 bg-red-600 text-white px-3 py-1 rounded-lg text-xs shadow-lg z-40">
            🔒 Bloqueado: {blockTimeRemaining}s
          </div>
        )}
      </>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        
        {!isAuthenticated ? (
          // 🔐 PANTALLA DE AUTENTICACIÓN MEJORADA
          <div className="p-6">
            {/* Header con seguridad */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Panel de Administración
              </h3>
              <p className="text-sm text-gray-600">
                Acceso restringido - Solo personal autorizado
              </p>
            </div>

            {/* Información de seguridad */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <Shield className="text-white" size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-amber-800 text-sm font-medium">
                    Sistema de Seguridad Activo
                  </p>
                  <p className="text-amber-700 text-xs">
                    Intentos: {attempts}/3 • {isBlocked ? `Bloqueado (${blockTimeRemaining}s)` : 'Acceso Permitido'}
                  </p>
                </div>
              </div>
            </div>

            {/* Campo de clave */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🔑 Clave de Administrador
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Ingrese la clave de acceso"
                    onKeyPress={(e) => e.key === 'Enter' && !isBlocked && handleAuth()}
                    disabled={isBlocked}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsVisible(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAuth}
                  disabled={isBlocked || !adminKey}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Shield size={16} />
                  {isBlocked ? `Bloqueado (${blockTimeRemaining}s)` : 'Acceder'}
                </button>
              </div>

              {/* Información de claves válidas (solo en desarrollo) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                  <p className="text-xs text-gray-600 font-medium mb-1">🛠️ Claves válidas (solo desarrollo):</p>
                  <p className="text-xs text-gray-500 font-mono">
                    mastercode2025, admin2025qr, gestor2025, bryan2025
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          // ⚙️ PANEL DE CONFIGURACIÓN
          <div className="p-6">
            {/* Header autenticado */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Settings className="text-green-600" size={24} />
                Configuración del Sistema
              </h3>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                title="Cerrar Sesión"
              >
                ❌
              </button>
            </div>

            {/* Estado actual del sistema */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-bold text-green-800 mb-2 flex items-center gap-2">
                <Clock size={16} />
                Configuración Actual
              </h4>
              <p className="text-sm text-green-700">{getScheduleDisplayText()}</p>
            </div>

            <div className="space-y-6">
              {/* Horario de inicio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🌅 Hora de Inicio
                </label>
                <select
                  value={tempConfig.startHour}
                  onChange={(e) => setTempConfig(prev => ({
                    ...prev,
                    startHour: parseInt(e.target.value)
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({length: 24}, (_, i) => (
                    <option key={i} value={i}>
                      {i === 0 ? '12:00 AM' : 
                       i < 12 ? `${i}:00 AM` : 
                       i === 12 ? '12:00 PM' : 
                       `${i-12}:00 PM`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Horario de fin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🌆 Hora de Fin
                </label>
                <select
                  value={tempConfig.endHour}
                  onChange={(e) => setTempConfig(prev => ({
                    ...prev,
                    endHour: parseInt(e.target.value)
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({length: 24}, (_, i) => (
                    <option key={i} value={i}>
                      {i === 0 ? '12:00 AM' : 
                       i < 12 ? `${i}:00 AM` : 
                       i === 12 ? '12:00 PM' : 
                       `${i-12}:00 PM`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Días activos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  📅 Días Activos
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {dayNames.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => toggleDay(index)}
                      className={`p-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        tempConfig.activeDays.includes(index)
                          ? 'bg-blue-600 text-white shadow-lg scale-105'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vista previa */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-800 mb-2">👀 Vista Previa</h4>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Días:</span> {tempConfig.activeDays.map(d => dayNames[d]).join(', ')}
                  <br />
                  <span className="font-semibold">Horario:</span> {' '}
                  {tempConfig.startHour === 0 ? '12:00 AM' : 
                   tempConfig.startHour < 12 ? `${tempConfig.startHour}:00 AM` : 
                   tempConfig.startHour === 12 ? '12:00 PM' : 
                   `${tempConfig.startHour-12}:00 PM`} - {' '}
                  {tempConfig.endHour === 0 ? '12:00 AM' : 
                   tempConfig.endHour < 12 ? `${tempConfig.endHour}:00 AM` : 
                   tempConfig.endHour === 12 ? '12:00 PM' : 
                   `${tempConfig.endHour-12}:00 PM`}
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setTempConfig({
                      startHour: SCHEDULE_CONFIG.START_HOUR,
                      endHour: SCHEDULE_CONFIG.END_HOUR,
                      activeDays: [...SCHEDULE_CONFIG.ACTIVE_DAYS]
                    });
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200"
                >
                  🔄 Resetear
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Save size={16} />
                  💾 Guardar
                </button>
              </div>

              {/* Advertencia sobre cambios en producción */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs text-amber-700">
                  ⚠️ <strong>Importante:</strong> Los cambios en esta configuración son temporales. 
                  Para cambios permanentes en producción, contacta al desarrollador.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;