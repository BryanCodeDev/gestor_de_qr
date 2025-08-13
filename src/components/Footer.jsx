// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          
          {/* Logo y empresa */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">MC</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                MasterCode Company
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Soluciones tecnológicas innovadoras
            </p>
          </div>

          {/* Información del desarrollador */}
          <div className="border-t border-gray-700 pt-6">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              
              <div className="flex items-center justify-center space-x-2">
                <span className="text-blue-400">👨‍💻</span>
                <span className="text-gray-300">Bryan Santiago Muñoz Romero</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-400">📧</span>
                <span className="text-gray-300">tiagotroller01019@gmail.com</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <span className="text-yellow-400">⚡</span>
                <span className="text-gray-300">Sistema QR Programable</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              © 2024 MasterCode Company. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;