// src/components/Footer.jsx
import React from 'react';
import { Code, Mail, Zap, Heart, Github, Globe, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative mt-16 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      {/* Partículas decorativas */}
      <div className="absolute top-10 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-40"></div>
      <div className="absolute top-20 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-30"></div>
      <div className="absolute top-16 left-1/4 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-35"></div>
      <div className="absolute bottom-20 left-1/5 w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-40"></div>
      
      <div className="relative container mx-auto px-4 py-12">
        
        {/* Sección principal */}
        <div className="text-center mb-12">
          
          {/* Logo y empresa premium */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4 group">
              
              {/* Logo con efectos 3D */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-2xl transform transition duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                  <Code className="text-white drop-shadow-lg" size={24} />
                </div>
              </div>
              
              {/* Nombre de la empresa */}
              <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                MasterCode Company
              </h3>
            </div>
            
            {/* Slogan */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              <p className="text-gray-300 text-lg font-medium tracking-wide">
                Soluciones Tecnológicas Innovadoras
              </p>
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </div>
            
            {/* Badges de características */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/20">
                <Award className="text-blue-400" size={16} />
                <span className="text-blue-200 text-sm font-medium">Calidad Premium</span>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-green-500/20">
                <Zap className="text-green-400" size={16} />
                <span className="text-green-200 text-sm font-medium">Alto Rendimiento</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/20">
                <Globe className="text-purple-400" size={16} />
                <span className="text-purple-200 text-sm font-medium">Alcance Global</span>
              </div>
            </div>
          </div>

          {/* Información del desarrollador */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
            
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Información del desarrollador */}
              <div className="group flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 transform hover:scale-105">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-3 group-hover:animate-pulse">
                  <Code className="text-white" size={20} />
                </div>
                <h5 className="text-white font-bold mb-1">Desarrollador</h5>
                <p className="text-gray-300 text-sm text-center leading-relaxed">
                  Bryan Santiago Muñoz Romero
                </p>
              </div>
              
              {/* Contacto */}
              <div className="group flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/10 hover:border-green-500/30 transition-all duration-300 transform hover:scale-105">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-3 group-hover:animate-pulse">
                  <Mail className="text-white" size={20} />
                </div>
                <h5 className="text-white font-bold mb-1">Contacto</h5>
                <a 
                  href="mailto:mastercodecompany@gmail.com" 
                  className="text-gray-300 text-sm text-center hover:text-green-400 transition-colors duration-300 leading-relaxed break-all"
                >
                  mastercodecompany@gmail.com
                </a>
              </div>
              
              {/* Proyecto */}
              <div className="group flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 transform hover:scale-105">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-3 group-hover:animate-pulse">
                  <Zap className="text-white" size={20} />
                </div>
                <h5 className="text-white font-bold mb-1">Proyecto</h5>
                <p className="text-gray-300 text-sm text-center leading-relaxed">
                  Sistema QR Programable
                </p>
              </div>
            </div>

            {/* Enlaces sociales */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button 
                onClick={() => window.open('https://github.com/BryanCodeDev', '_blank')}
                className="group p-3 bg-gray-700 hover:bg-blue-600 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                title="Visitar GitHub"
              >
                <Github className="text-white group-hover:animate-pulse" size={20} />
              </button>
              <button 
                onClick={() => window.open('https://mastercodecompany.com', '_blank')}
                className="group p-3 bg-gray-700 hover:bg-purple-600 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                title="Visitar Sitio Web"
              >
                <Globe className="text-white group-hover:animate-pulse" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas del sistema */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400 mb-1">38</div>
            <div className="text-xs text-gray-400">Formularios</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
            <div className="text-2xl font-bold text-green-400 mb-1">24/7</div>
            <div className="text-xs text-gray-400">Disponibilidad</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400 mb-1">HD</div>
            <div className="text-xs text-gray-400">Calidad QR</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-400 mb-1">∞</div>
            <div className="text-xs text-gray-400">Descargas</div>
          </div>
        </div>

        {/* Separador decorativo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          <div className="mx-4 p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <Heart className="text-white animate-pulse" size={16} />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        </div>

        {/* Copyright y créditos */}
        <div className="text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 mb-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Sistema Activo
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              Última Actualización: 2025
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              Versión 1.0.0
            </span>
          </div>
          
          <p className="text-xs text-gray-500 leading-relaxed">
            © 2025 MasterCode Company. Todos los derechos reservados.
          </p>
        </div>

        {/* Efectos de brillo final */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer"></div>
      </div>
    </footer>
  );
};

export default Footer;