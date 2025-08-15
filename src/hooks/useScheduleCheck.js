// src/hooks/useScheduleCheck.js - VERSIÓN CORREGIDA SIN WARNINGS
import { useState, useEffect } from 'react';
import { 
  SCHEDULE_CONFIG, 
  getNextAvailableTime, 
  getBogotaTime, 
  isSystemActive 
} from '../config/scheduleConfig';

export const useScheduleCheck = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scheduleInfo, setScheduleInfo] = useState({
    startHour: SCHEDULE_CONFIG.START_HOUR,
    endHour: SCHEDULE_CONFIG.END_HOUR,
    timezone: SCHEDULE_CONFIG.TIMEZONE,
    activeDays: SCHEDULE_CONFIG.ACTIVE_DAYS
  });

  useEffect(() => {
    const checkSchedule = () => {
      try {
        // 🎯 USAR FUNCIÓN MEJORADA PARA iOS
        const now = new Date();
        const bogotaTime = getBogotaTime(now);
        
        // Usar la función centralizada que maneja iOS correctamente
        const systemIsActive = isSystemActive(now);
        
        setCurrentTime(bogotaTime);
        setIsActive(systemIsActive);
        
        // 🔍 DEBUG MEJORADO PARA iOS
        const hour = bogotaTime.getHours();
        const minutes = bogotaTime.getMinutes();
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        
        const debugLog = `🕐 ${bogotaTime.toLocaleDateString('es-CO')} ${hour}:${minutes.toString().padStart(2, '0')} | Estado: ${systemIsActive ? '✅ ACTIVO' : '❌ INACTIVO'}`;
        
        if (isIOS) {
          console.log(`🎯 iOS DETECTADO - ${debugLog}`);
          console.log(`📱 Safari: ${isSafari} | UserAgent: ${navigator.userAgent.substring(0, 50)}...`);
        } else {
          console.log(debugLog);
        }
        
      } catch (error) {
        console.error('❌ Error verificando horario en hook:', error);
        // En caso de error, por seguridad ponemos como inactivo
        setIsActive(false);
      }
    };

    // Verificar inmediatamente al cargar
    checkSchedule();

    // ⚡ INTERVALO MÁS FRECUENTE PARA iOS (cada 15 segundos en lugar de 30)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const checkInterval = isIOS ? 15000 : (SCHEDULE_CONFIG.CHECK_INTERVAL_SECONDS * 1000);
    
    console.log(`⏱️ Configurando intervalo de verificación: ${checkInterval/1000}s (iOS: ${isIOS})`);
    
    const interval = setInterval(checkSchedule, checkInterval);

    // También verificar cada minuto para cambios precisos de horario
    const minuteInterval = setInterval(() => {
      const now = new Date();
      const seconds = now.getSeconds();
      // Verificar al inicio de cada minuto
      if (seconds === 0 || seconds === 30) {
        console.log('🔄 Verificación por cambio de minuto/30s');
        checkSchedule();
      }
    }, 1000);

    // 🎯 VERIFICACIÓN ADICIONAL PARA iOS cuando la app vuelve al foco
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('👁️ App volvió al foco - Verificando horario');
        setTimeout(checkSchedule, 500); // Pequeño delay para estabilidad
      }
    };

    const handleFocus = () => {
      console.log('🎯 Window focus - Verificando horario');
      setTimeout(checkSchedule, 500);
    };

    // Eventos específicos para iOS/Safari
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pageshow', checkSchedule); // Específico para Safari

    // Limpiar intervalos y eventos al desmontar componente
    return () => {
      clearInterval(interval);
      clearInterval(minuteInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', checkSchedule);
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
    const bogotaTime = getBogotaTime(now);
    
    const hour = bogotaTime.getHours();
    const minutes = bogotaTime.getMinutes();
    
    const endHour = scheduleInfo.endHour;
    const remainingMinutes = (endHour * 60) - (hour * 60 + minutes);
    
    // Si es negativo, no hay tiempo restante
    if (remainingMinutes <= 0) return null;
    
    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingMins = remainingMinutes % 60;
    
    return {
      hours: remainingHours,
      minutes: remainingMins,
      totalMinutes: remainingMinutes
    };
  };

  // Función para actualizar horarios (para configuración)
  const updateSchedule = (startHour, endHour) => {
    console.log(`⚙️ Actualizando horarios: ${startHour}:00 - ${endHour}:00`);
    setScheduleInfo(prev => ({
      ...prev,
      startHour,
      endHour
    }));
  };

  // 🎯 FUNCIÓN ESPECÍFICA PARA FORZAR VERIFICACIÓN (Útil para debug en iOS)
  const forceCheck = () => {
    console.log('🔄 Verificación forzada solicitada');
    const now = new Date();
    const bogotaTime = getBogotaTime(now);
    const systemIsActive = isSystemActive(now);
    
    setCurrentTime(bogotaTime);
    setIsActive(systemIsActive);
    
    return {
      time: bogotaTime,
      active: systemIsActive,
      debug: {
        userAgent: navigator.userAgent,
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
        hour: bogotaTime.getHours(),
        minute: bogotaTime.getMinutes()
      }
    };
  };

  return { 
    isActive, 
    currentTime,
    scheduleInfo,
    nextSchedule: getNextScheduleInfo(),
    timeRemaining: getTimeRemaining(),
    timeString: currentTime.toLocaleTimeString('es-CO', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    dateString: currentTime.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    // Función para cambiar horarios si es necesario (para configuración)
    updateSchedule,
    // 🎯 Función de debug para iOS
    forceCheck
  };
};