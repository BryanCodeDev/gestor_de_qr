// src/App.jsx - ACTUALIZADO con React Router
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import StatusBar from './components/StatusBar';
import QRComponent from './components/QRComponent';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import QRRedirect from './pages/QRRedirect.jsx'; // 🎯 NUEVA PÁGINA
import { FORM_CONFIGS } from './config/formsConfig';
import { useScheduleCheck } from './hooks/useScheduleCheck';

// 🏠 COMPONENTE PRINCIPAL (Home)
const HomePage = () => {
  const { isActive } = useScheduleCheck();

  // Función para manejar actualizaciones de configuración desde el panel admin
  const handleScheduleUpdate = (newConfig) => {
    // En una implementación real, esto se conectaría con una API o localStorage
    console.log('Nueva configuración de horarios:', newConfig);
    // Por ahora solo mostramos la configuración en consola
    // En producción, esto requeriría persistencia de datos
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      
      {/* Header con información de estado */}
      <Header />
      
      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-6">
        
        {/* Barra de estado mejorada */}
        <StatusBar />
        
        {/* Mensaje informativo cuando el sistema está inactivo */}
        {!isActive && (
          <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg shadow-lg">
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
                  <span className="font-semibold"> 8:00 AM - 3:00 PM (Hora de Bogotá)</span>
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

        {/* Información adicional del sistema */}
        <div className="mt-12 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Estadísticas del sistema */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                📊 Estadísticas
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Formularios:</span>
                  <span className="font-bold text-blue-600">{FORM_CONFIGS.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estado Actual:</span>
                  <span className={`font-bold ${isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {isActive ? 'ACTIVO' : 'INACTIVO'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Descargas:</span>
                  <span className={`font-bold ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                    {isActive ? 'DISPONIBLES' : 'RESTRINGIDAS'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">QR Inteligente:</span>
                  <span className="font-bold text-purple-600">HABILITADO</span>
                </div>
              </div>
            </div>

            {/* Información de horarios */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                ⏰ Horarios
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600 text-sm">Días Activos:</span>
                  <p className="font-medium text-gray-800">Lunes - Viernes</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Horario:</span>
                  <p className="font-medium text-gray-800">8:00 AM - 3:00 PM</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Zona Horaria:</span>
                  <p className="font-medium text-gray-800">Bogotá, Colombia</p>
                </div>
              </div>
            </div>

            {/* Instrucciones de uso actualizadas */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                📱 Instrucciones
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
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
                  <span>Si está activo: se redirige al formulario</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">4.</span>
                  <span>Si está inactivo: muestra horarios disponibles</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">💡</span>
                  <span className="text-xs">Los QR impresos funcionan dinámicamente</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Panel de administración (opcional - solo aparece si se necesita) */}
      {process.env.NODE_ENV === 'development' && (
        <AdminPanel onScheduleUpdate={handleScheduleUpdate} />
      )}

      {/* Indicador de conexión (opcional) */}
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
    </div>
  );
};

// 🎯 COMPONENTE APP PRINCIPAL CON ROUTER
const App = () => {
  return (
    <Router>
      <Routes>
        {/* 🏠 Página principal */}
        <Route path="/" element={<HomePage />} />
        
        {/* 🎯 Página de redirección inteligente para QR codes */}
        <Route path="/qr/:formId" element={<QRRedirect />} />
        
        {/* 🚫 Ruta de fallback para URLs no encontradas */}
        <Route path="*" element={
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-red-200 max-w-md w-full text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h1 className="text-2xl font-bold text-red-800 mb-4">Página No Encontrada</h1>
              <p className="text-red-600 mb-6">La URL que buscas no existe</p>
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;