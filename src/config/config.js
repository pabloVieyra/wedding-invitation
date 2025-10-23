const config = {
  data: {
    // Título principal de la invitación
    title: "Agus & Dani",
    // Mensaje inicial de la invitación
    description:
      "Nos casamos y queremos invitarte a celebrar este momento tan especial con nosotros.",
    // Nombre del novio
    groomName: "Agustín",
    // Nombre de la novia
    brideName: "Daniela",
    // Nombres de los padres del novio
    parentGroom: "Papá de Agus & Mamá de Agus",
    // Nombres de los padres de la novia
    parentBride: "Papá de Dani & Mamá de Dani",
    // Fecha de la boda
    date: "2026-02-16",
    // Enlace de Google Maps para la ubicación
    maps_url: "https://maps.app.goo.gl/BjfWpGruavzRbTJx5",
    // Código embed de Google Maps (puedes obtenerlo en Google Maps → Compartir → Insertar mapa)
    maps_embed:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1638.3143778387077!2d-58.3415542!3d-34.7901201!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32d004afd2225%3A0xa56c3646b9d586c3!2sLa%20mezquina%20casa%20quinta!5e0!3m2!1ses-419!2sar!4v1760755299950!5m2!1ses-419!2sarr",
    // Horario del evento
    time: "20:00 - 06:00 hs",
    // Lugar del evento
    location: "La Mezquina Casa Quinta",
    // Dirección completa
    address: "La Mezquina Casa Quinta",
    // Número de contacto del lugar
    phone: "01139336783",
    // Imagen que aparece al compartir el enlace en redes sociales
    ogImage: "/images/og-image.jpg",
    // Ícono de la pestaña del navegador
    favicon: "/images/favicon.ico",
    // Agenda del día
    agenda: [
      {
        title: "Ceremonia",
        date: "2026-02-16",
        startTime: "20:00",
        endTime: "06:00",
        location: "La Mezquina Casa Quinta",
        address: "La Mezquina Casa Quinta",
      },
    ],
    // Música de fondo
    audio: {
      src: "/audio/AllOfMe.mp3",
      title: "John Legend - All of Me",
      autoplay: true,
      loop: true,
    },
    // Cuentas bancarias para regalos
    banks: [
      {
        bank: "Naranja X",
        accountNumber: "PACHECOYAGUIRRE",
        accountName: "Agustin Eugenio Pacheco",
      },
    ],
  },
};

export default config;
