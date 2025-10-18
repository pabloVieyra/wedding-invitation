/**
 * Formats a date string into Spanish format
 * @param {string} isoString - The ISO date string to format
 * @param {('full'|'short'|'time')} [format='full'] - The format type to use
 * @returns {string} The formatted date string in Spanish
 *
 * @example
 * // returns "Lunes, 1 de Enero de 2024"
 * formatEventDate("2024-01-01T00:00:00.000Z", "full")
 *
 * // returns "1 de Enero de 2024"
 * formatEventDate("2024-01-01T00:00:00.000Z", "short")
 *
 * // returns "00:00"
 * formatEventDate("2024-01-01T00:00:00.000Z", "time")
 */
export const formatEventDate = (isoString, format = "full") => {
  const date = new Date(isoString);

  const formats = {
    full: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Argentina/Buenos_Aires",
    },
    short: {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "America/Argentina/Buenos_Aires",
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Argentina/Buenos_Aires",
    },
  };

  // Nombres de meses en español
  const monthsSpanish = {
    January: "Enero",
    February: "Febrero",
    March: "Marzo",
    April: "Abril",
    May: "Mayo",
    June: "Junio",
    July: "Julio",
    August: "Agosto",
    September: "Septiembre",
    October: "Octubre",
    November: "Noviembre",
    December: "Diciembre",
  };

  // Nombres de días en español
  const daysSpanish = {
    Sunday: "Domingo",
    Monday: "Lunes",
    Tuesday: "Martes",
    Wednesday: "Miércoles",
    Thursday: "Jueves",
    Friday: "Viernes",
    Saturday: "Sábado",
  };

  let formatted = date.toLocaleDateString("en-US", formats[format]);

  // Handle time format separately
  if (format === "time") {
    return date.toLocaleTimeString("en-US", formats[format]);
  }

  // Replace English month and day names with Spanish ones
  Object.keys(monthsSpanish).forEach((english) => {
    formatted = formatted.replace(english, monthsSpanish[english]);
  });

  Object.keys(daysSpanish).forEach((english) => {
    formatted = formatted.replace(english, daysSpanish[english]);
  });

  // Format adjustment for full date
  if (format === "full") {
    // Convert "Día, Tanggal de Mes de Año" format
    const parts = formatted.split(", ");
    if (parts.length === 2) {
      formatted = `${parts[0]}, ${parts[1]}`;
    }
  }

  return formatted;
};
