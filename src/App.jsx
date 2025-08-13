// src/App.jsx
import React from 'react';
import Header from './components/Header';
import StatusBar from './components/StatusBar';
import QRComponent from './components/QRComponent';
import Footer from './components/Footer';
import { FORM_CONFIGS } from './config/formsConfig';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <StatusBar />
        
        {/* Grid responsivo optimizado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mb-8">
          {FORM_CONFIGS.map((config) => (
            <QRComponent key={config.id} formConfig={config} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;