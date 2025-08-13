// src/config/scheduleConfig.js
// 🕐 CONFIGURACIÓN DE HORARIOS DEL SISTEMA QR

const SCHEDULE_CONFIG = {
  // ⏰ Horario de operación (formato 24 horas)
  START_HOUR: 8,    // 8:00 AM
  END_HOUR: 15,     // 3:00 PM (15:00 en formato 24h)
  
  // 🌎 Zona horaria
  TIMEZONE: 'America/Bogota',
  
  // 📅 Días de operación (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
  ACTIVE_DAYS: [1, 2, 3, 4, 5], // Lunes a Viernes
  
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
      description: 'Los formularios están disponibles de 8:00 AM a 3:00 PM\n(Hora de Bogotá, Colombia)'
    },
    DOWNLOAD_RESTRICTED: 'Descarga no disponible fuera de horario',
    QR_RESTRICTED: 'Fuera de horario - Clic para ver información'
  }
};

// 🛠️ FUNCIONES AUXILIARES (NO MODIFICAR)

/**
 * Verifica si el día actual está en los días activos
 * @param {Date} date - Fecha a verificar
 * @returns {boolean} - True si es un día activo
 */
const isActiveDay = (date) => {
  const dayOfWeek = date.getDay();
  return SCHEDULE_CONFIG.ACTIVE_DAYS.includes(dayOfWeek);
};

/**
 * Obtiene la próxima fecha/hora disponible
 * @param {Date} currentDate - Fecha actual
 * @returns {object} - Información del próximo horario
 */
const getNextAvailableTime = (currentDate) => {
  const { START_HOUR, ACTIVE_DAYS, TIMEZONE } = SCHEDULE_CONFIG;
  
  const bogotaTime = new Date(currentDate.toLocaleString("en-US", {
    timeZone: TIMEZONE
  }));
  
  const currentHour = bogotaTime.getHours();
  const currentDay = bogotaTime.getDay();
  
  // Si es un día activo y antes de la hora de inicio
  if (ACTIVE_DAYS.includes(currentDay) && currentHour < START_HOUR) {
    return {
      nextAvailable: `Hoy a las ${START_HOUR}:00`,
      hoursUntil: START_HOUR - currentHour,
      isToday: true
    };
  }
  
  // Buscar el próximo día activo
  let daysUntilNext = 1;
  let nextDay = (currentDay + 1) % 7;
  
  while (!ACTIVE_DAYS.includes(nextDay) && daysUntilNext < 7) {
    daysUntilNext++;
    nextDay = (nextDay + 1) % 7;
  }
  
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const nextDayName = daysUntilNext === 1 ? 'Mañana' : dayNames[nextDay];
  
  return {
    nextAvailable: `${nextDayName} a las ${START_HOUR}:00`,
    hoursUntil: daysUntilNext * 24 + (START_HOUR - currentHour),
    isToday: false,
    daysUntil: daysUntilNext
  };
};

/**
 * Formatea el horario para mostrar
 * @returns {string} - Horario formateado
 */
const getScheduleDisplayText = () => {
  const { START_HOUR, END_HOUR, ACTIVE_DAYS } = SCHEDULE_CONFIG;
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const activeDaysText = ACTIVE_DAYS.map(day => dayNames[day]).join(', ');
  
  const startTime = START_HOUR === 12 ? '12:00 PM' : START_HOUR > 12 ? `${START_HOUR - 12}:00 PM` : `${START_HOUR}:00 AM`;
  const endTime = END_HOUR === 12 ? '12:00 PM' : END_HOUR > 12 ? `${END_HOUR - 12}:00 PM` : `${END_HOUR}:00 AM`;
  
  return `${activeDaysText}: ${startTime} - ${endTime}`;
};

// ✅ CRITICAL: Use NAMED EXPORTS for everything
export { SCHEDULE_CONFIG, isActiveDay, getNextAvailableTime, getScheduleDisplayText };

// ✅ ALSO provide as default export
export default SCHEDULE_CONFIG;