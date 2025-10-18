const hoteles = [
  {
    id: 1,
    nombre: "Four Seasons Hotel",
    descripcion:
      "Lujoso hotel de 5 estrellas ubicado en el corazón de Buenos Aires. Ofrece elegantes habitaciones con vistas a la ciudad, spa de clase mundial, restaurantes gourmet y servicio personalizado de primer nivel.",
    ubicacion: "Buenos Aires, Argentina",
    puntaje: 9.2,
    precio: 1580000,
    imagen: "/images/sheratonsalta.jpg",
  },
  {
    id: 2,
    nombre: "Cordoba Center Hotel",
    descripcion:
      "Hotel moderno y cómodo en el centro de Córdoba, ideal para viajeros de negocios y turismo. Cuenta con amplias habitaciones, centro de fitness, sala de conferencias y fácil acceso a los principales atractivos de la ciudad.",
    ubicacion: "Cordoba, Argentina",
    puntaje: 8.8,
    precio: 247000,
    imagen: "/images/cordobacenter.jpg",
  },
  {
    id: 3,
    nombre: "Sheraton Salta Hotel",
    descripcion:
      "Elegante hotel en la hermosa ciudad de Salta, puerta de entrada al noroeste argentino. Ofrece habitaciones confortables, restaurante con cocina regional, piscina y ubicación privilegiada para explorar los paisajes y cultura del norte.",
    ubicacion: "Salta, Argentina",
    puntaje: 8.7,
    precio: 120000,
    imagen: "/images/sheratonsalta.jpg",
  },
  {
    id: 4,
    nombre: "Hotel Bariloche Sky",
    descripcion:
      "Acogedor hotel boutique en San Carlos de Bariloche con espectaculares vistas al lago Nahuel Huapi y la cordillera. Perfecto para disfrutar de la naturaleza patagónica, actividades al aire libre y la famosa gastronomía de la región.",
    ubicacion: "Bariloche, Argentina",
    puntaje: 9.2,
    precio: 120500,
    imagen: "/images/skybariloche.jpg",
  },
  {
    id: 5,
    nombre: "Hotel Catedral Bariloche",
    descripcion:
      "Ubicado al pie del Cerro Catedral, este hotel combina el confort moderno con el encanto de montaña. Ideal para esquiadores y amantes del paisaje patagónico.",
    ubicacion: "Bariloche, Argentina",
    puntaje: 9.0,
    precio: 98000,
    imagen: "/images/catedralbariloche.jpg",
  },
  {
    id: 6,
    nombre: "Llao Llao Resort & Spa",
    descripcion:
      "Emblemático resort 5 estrellas rodeado de lagos y montañas en Bariloche. Ofrece golf, spa, piscina climatizada y experiencias gastronómicas únicas.",
    ubicacion: "Bariloche, Argentina",
    puntaje: 9.6,
    precio: 320000,
    imagen: "/images/llaollao.jpg",
  },
  {
    id: 7,
    nombre: "Alvear Palace Hotel",
    descripcion:
      "Símbolo del lujo porteño en la Recoleta, Buenos Aires. Con arquitectura francesa, servicio distinguido y gastronomía de alto nivel.",
    ubicacion: "Buenos Aires, Argentina",
    puntaje: 9.5,
    precio: 980000,
    imagen: "/images/alvearpalace.jpg",
  },
  {
    id: 8,
    nombre: "NH Collection Buenos Aires",
    descripcion:
      "Hotel contemporáneo en el microcentro porteño, ideal para negocios y turismo. Habitaciones modernas y desayuno gourmet incluido.",
    ubicacion: "Buenos Aires, Argentina",
    puntaje: 8.9,
    precio: 310000,
    imagen: "/images/llaollao.jpg",
  },
  {
    id: 9,
    nombre: "Hotel Le Meurice",
    descripcion:
      "Histórico hotel 5 estrellas en el corazón de París, frente a los Jardines de las Tullerías. Con arte, gastronomía y lujo parisino.",
    ubicacion: "París, Francia",
    puntaje: 9.7,
    precio: 2250000,
    imagen: "/images/lemeurice.jpg",
  },
  {
    id: 10,
    nombre: "Hôtel Eiffel Trocadéro",
    descripcion:
      "Romántico hotel boutique ecológico con vistas a la Torre Eiffel. Perfecto para parejas que buscan encanto y sostenibilidad.",
    ubicacion: "París, Francia",
    puntaje: 9.1,
    precio: 880000,
    imagen: "/images/trocadero.jpg",
  },
  {
    id: 11,
    nombre: "Pullman Paris Tour Eiffel",
    descripcion:
      "Moderno hotel junto a la Torre Eiffel con amplias habitaciones, gimnasio y restaurante panorámico. Ideal para viajes de placer o negocios.",
    ubicacion: "París, Francia",
    puntaje: 9.0,
    precio: 1250000,
    imagen: "/images/pullman.jpg",
  },
  {
    id: 12,
    nombre: "Hotel Roma Imperial",
    descripcion:
      "Situado a metros del Coliseo, ofrece lujo clásico italiano, restaurante con cocina mediterránea y vistas a monumentos históricos.",
    ubicacion: "Roma, Italia",
    puntaje: 9.3,
    precio: 1420000,
    imagen: "/images/roma1.jpg",
  },
  {
    id: 13,
    nombre: "Hotel Navona Palace",
    descripcion:
      "Encantador hotel en el corazón de Roma, cerca de Piazza Navona. Habitaciones elegantes, spa y desayuno continental.",
    ubicacion: "Roma, Italia",
    puntaje: 8.8,
    precio: 860000,
    imagen: "/images/roma2.jpg",
  },
  {
    id: 14,
    nombre: "The St. Regis Rome",
    descripcion:
      "Icono del lujo romano con elegancia neoclásica. Ofrece un servicio impecable, spa, restaurante gourmet y bar de cócteles exclusivo.",
    ubicacion: "Roma, Italia",
    puntaje: 9.6,
    precio: 2150000,
    imagen: "/images/roma3.jpg",
  },
  {
    id: 15,
    nombre: "Hotel Intercontinental Madrid",
    descripcion:
      "Clásico hotel de lujo en el Paseo de la Castellana. Habitaciones amplias, gastronomía española y atención de primer nivel.",
    ubicacion: "Madrid, España",
    puntaje: 9.2,
    precio: 980000,
    imagen: "/images/madrid1.jpg",
  },
  {
    id: 16,
    nombre: "Gran Meliá Madrid Princesa",
    descripcion:
      "Moderno hotel urbano con spa, piscina y vistas a la ciudad. A pocos pasos del Palacio Real y la Gran Vía.",
    ubicacion: "Madrid, España",
    puntaje: 8.9,
    precio: 720000,
    imagen: "/images/madrid2.jpg",
  },
  {
    id: 17,
    nombre: "Hotel Patagonia Sur",
    descripcion:
      "Encantador alojamiento en el centro de Ushuaia con vistas al Canal Beagle. Ideal para explorar la naturaleza del fin del mundo.",
    ubicacion: "Ushuaia, Argentina",
    puntaje: 9.0,
    precio: 210000,
    imagen: "/images/sheratonsalta.jpg",
  },
  {
    id: 18,
    nombre: "Marriott Santiago",
    descripcion:
      "Hotel de lujo en Las Condes con piscina exterior, gimnasio y espectaculares vistas a la Cordillera de los Andes.",
    ubicacion: "Santiago, Chile",
    puntaje: 9.1,
    precio: 680000,
    imagen: "/images/skybariloche.jpg",
  },
  {
    id: 19,
    nombre: "W Santiago Hotel",
    descripcion:
      "Hotel moderno y sofisticado con rooftop bar y diseño vanguardista. Popular entre viajeros de negocios y estilo de vida.",
    ubicacion: "Santiago, Chile",
    puntaje: 9.3,
    precio: 890000,
    imagen: "/images/catedralbariloche.jpg",
  },
  {
    id: 20,
    nombre: "Hotel Cusco Andino",
    descripcion:
      "Hotel con encanto colonial en el centro de Cusco. Habitaciones decoradas con arte local y desayuno tradicional peruano.",
    ubicacion: "Cusco, Perú",
    puntaje: 9.0,
    precio: 350000,
    imagen: "/images/llaollao.jpg",
  },
];

export { hoteles };