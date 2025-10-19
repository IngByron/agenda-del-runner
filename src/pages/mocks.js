// mocks.js Datos de Prueba

export const organizadores = {
  org1: {
    nombre: "Club Deportivo Central",
    descripcion: "Organización deportiva que promueve eventos de running y actividades físicas.",
    telefono: "+34123456789",
    email: "contacto@cdc.com",
    paginaWeb: "https://cdc.com",
    redes: {
      facebook: "cdcFacebook",
      instagram: "cdcInstagram",
      twitter: "cdcTwitter"
    },
    logoUrl: "https://cdn.cdc.com/logo.png"
  },
  org2: {
    nombre: "Asociación de Corredores Nocturnos",
    descripcion: "Grupo que organiza carreras nocturnas y actividades de trail running.",
    telefono: "+34987654321",
    email: "info@acn.com",
    paginaWeb: "https://acn.com",
    redes: {
      facebook: "acnFacebook",
      instagram: "acnInstagram"
    },
    logoUrl: ""
  }
};

export const eventos = {
  evento1: {
    nombre: "Maratón de Ciudad Central",
    descripcion: "Evento anual con recorrido urbano de 42K, abierto a corredores profesionales y amateurs.",
    fecha: "2025-10-20",
    hora: "08:00",
    lugar: "Parque Principal",
    ciudad: "Guayaquil",
    categoria: "running",
    distancia: ["42k"],
    organizadorId: "org1",
    precio: 30,
    urlInscripcion: "https://cdc.com/inscripcion"
  },
  evento2: {
    nombre: "Carrera 10K Nocturna",
    descripcion: "Carrera nocturna en el centro de la ciudad con luces LED para todos los participantes.",
    fecha: "2025-10-25",
    hora: "20:00",
    lugar: "Zona Histórica",
    ciudad: "Ciudad Central",
    categoria: "running",
    distancia: ["10k"],
    organizadorId: "org2",
    precio: 15,
    urlInscripcion: "https://acn.com/inscripcion"
  },
  evento3: {
    nombre: "Trail Running Montañas del Sur",
    descripcion: "Ruta técnica de trail running en montaña con opciones de 15K y 30K.",
    fecha: "2025-11-02",
    hora: "07:00",
    lugar: "Montañas del Sur",
    ciudad: "Ciudad Sur",
    categoria: "trail",
    distancia: ["15k", "30k"],
    organizadorId: "org2",
    precio: 25,
    urlInscripcion: "https://acn.com/trail-inscripcion"
  },
  evento4: {
    nombre: "Carrera Infantil",
    descripcion: "Carreras cortas para niños con varias distancias disponibles.",
    fecha: "2025-10-20",
    hora: "09:30",
    lugar: "Parque Principal",
    ciudad: "Ciudad Central",
    categoria: "running",
    distancia: ["200m", "400m", "800m"],
    organizadorId: "org1",
    precio: 0,
    urlInscripcion: ""
  }
};
