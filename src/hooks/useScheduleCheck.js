// src/hooks/useScheduleCheck.js
import { useState, useEffect } from 'react';

export const useScheduleCheck = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const checkSchedule = () => {
      // Obtener hora de Bogotá, Colombia (UTC-5)
      const now = new Date();
      const bogotaTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Bogota"}));
      
      const hour = bogotaTime.getHours();
      setCurrentTime(bogotaTime);
      
      // 🕐 Horario: 8 AM a 3 PM (15:00 en formato 24h)
      setIsActive(hour >= 8 && hour < 15);
    };

    // Verificar inmediatamente al cargar
    checkSchedule();

    // Verificar cada segundo para actualización en tiempo real
    const interval = setInterval(checkSchedule, 1000);

    // Limpiar intervalo al desmontar componente
    return () => clearInterval(interval);
  }, []);

  return { 
    isActive, 
    currentTime,
    timeString: currentTime.toLocaleTimeString('es-CO', {
      timeZone: 'America/Bogota',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    dateString: currentTime.toLocaleDateString('es-CO', {
      timeZone: 'America/Bogota',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
};