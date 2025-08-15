// src/config/scheduleConfig.js
// 🕐 CONFIGURACIÓN DE HORARIOS DEL SISTEMA QR - ACTUALIZADA 24/7

const SCHEDULE_CONFIG = {
  // ⏰ Horario de operación (formato 24 horas)
  START_HOUR: 1,    // 1:00 AM
  END_HOUR: 23,     // 11:00 PM (23:00 en formato 24h)
  
  // 🌎 Zona horaria
  TIMEZONE: 'America/Bogota',
  
  // 📅 Días de operación (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
  // 🔥 AHORA 24/7: Todos los días de la semana
  ACTIVE_DAYS: [0, 1, 2, 3, 4, 5, 6], // Domingo a Sábado (24/7)
  
  // ⚙️ Configuraciones adicionales
  CHECK_INTERVAL_SECONDS: 30, // Cada cuántos segundos verificar el horario
  TIMEZONE_DISPLAY_NAME: 'Bogotá, Colombia',
  
  // 📝 Mensajes personalizables
  MESSAGES: {
    ACTIVE_TITLE: '🟢 SISTEMA ACTIVO',
    INACTIVE_TITLE: '🔴 SISTEMA INACTIVO',
    ACTIVE_DESCRIPTION: 'Todos los códigos QR están funcionando correctamente',
    INACTIVE_DESCRIPTION: 'Fuera de horario de atención',
    OUT_OF_SCHEDULE_ALERT: {
      title: 'FUERA DE HORARIO',
      description: 'Los formularios están disponibles de 1:00 AM a 11:00 PM\n(Hora de Bogotá, Colombia)'
    },
    DOWNLOAD_RESTRICTED: 'Descarga no disponible fuera de horario',
    QR_RESTRICTED: 'Fuera de horario - Clic para ver información'
  }
};

// 🛠️ FUNCIONES AUXILIARES CON FIXES PARA iOS/SAFARI

/**
 * 🍎 FIX PARA iOS: Función mejorada para obtener hora de Bogotá
 * Safari en iOS tiene problemas con toLocaleString y zonas horarias
 * @param {Date} date - Fecha a convertir
 * @returns {Date} - Fecha ajustada a Bogotá
 */
const getBogotaTime = (date = new Date()) => {
  try {
    // Método 1: Intenta usar toLocaleString (funciona en la mayoría de dispositivos)
    const bogotaTimeString = date.toLocaleString("en-US", {
      timeZone: SCHEDULE_CONFIG.TIMEZONE
    });
    const bogotaTime = new Date(bogotaTimeString);
    
    // Verificar si el resultado es válido
    if (!isNaN(bogotaTime.getTime())) {
      return bogotaTime;
    }
  } catch (error) {
    console.warn('⚠️ Método toLocaleString falló, usando cálculo manual para iOS:', error);
  }
  
  // Método 2: FALLBACK para iOS/Safari - Cálculo manual UTC-5
  const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
  const bogotaOffset = -5; // Bogotá es UTC-5
  const bogotaTime = new Date(utcTime + (bogotaOffset * 3600000));
  
  console.log(`🍎 iOS Fix - UTC: ${date.toISOString()}, Bogotá calculada: ${bogotaTime.toISOString()}`);
  return bogotaTime;
};

/**
 * Verifica si el día actual está en los días activos
 * @param {Date} date - Fecha a verificar
 * @returns {boolean} - True si es un día activo
 */
const isActiveDay = (date) => {
  const bogotaTime = getBogotaTime(date);
  const dayOfWeek = bogotaTime.getDay();
  const isActive = SCHEDULE_CONFIG.ACTIVE_DAYS.includes(dayOfWeek);
  
  console.log(`📅 Día verificado: ${dayOfWeek} (${['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'][dayOfWeek]}) - Activo: ${isActive}`);
  return isActive;
};

/**
 * 🔥 FUNCIÓN PRINCIPAL MEJORADA PARA VERIFICAR SI ESTÁ ACTIVO
 * Con debug específico para iOS
 * @param {Date} currentDate - Fecha actual
 * @returns {boolean} - True si está activo
 */
const isSystemActive = (currentDate = new Date()) => {
  try {
    const bogotaTime = getBogotaTime(currentDate);
    const hour = bogotaTime.getHours();
    const minutes = bogotaTime.getMinutes();
    const currentTimeInMinutes = hour * 60 + minutes;
    
    // Verificar si es un día activo (ahora 24/7, pero mantenemos la verificación)
    const isDayActive = isActiveDay(currentDate);
    
    // Horario configurado
    const startTimeInMinutes = SCHEDULE_CONFIG.START_HOUR * 60;
    const endTimeInMinutes = SCHEDULE_CONFIG.END_HOUR * 60;
    
    // Verificar si estamos dentro del horario permitido Y en un día activo
    const isInTimeRange = currentTimeInMinutes >= startTimeInMinutes && 
                         currentTimeInMinutes < endTimeInMinutes;
    const isActive = isDayActive && isInTimeRange;
    
    // 🔍 DEBUG DETALLADO PARA iOS
    const debugInfo = {
      userAgent: navigator.userAgent,
      isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
      isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
      originalTime: currentDate.toISOString(),
      bogotaTime: bogotaTime.toISOString(),
      hour: hour,
      minutes: minutes,
      currentTimeInMinutes: currentTimeInMinutes,
      startTime: `${SCHEDULE_CONFIG.START_HOUR}:00 (${startTimeInMinutes} min)`,
      endTime: `${SCHEDULE_CONFIG.END_HOUR}:00 (${endTimeInMinutes} min)`,
      isDayActive: isDayActive,
      isInTimeRange: isInTimeRange,
      finalResult: isActive
    };
    
    console.log('🔍 DEBUG HORARIO SISTEMA:', debugInfo);
    
    // Mensaje específico para iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      console.log(`🍎 iOS DETECTADO - Hora: ${hour}:${minutes.toString().padStart(2, '0')} | Activo: ${isActive ? '✅' : '❌'}`);
    }
    
    return isActive;
    
  } catch (error) {
    console.error('❌ Error verificando horario:', error);
    // En caso de error, por seguridad ponemos como inactivo
    return false;
  }
};

/**
 * Obtiene la próxima fecha/hora disponible
 * @param {Date} currentDate - Fecha actual
 * @returns {object} - Información del próximo horario
 */
const getNextAvailableTime = (currentDate) => {
  const { START_HOUR, ACTIVE_DAYS } = SCHEDULE_CONFIG;
  
  const bogotaTime = getBogotaTime(currentDate);
  const currentHour = bogotaTime.getHours();
  const currentDay = bogotaTime.getDay();
  
  // Como ahora es 24/7, solo verificamos si estamos antes de la hora de inicio del día actual
  if (ACTIVE_DAYS.includes(currentDay) && currentHour < START_HOUR) {
    return {
      nextAvailable: `Hoy a las ${START_HOUR}:00`,
      hoursUntil: START_HOUR - currentHour,
      isToday: true
    };
  }
  
  // Si estamos en horario nocturno (después de las 11 PM), el próximo es mañana a la 1 AM
  if (currentHour >= SCHEDULE_CONFIG.END_HOUR) {
    return {
      nextAvailable: `Mañana a las ${START_HOUR}:00`,
      hoursUntil: (24 - currentHour) + START_HOUR,
      isToday: false,
      daysUntil: 1
    };
  }
  
  // Fallback: mañana a la hora de inicio
  return {
    nextAvailable: `Mañana a las ${START_HOUR}:00`,
    hoursUntil: (24 - currentHour) + START_HOUR,
    isToday: false,
    daysUntil: 1
  };
};

/**
 * Formatea el horario para mostrar
 * @returns {string} - Horario formateado
 */
const getScheduleDisplayText = () => {
  const { START_HOUR, END_HOUR } = SCHEDULE_CONFIG;
  
  // Como es 24/7, mostramos todos los días
  const activeDaysText = 'Todos los días';
  
  const startTime = START_HOUR === 12 ? '12:00 PM' : 
                   START_HOUR === 0 ? '12:00 AM' :
                   START_HOUR > 12 ? `${START_HOUR - 12}:00 PM` : 
                   `${START_HOUR}:00 AM`;
                   
  const endTime = END_HOUR === 12 ? '12:00 PM' : 
                 END_HOUR === 0 ? '12:00 AM' :
                 END_HOUR > 12 ? `${END_HOUR - 12}:00 PM` : 
                 `${END_HOUR}:00 AM`;
  
  return `${activeDaysText}: ${startTime} - ${endTime}`;
};

// ✅ EXPORTS MEJORADOS
export { 
  SCHEDULE_CONFIG, 
  isActiveDay, 
  getNextAvailableTime, 
  getScheduleDisplayText,
  getBogotaTime,
  isSystemActive
};

// ✅ ALSO provide as default export
export default SCHEDULE_CONFIG;