// src/App.jsx - COMPLETAMENTE CORREGIDO con routing funcional y colores unificados
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import StatusBar from './components/StatusBar';
import QRComponent from './components/QRComponent';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import QRRedirect from './pages/QRRedirect';
import { FORM_CONFIGS } from './config/formsConfig';
import { useScheduleCheck } from './hooks/useScheduleCheck';

// 🏠 COMPONENTE PRINCIPAL (Home)
const HomePage = () => {
  const { isActive } = useScheduleCheck();

  // Función para manejar actualizaciones de configuración desde el panel admin
  const handleScheduleUpdate = (newConfig) => {
    // En una implementación real, esto se conectaría con una API o localStorage
    console.log('🔧 Nueva configuración de horarios:', newConfig);
    
    // Mostrar confirmación detallada
    const configDetails = `
🔧 NUEVA CONFIGURACIÓN:
• Hora inicio: ${newConfig.startHour}:00
• Hora fin: ${newConfig.endHour}:00  
• Días activos: ${newConfig.activeDays.length} días
• Estado: Configuración temporal aplicada

⚠️ IMPORTANTE: Para cambios permanentes en producción, 
contacta al desarrollador para actualizar los archivos de configuración.
    `;
    
    console.log(configDetails);
    
    // En producción, esto requeriría persistencia de datos
    // Por ahora solo mostramos la configuración en consola
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative">
      
      {/* Header con información de estado */}
      <Header />
      
      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-6">
        
        {/* Barra de estado mejorada */}
        <StatusBar />
        
        {/* Mensaje informativo cuando el sistema está inactivo */}
        {!isActive && (
          <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">!</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-amber-800">
                  🚫 Acceso Restringido
                </h3>
                <p className="text-amber-700 text-sm mt-1">
                  Los códigos QR y descargas están temporalmente deshabilitados. 
                  Los formularios estarán disponibles durante el horario de atención: 
                  <span className="font-semibold"> 1:00 PM - 11:00 PM (Hora de Bogotá)</span>
                </p>
                <p className="text-amber-600 text-xs mt-2">
                  💡 Los QR codes redirigen automáticamente según el horario establecido
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Grid de formularios QR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mb-8">
          {FORM_CONFIGS.map((config) => (
            <QRComponent 
              key={config.id} 
              formConfig={config} 
            />
          ))}
        </div>

        {/* Información adicional del sistema con colores unificados */}
        <div className="mt-12 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Estadísticas del sistema */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                📊 Estadísticas
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Formularios:</span>
                  <span className="font-bold text-blue-600">{FORM_CONFIGS.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Estado Actual:</span>
                  <span className={`font-bold ${isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {isActive ? 'ACTIVO' : 'INACTIVO'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Descargas:</span>
                  <span className={`font-bold ${isActive ? 'text-green-600' : 'text-slate-500'}`}>
                    {isActive ? 'DISPONIBLES' : 'RESTRINGIDAS'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">QR Inteligente:</span>
                  <span className="font-bold text-purple-600">HABILITADO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Panel Admin:</span>
                  <span className="font-bold text-blue-600">DISPONIBLE</span>
                </div>
              </div>
            </div>

            {/* Información de horarios */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                ⏰ Horarios
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-slate-600 text-sm">Días Activos:</span>
                  <p className="font-medium text-slate-800">Todos los días (24/7)</p>
                </div>
                <div>
                  <span className="text-slate-600 text-sm">Horario:</span>
                  <p className="font-medium text-slate-800">1:00 AM - 11:00 PM</p>
                </div>
                <div>
                  <span className="text-slate-600 text-sm">Zona Horaria:</span>
                  <p className="font-medium text-slate-800">Bogotá, Colombia</p>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-600 text-xs">⚙️ Configuración modificable desde panel admin</span>
                </div>
              </div>
            </div>

            {/* Instrucciones de uso actualizadas */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                📱 Instrucciones
              </h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">1.</span>
                  <span>Escanea el QR con tu dispositivo móvil</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">2.</span>
                  <span>El sistema verificará automáticamente el horario</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">3.</span>
                  <span>Si está activo: redirección INMEDIATA al formulario</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">4.</span>
                  <span>Si está inactivo: regresa al sistema principal</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">💡</span>
                  <span className="text-xs">Los QR impresos funcionan dinámicamente</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">⚙️</span>
                  <span className="text-xs">Panel admin disponible (botón inferior derecha)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* 🎯 PANEL DE ADMINISTRACIÓN - SIEMPRE DISPONIBLE */}
      <AdminPanel onScheduleUpdate={handleScheduleUpdate} />

      {/* Indicador de conexión (opcional) con colores unificados */}
      <div className="fixed bottom-4 left-4 z-30">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm transition-all duration-300 ${
          isActive 
            ? 'bg-green-100/90 text-green-800 border border-green-200' 
            : 'bg-red-100/90 text-red-800 border border-red-200'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'
          }`}></div>
          <span>
            {isActive ? 'Sistema Online' : 'Fuera de Horario'}
          </span>
        </div>
      </div>

      {/* Indicador de panel admin disponible con colores unificados */}
      <div className="fixed bottom-16 right-16 z-20">
        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium shadow-lg border border-blue-200 animate-pulse">
          ⚙️ Admin
        </div>
      </div>
    </div>
  );
};

// 🛠️ COMPONENTE DE PÁGINA NO ENCONTRADA MEJORADO
const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 shadow-2xl border border-red-200 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-red-800 mb-4">Página No Encontrada</h1>
        <p className="text-red-600 mb-6">La URL que buscas no existe en este sistema</p>
        <div className="space-y-3">
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300"
          >
            🏠 Volver al Inicio
          </button>
          <p className="text-xs text-slate-500">
            Si escaneaste un QR, verifica que esté funcionando correctamente
          </p>
        </div>
      </div>
    </div>
  );
};

// 🎯 COMPONENTE APP PRINCIPAL CON ROUTER CORREGIDO
const App = () => {
  return (
    <Router>
      <Routes>
        {/* 🏠 Página principal */}
        <Route path="/" element={<HomePage />} />
        
        {/* 🎯 Página de redirección inteligente para QR codes */}
        <Route path="/qr/:formId" element={<QRRedirect />} />
        
        {/* 🚫 Ruta de fallback para URLs no encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;