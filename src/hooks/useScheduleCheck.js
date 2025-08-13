// src/hooks/useScheduleCheck.js
import { useState, useEffect } from 'react';
import { SCHEDULE_CONFIG, isActiveDay, getNextAvailableTime } from '../config/scheduleConfig';

export const useScheduleCheck = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scheduleInfo] = useState({
    startHour: SCHEDULE_CONFIG.START_HOUR,
    endHour: SCHEDULE_CONFIG.END_HOUR,
    timezone: SCHEDULE_CONFIG.TIMEZONE,
    activeDays: SCHEDULE_CONFIG.ACTIVE_DAYS
  });

  useEffect(() => {
    const checkSchedule = () => {
      try {
        // Obtener hora exacta de Bogotá, Colombia (UTC-5)
        const now = new Date();
        const bogotaTime = new Date(now.toLocaleString("en-US", {
          timeZone: scheduleInfo.timezone
        }));
        
        const hour = bogotaTime.getHours();
        const minutes = bogotaTime.getMinutes();
        const currentTimeInMinutes = hour * 60 + minutes;
        
        // Verificar si es un día activo (lunes a viernes por defecto)
        const isDayActive = isActiveDay(bogotaTime);
        
        // Horario configurado
        const startTimeInMinutes = scheduleInfo.startHour * 60;
        const endTimeInMinutes = scheduleInfo.endHour * 60;
        
        setCurrentTime(bogotaTime);
        
        // Verificar si estamos dentro del horario permitido Y en un día activo
        const isInSchedule = isDayActive && 
                           currentTimeInMinutes >= startTimeInMinutes && 
                           currentTimeInMinutes < endTimeInMinutes;
        
        setIsActive(isInSchedule);
        
        // Log para debugging (puedes comentarlo en producción)
        console.log(`🕐 ${bogotaTime.toLocaleDateString('es-CO')} ${hour}:${minutes.toString().padStart(2, '0')} | Día activo: ${isDayActive} | Estado: ${isInSchedule ? '✅ ACTIVO' : '❌ INACTIVO'}`);
        
      } catch (error) {
        console.error('Error verificando horario:', error);
        // En caso de error, por seguridad ponemos como inactivo
        setIsActive(false);
      }
    };

    // Verificar inmediatamente al cargar
    checkSchedule();

    // Verificar según la configuración (cada 30 segundos por defecto)
    const interval = setInterval(checkSchedule, SCHEDULE_CONFIG.CHECK_INTERVAL_SECONDS * 1000);

    // También verificar cada minuto para cambios precisos de horario
    const minuteInterval = setInterval(() => {
      const now = new Date();
      if (now.getSeconds() === 0) {
        checkSchedule();
      }
    }, 1000);

    // Limpiar intervalos al desmontar componente
    return () => {
      clearInterval(interval);
      clearInterval(minuteInterval);
    };
  }, [scheduleInfo.startHour, scheduleInfo.endHour, scheduleInfo.timezone, scheduleInfo.activeDays]);

  // Función para obtener información del próximo horario disponible
  const getNextScheduleInfo = () => {
    return getNextAvailableTime(new Date());
  };

  // Función para obtener el tiempo restante del horario actual
  const getTimeRemaining = () => {
    if (!isActive) return null;
    
    const now = new Date();
    const bogotaTime = new Date(now.toLocaleString("en-US", {
      timeZone: scheduleInfo.timezone
    }));
    
    const hour = bogotaTime.getHours();
    const minutes = bogotaTime.getMinutes();
    
    const endHour = scheduleInfo.endHour;
    const remainingMinutes = (endHour * 60) - (hour * 60 + minutes);
    
    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingMins = remainingMinutes % 60;
    
    return {
      hours: remainingHours,
      minutes: remainingMins,
      totalMinutes: remainingMinutes
    };
  };

  return { 
    isActive, 
    currentTime,
    scheduleInfo,
    nextSchedule: getNextScheduleInfo(),
    timeRemaining: getTimeRemaining(),
    timeString: currentTime.toLocaleTimeString('es-CO', {
      timeZone: scheduleInfo.timezone,
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    dateString: currentTime.toLocaleDateString('es-CO', {
      timeZone: scheduleInfo.timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    // Función para cambiar horarios si es necesario (para configuración)
    updateSchedule: (startHour, endHour) => {
      setScheduleInfo(prev => ({
        ...prev,
        startHour,
        endHour
      }));
    }
  };
};