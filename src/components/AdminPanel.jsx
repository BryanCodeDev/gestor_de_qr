// src/components/AdminPanel.jsx (OPCIONAL - Solo para administradores)
import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';
import { SCHEDULE_CONFIG, getScheduleDisplayText } from '../config/scheduleConfig';

const AdminPanel = ({ onScheduleUpdate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tempConfig, setTempConfig] = useState({
    startHour: SCHEDULE_CONFIG.START_HOUR,
    endHour: SCHEDULE_CONFIG.END_HOUR,
    activeDays: [...SCHEDULE_CONFIG.ACTIVE_DAYS]
  });

  // Clave de administrador simple (cambiar por algo más seguro en producción)
  const ADMIN_KEY = 'mastercode2025';

  const handleAuth = () => {
    if (adminKey === ADMIN_KEY) {
      setIsAuthenticated(true);
    } else {
      alert('⛔ Clave incorrecta');
    }
  };

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

    // Aplicar cambios (esto requeriría una implementación más robusta en producción)
    if (onScheduleUpdate) {
      onScheduleUpdate(tempConfig);
    }
    
    alert('✅ Configuración guardada correctamente');
    setIsVisible(false);
    setIsAuthenticated(false);
    setAdminKey('');
  };

  const toggleDay = (dayIndex) => {
    setTempConfig(prev => ({
      ...prev,
      activeDays: prev.activeDays.includes(dayIndex)
        ? prev.activeDays.filter(d => d !== dayIndex)
        : [...prev.activeDays, dayIndex].sort()
    }));
  };

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        title="Panel de Administración"
      >
        <Settings size={20} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Settings className="text-blue-600" size={24} />
            Panel de Administración
          </h3>
          <button
            onClick={() => {
              setIsVisible(false);
              setIsAuthenticated(false);
              setAdminKey('');
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {!isAuthenticated ? (
          // Pantalla de autenticación
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clave de Administrador
              </label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese la clave"
                onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              />
            </div>
            <button
              onClick={handleAuth}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Acceder
            </button>
          </div>
        ) : (
          // Panel de configuración
          <div className="space-y-6">
            
            {/* Configuración actual */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Configuración Actual</h4>
              <p className="text-sm text-blue-700">{getScheduleDisplayText()}</p>
            </div>

            {/* Horario de inicio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora de Inicio
              </label>
              <select
                value={tempConfig.startHour}
                onChange={(e) => setTempConfig(prev => ({
                  ...prev,
                  startHour: parseInt(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Hora de Fin
              </label>
              <select
                value={tempConfig.endHour}
                onChange={(e) => setTempConfig(prev => ({
                  ...prev,
                  endHour: parseInt(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                Días Activos
              </label>
              <div className="grid grid-cols-7 gap-2">
                {dayNames.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => toggleDay(index)}
                    className={`p-2 text-xs font-medium rounded-lg transition-colors duration-200 ${
                      tempConfig.activeDays.includes(index)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Vista previa */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Vista Previa</h4>
              <p className="text-sm text-gray-600">
                {tempConfig.activeDays.map(d => dayNames[d]).join(', ')}: {' '}
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

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setTempConfig({
                    startHour: SCHEDULE_CONFIG.START_HOUR,
                    endHour: SCHEDULE_CONFIG.END_HOUR,
                    activeDays: [...SCHEDULE_CONFIG.ACTIVE_DAYS]
                  });
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                Resetear
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Guardar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;