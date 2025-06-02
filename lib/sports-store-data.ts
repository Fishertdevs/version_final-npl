// Base de conocimiento específica para tienda deportiva
export interface SportsProduct {
  name: string
  category: string
  price: number
  stock: number
  brand: string
  description: string
  features: string[]
}

export interface SportsKnowledgeBase {
  products: SportsProduct[]
  categories: string[]
  brands: string[]
  services: string[]
  locations: string[]
}

// Base de conocimiento de la tienda deportiva
export const sportsStoreKB: SportsKnowledgeBase = {
  products: [
    {
      name: "zapatillas running",
      category: "calzado",
      price: 120000,
      stock: 15,
      brand: "Nike",
      description: "Zapatillas para correr con tecnología de amortiguación",
      features: ["amortiguación", "transpirable", "ligeras"],
    },
    {
      name: "balón fútbol",
      category: "deportes",
      price: 45000,
      stock: 8,
      brand: "Adidas",
      description: "Balón oficial de fútbol profesional",
      features: ["cuero sintético", "oficial", "resistente"],
    },
    {
      name: "raqueta tenis",
      category: "deportes",
      price: 180000,
      stock: 5,
      brand: "Wilson",
      description: "Raqueta profesional de tenis",
      features: ["fibra de carbono", "profesional", "ligera"],
    },
    {
      name: "camiseta deportiva",
      category: "ropa",
      price: 35000,
      stock: 25,
      brand: "Puma",
      description: "Camiseta deportiva transpirable",
      features: ["transpirable", "secado rápido", "cómoda"],
    },
    {
      name: "bicicleta montaña",
      category: "ciclismo",
      price: 850000,
      stock: 3,
      brand: "Trek",
      description: "Bicicleta de montaña profesional",
      features: ["suspensión", "21 velocidades", "todo terreno"],
    },
    {
      name: "guantes boxeo",
      category: "deportes",
      price: 65000,
      stock: 12,
      brand: "Everlast",
      description: "Guantes profesionales de boxeo",
      features: ["cuero genuino", "acolchado", "profesional"],
    },
    {
      name: "pelota básquet",
      category: "deportes",
      price: 55000,
      stock: 10,
      brand: "Spalding",
      description: "Pelota oficial de básquetbol",
      features: ["cuero sintético", "oficial", "grip superior"],
    },
    {
      name: "short deportivo",
      category: "ropa",
      price: 28000,
      stock: 20,
      brand: "Under Armour",
      description: "Short deportivo para entrenamiento",
      features: ["elástico", "transpirable", "cómodo"],
    },
  ],
  categories: ["calzado", "ropa", "deportes", "ciclismo", "accesorios"],
  brands: ["Nike", "Adidas", "Puma", "Wilson", "Trek", "Everlast", "Spalding", "Under Armour"],
  services: ["entrega domicilio", "garantía", "cambios", "devoluciones", "asesoría deportiva"],
  locations: ["centro comercial", "sucursal norte", "sucursal sur", "tienda online"],
}

// 10 preguntas predefinidas para la tienda deportiva
export const sportsStoreQuestions = [
  "¿Cuánto cuestan las zapatillas de running?",
  "¿Qué productos de Nike tienen disponibles?",
  "¿Tienen balones de fútbol en stock?",
  "¿Cuál es el precio de la raqueta de tenis?",
  "¿Qué marcas de ropa deportiva manejan?",
  "¿Cuántas bicicletas de montaña tienen disponibles?",
  "¿Los guantes de boxeo son de cuero genuino?",
  "¿Hacen entregas a domicilio?",
  "¿Qué garantía ofrecen en los productos?",
  "¿Dónde están ubicadas las sucursales?",
]

// Preposiciones para almacenar en archivo .txt
export const prepositions = [
  "a",
  "ante",
  "bajo",
  "con",
  "contra",
  "de",
  "desde",
  "durante",
  "en",
  "entre",
  "hacia",
  "hasta",
  "mediante",
  "para",
  "por",
  "según",
  "sin",
  "sobre",
  "tras",
]

// Tabla de símbolos para almacenar en archivo .txt
export const symbolTable = {
  categorias_lexicas: {
    sustantivo: ["producto", "precio", "marca", "tienda", "cliente"],
    verbo: ["tener", "costar", "vender", "comprar", "entregar"],
    adjetivo: ["deportivo", "profesional", "cómodo", "resistente"],
    adverbio: ["rápidamente", "cómodamente", "profesionalmente"],
    determinante: ["el", "la", "los", "las", "un", "una"],
    preposicion: prepositions,
    pronombre: ["qué", "cuál", "cuánto", "dónde", "cómo"],
  },
  funciones_gramaticales: {
    sujeto: "entidad que realiza la acción",
    predicado: "acción o estado del sujeto",
    objeto_directo: "entidad que recibe la acción",
    complemento_circunstancial: "información adicional sobre la acción",
  },
}

// Función mejorada para generar respuesta automática más humana y coherente
export function generateAutomaticResponse(question: string, kb: SportsKnowledgeBase): string {
  const cleanQuestion = preprocessQuestion(question)
  const tokens = cleanQuestion.split(" ")

  // Análisis más sofisticado de la intención de la pregunta
  const questionAnalysis = analyzeQuestionIntent(tokens, question)

  // Generar respuesta basada en el análisis semántico con alta variabilidad
  return generateHumanLikeResponse(questionAnalysis, kb, question)
}

// Nueva función para analizar la intención de la pregunta
function analyzeQuestionIntent(tokens: string[], originalQuestion: string) {
  const analysis = {
    type: "unknown",
    products: [] as string[],
    brands: [] as string[],
    attributes: [] as string[],
    priceQuery: false,
    stockQuery: false,
    locationQuery: false,
    serviceQuery: false,
    deliveryQuery: false,
    comparisonQuery: false,
    recommendationQuery: false,
    originalQuestion: originalQuestion.toLowerCase(),
  }

  // Detectar tipo de pregunta
  if (tokens.includes("cuanto") || tokens.includes("precio") || tokens.includes("cuesta") || tokens.includes("vale")) {
    analysis.type = "price"
    analysis.priceQuery = true
  } else if (
    tokens.includes("tienen") ||
    tokens.includes("stock") ||
    tokens.includes("disponible") ||
    tokens.includes("hay")
  ) {
    analysis.type = "stock"
    analysis.stockQuery = true
  } else if (
    tokens.includes("donde") ||
    tokens.includes("ubicacion") ||
    tokens.includes("sucursal") ||
    tokens.includes("tienda")
  ) {
    analysis.type = "location"
    analysis.locationQuery = true
  } else if (
    tokens.includes("garantia") ||
    tokens.includes("servicio") ||
    tokens.includes("cambio") ||
    tokens.includes("devolucion")
  ) {
    analysis.type = "service"
    analysis.serviceQuery = true
  } else if (tokens.includes("entrega") || tokens.includes("domicilio") || tokens.includes("envio")) {
    analysis.type = "delivery"
    analysis.deliveryQuery = true
  } else if (
    tokens.includes("mejor") ||
    tokens.includes("recomienda") ||
    tokens.includes("cual") ||
    tokens.includes("que")
  ) {
    analysis.type = "recommendation"
    analysis.recommendationQuery = true
  } else if (tokens.includes("diferencia") || tokens.includes("comparar") || tokens.includes("versus")) {
    analysis.type = "comparison"
    analysis.comparisonQuery = true
  }

  // Identificar productos mencionados
  const productKeywords = [
    "zapatillas",
    "zapatos",
    "tenis",
    "running",
    "correr",
    "balon",
    "pelota",
    "futbol",
    "soccer",
    "raqueta",
    "tenis",
    "camiseta",
    "playera",
    "jersey",
    "bicicleta",
    "bike",
    "ciclismo",
    "guantes",
    "boxeo",
    "basquet",
    "basketball",
    "short",
    "pantalon",
  ]

  productKeywords.forEach((keyword) => {
    if (tokens.includes(keyword) || originalQuestion.toLowerCase().includes(keyword)) {
      analysis.products.push(keyword)
    }
  })

  // Identificar marcas mencionadas
  const brands = ["nike", "adidas", "puma", "wilson", "trek", "everlast", "spalding", "under", "armour"]
  brands.forEach((brand) => {
    if (tokens.includes(brand) || originalQuestion.toLowerCase().includes(brand)) {
      analysis.brands.push(brand)
    }
  })

  // Identificar atributos
  const attributes = ["profesional", "calidad", "resistente", "comodo", "ligero", "transpirable", "oficial"]
  attributes.forEach((attr) => {
    if (tokens.includes(attr) || originalQuestion.toLowerCase().includes(attr)) {
      analysis.attributes.push(attr)
    }
  })

  return analysis
}

// Nueva función para generar respuestas más humanas con máxima variabilidad
function generateHumanLikeResponse(analysis: any, kb: SportsKnowledgeBase, originalQuestion: string): string {
  // Usar timestamp y números aleatorios para máxima variabilidad
  const timestamp = Date.now()
  const randomSeed1 = Math.floor(Math.random() * 1000000)
  const randomSeed2 = Math.floor(Math.random() * 1000000)
  const randomSeed3 = Math.floor(Math.random() * 1000000)

  // Combinar múltiples fuentes de aleatoriedad
  const combinedSeed = (timestamp + randomSeed1 + randomSeed2 + randomSeed3) % 1000000

  // Saludos completamente únicos y variados
  const greetings = [
    "¡Hola! Me da mucho gusto ayudarte.",
    "¡Excelente pregunta!",
    "Con mucho gusto te ayudo con esa información.",
    "¡Perfecto! Te puedo ayudar con eso.",
    "¡Qué bueno que preguntes!",
    "¡Claro que sí! Te asisto con eso.",
    "¡Genial! Déjame ayudarte.",
    "¡Por supuesto! Es un placer atenderte.",
    "¡Fantástica consulta!",
    "¡Me encanta poder ayudarte!",
    "¡Bienvenido a nuestra tienda deportiva!",
    "¡Qué alegría poder asistirte!",
    "¡Estupenda pregunta!",
    "¡Con todo el gusto del mundo!",
    "¡Perfecto timing para esa consulta!",
    "¡Justo lo que necesitabas saber!",
    "¡Excelente momento para preguntar!",
    "¡Qué buena elección de consulta!",
    "¡Me complace muchísimo ayudarte!",
    "¡Increíble pregunta!",
    "¡Súper! Te voy a ayudar.",
    "¡Maravilloso! Resolvamos eso.",
    "¡Fantástico! Vamos con esa info.",
    "¡Espectacular consulta!",
    "¡Qué emocionante poder ayudarte!",
    "¡Brillante pregunta!",
    "¡Estoy aquí para eso!",
    "¡Perfecto! Esa es mi especialidad.",
    "¡Qué gusto atender tu consulta!",
    "¡Excelente! Vamos a resolverlo.",
  ]

  // Cierres completamente únicos y variados
  const closings = [
    "¿Te puedo ayudar con algo más?",
    "¡Espero que esta información te sea útil!",
    "Si necesitas más detalles, no dudes en preguntar.",
    "¿Hay algo más en lo que te pueda asistir?",
    "¿Tienes alguna otra duda?",
    "¡Cualquier cosa más que necesites, aquí estoy!",
    "¿Te gustaría saber algo adicional?",
    "¡Espero haberte ayudado!",
    "¿Necesitas información sobre algún otro producto?",
    "¡Que tengas un excelente día deportivo!",
    "¿Alguna otra consulta deportiva?",
    "¡Siempre a tu disposición!",
    "¿Qué más puedo hacer por ti?",
    "¡Espero que encuentres exactamente lo que buscas!",
    "¿Te interesa conocer algo más de nuestros productos?",
    "¡Cualquier duda adicional, no dudes en consultarme!",
    "¿Hay algún otro tema deportivo que te interese?",
    "¡Que disfrutes mucho tu experiencia deportiva!",
    "¿Necesitas ayuda con alguna otra decisión?",
    "¡Estoy aquí para todas tus consultas deportivas!",
    "¿Te gustaría explorar otras opciones?",
    "¡Que tengas un día lleno de energía deportiva!",
    "¿Alguna pregunta adicional sobre nuestros servicios?",
    "¡Espero que esta info te ayude en tu decisión!",
    "¿Hay algo más que pueda aclarar para ti?",
    "¡Que disfrutes al máximo tu actividad deportiva!",
    "¿Te interesa conocer más sobre alguna marca específica?",
    "¡Siempre es un placer ayudar a deportistas como tú!",
    "¿Necesitas consejos sobre algún otro equipo deportivo?",
    "¡Que tengas muchísimo éxito en tus actividades!",
  ]

  // Seleccionar saludo y cierre únicos
  let response = greetings[combinedSeed % greetings.length] + " "

  // Generar contenido principal completamente único según el tipo
  switch (analysis.type) {
    case "price":
      response += handleAdvancedPriceQuery(analysis, kb, combinedSeed)
      break
    case "stock":
      response += handleAdvancedStockQuery(analysis, kb, combinedSeed)
      break
    case "location":
      response += handleAdvancedLocationQuery(analysis, kb, combinedSeed)
      break
    case "service":
      response += handleAdvancedServiceQuery(analysis, kb, combinedSeed)
      break
    case "delivery":
      response += handleAdvancedDeliveryQuery(analysis, kb, combinedSeed)
      break
    case "recommendation":
      response += handleRecommendationQuery(analysis, kb, combinedSeed)
      break
    case "comparison":
      response += handleComparisonQuery(analysis, kb, combinedSeed)
      break
    default:
      response += handleGeneralQuery(analysis, kb, originalQuestion, combinedSeed)
  }

  response += " " + closings[combinedSeed % closings.length]
  return response
}

// Actualizar todas las funciones para incluir máxima variabilidad
function handleAdvancedPriceQuery(analysis: any, kb: SportsKnowledgeBase, randomSeed: number): string {
  const priceVariations = [
    "El precio actual de",
    "En este momento, el costo de",
    "Te puedo confirmar que el valor de",
    "El precio de venta de",
    "Actualmente manejamos",
    "El valor comercial de",
    "Te informo que el precio de",
    "El costo vigente de",
    "Nuestro precio para",
    "La tarifa actual de",
    "El monto de",
    "Te cotizo",
    "El valor de mercado de",
    "Nuestro precio especial para",
    "La inversión requerida para",
    "El costo de adquisición de",
    "Te presento el precio de",
    "El valor de compra de",
    "Nuestro precio competitivo para",
    "La cantidad necesaria para",
  ]

  const promotionPhrases = [
    "¡Tenemos una promoción especial!",
    "¡Hay una oferta increíble!",
    "¡Aprovecha nuestro descuento!",
    "¡Oferta limitada!",
    "¡Precio especial por tiempo limitado!",
    "¡Descuento exclusivo disponible!",
    "¡Oportunidad única de ahorro!",
    "¡Promoción flash activa!",
    "¡Precio de lanzamiento!",
    "¡Oferta del día!",
    "¡Descuento por inauguración!",
    "¡Precio de temporada!",
    "¡Oferta especial para deportistas!",
    "¡Descuento por volumen!",
    "¡Precio de liquidación!",
    "¡Promoción de fin de semana!",
    "¡Oferta exclusiva online!",
    "¡Descuento por fidelidad!",
    "¡Precio de aniversario!",
    "¡Oferta irresistible!",
  ]

  // Buscar productos específicos mencionados
  for (const product of kb.products) {
    const productMatches = analysis.products.some(
      (p: string) => product.name.toLowerCase().includes(p) || p.includes(product.name.toLowerCase()),
    )

    if (productMatches) {
      // Generar descuento aleatorio único
      const discountChance = randomSeed % 5 // 20% de probabilidad
      const discount = discountChance === 0 ? Math.floor(Math.random() * 30) + 5 : 0
      const finalPrice = discount > 0 ? product.price * (1 - discount / 100) : product.price

      // Variaciones en el precio base (simulando fluctuaciones de mercado)
      const priceVariation = (randomSeed % 7) - 3 // -3% a +3%
      const adjustedPrice = Math.floor(product.price * (1 + priceVariation / 100))

      let response = `${priceVariations[randomSeed % priceVariations.length]} ${product.name} de la marca ${product.brand} es de $${adjustedPrice.toLocaleString()}.`

      if (discount > 0) {
        response += ` ${promotionPhrases[randomSeed % promotionPhrases.length]} Con un ${discount}% de descuento, te queda en $${Math.floor(finalPrice).toLocaleString()}.`
      }

      // Información adicional completamente variable
      const additionalInfoVariations = [
        ` Es ${product.description} y cuenta con características como: ${product.features.join(", ")}.`,
        ` Este producto se destaca por ${product.features[randomSeed % product.features.length]} y es ideal para deportistas ${randomSeed % 2 === 0 ? "principiantes" : "avanzados"}.`,
        ` Una excelente opción que incluye ${product.features.slice(0, 2).join(" y ")} para máximo rendimiento.`,
        ` Producto premium con ${product.features[randomSeed % product.features.length]} y garantía extendida.`,
        ` Diseño innovador que combina ${product.features.slice(-2).join(" y ")} para deportistas exigentes.`,
        ` Tecnología de punta con ${product.features.join(", ")} para resultados superiores.`,
        ` Calidad profesional que ofrece ${product.features[0]} y ${product.features[product.features.length - 1]}.`,
        ` Producto estrella con características únicas: ${product.features.reverse().join(", ")}.`,
        ` Innovación deportiva que incluye ${product.features.sort().join(", ")} para máximo confort.`,
        ` Tecnología avanzada con ${product.features.slice(1).join(", ")} y diseño ergonómico.`,
      ]

      response += additionalInfoVariations[randomSeed % additionalInfoVariations.length]

      // Información de stock variable
      if (product.stock < 5) {
        const urgencyPhrases = [
          ` Te recomiendo que no lo pienses mucho, solo nos quedan ${product.stock} unidades disponibles.`,
          ` ¡Últimas ${product.stock} unidades! Es muy popular entre nuestros clientes.`,
          ` Stock limitado: solo ${product.stock} unidades restantes en toda la ciudad.`,
          ` ¡Atención! Quedan únicamente ${product.stock} piezas de este modelo exclusivo.`,
          ` ¡Oportunidad única! Solo ${product.stock} unidades disponibles en inventario.`,
          ` ¡No te quedes sin el tuyo! Apenas ${product.stock} unidades en existencia.`,
          ` ¡Producto en alta demanda! Solo ${product.stock} unidades restantes.`,
          ` ¡Últimas oportunidades! Únicamente ${product.stock} piezas disponibles.`,
        ]
        response += urgencyPhrases[randomSeed % urgencyPhrases.length]
      } else {
        const stockPhrases = [
          ` Tenemos excelente disponibilidad con ${product.stock} unidades en stock.`,
          ` Contamos con ${product.stock} unidades disponibles para entrega inmediata.`,
          ` Stock abundante: ${product.stock} unidades listas para envío.`,
          ` Disponibilidad garantizada con ${product.stock} unidades en inventario.`,
          ` Excelente stock: ${product.stock} unidades disponibles en nuestras sucursales.`,
        ]
        response += stockPhrases[randomSeed % stockPhrases.length]
      }

      return response
    }
  }

  // Respuesta general completamente variable
  const avgPrice = Math.floor(kb.products.reduce((sum, p) => sum + p.price, 0) / kb.products.length)
  const priceVariation = (randomSeed % 10) - 5 // -5% a +5%
  const adjustedAvgPrice = Math.floor(avgPrice * (1 + priceVariation / 100))

  const generalResponses = [
    `Nuestros precios varían según la temporada y disponibilidad. Actualmente van desde $25,000 hasta $850,000, con un promedio de $${adjustedAvgPrice.toLocaleString()}. ¿Hay algún producto específico que te llame la atención?`,
    `Manejamos una gama completa para todos los presupuestos. Los precios oscilan entre $25,000 y $850,000, siendo $${adjustedAvgPrice.toLocaleString()} nuestro precio típico. ¿Qué categoría deportiva te interesa más?`,
    `Tenemos opciones para cada bolsillo y necesidad. Nuestro rango actual va de $25,000 a $850,000, con un promedio de $${adjustedAvgPrice.toLocaleString()}. ¿Te enfocas en algún deporte particular?`,
    `Los precios se ajustan según calidad y marca. Van desde $25,000 hasta $850,000, promediando $${adjustedAvgPrice.toLocaleString()}. ¿Buscas algo específico para tu entrenamiento?`,
    `Contamos con precios competitivos que van de $25,000 a $850,000. El precio medio es $${adjustedAvgPrice.toLocaleString()}. ¿Qué tipo de equipo deportivo necesitas?`,
  ]

  return generalResponses[randomSeed % generalResponses.length]
}

function handleAdvancedStockQuery(analysis: any, kb: SportsKnowledgeBase, randomSeed: number): string {
  const stockPhrases = {
    high: [
      "¡Excelente noticia! Tenemos muy buen stock de",
      "¡Perfecto! Contamos con buena disponibilidad de",
      "¡Genial! Tenemos suficiente inventario de",
      "¡Fantástico! Disponibilidad completa de",
      "¡Increíble! Stock abundante de",
      "¡Maravilloso! Inventario completo de",
      "¡Estupendo! Gran disponibilidad de",
      "¡Excelente! Amplio stock de",
      "¡Perfecto timing! Tenemos bastante",
      "¡Qué suerte! Stock completo de",
    ],
    low: [
      "Sí tenemos disponible, pero te recomiendo decidirte pronto porque solo nos quedan",
      "Está disponible, aunque el stock es limitado con solo",
      "Lo tenemos, pero es popular y solo quedan",
      "Disponible con stock reducido de apenas",
      "Sí hay, pero stock limitado con únicamente",
      "Tenemos, aunque quedan pocas unidades:",
      "Disponible pero con inventario bajo de solo",
      "Sí contamos, pero stock mínimo de",
      "Tenemos disponibilidad limitada con",
      "Sí hay existencias, pero solo",
    ],
    out: [
      "Lamentablemente se nos agotó",
      "Lo siento mucho, pero está temporalmente agotado",
      "Desafortunadamente no tenemos stock de",
      "Por el momento está agotado",
      "Temporalmente sin existencias de",
      "Actualmente agotado",
      "Sin disponibilidad momentánea de",
      "Stock agotado temporalmente de",
      "Fuera de inventario por ahora",
      "Momentáneamente sin stock de",
    ],
  }

  for (const product of kb.products) {
    const productMatches = analysis.products.some(
      (p: string) => product.name.toLowerCase().includes(p) || p.includes(product.name.toLowerCase()),
    )

    if (productMatches) {
      // Simular variaciones en el stock
      const stockVariation = (randomSeed % 5) - 2 // -2 a +2
      const adjustedStock = Math.max(0, product.stock + stockVariation)

      if (adjustedStock > 10) {
        const additionalInfo = [
          "así que puedes elegir tranquilamente tu talla o modelo preferido.",
          "perfecto para que selecciones exactamente lo que necesitas.",
          "ideal para que explores todas las opciones disponibles.",
          "excelente para que tomes tu tiempo en la decisión.",
          "genial para que compares diferentes modelos.",
          "fantástico para que elijas sin presión de tiempo.",
          "perfecto para una selección cuidadosa y detallada.",
          "ideal para explorar todas las variantes disponibles.",
          "excelente para una decisión informada y tranquila.",
          "genial para que evalúes todas las características.",
        ]
        return `${stockPhrases.high[randomSeed % stockPhrases.high.length]} ${product.name} ${product.brand}. Contamos con ${adjustedStock} unidades disponibles, ${additionalInfo[randomSeed % additionalInfo.length]}`
      } else if (adjustedStock > 0) {
        const popularityReasons = [
          "Es un producto muy popular y se agota rápido.",
          "Tiene alta demanda entre deportistas profesionales.",
          "Es uno de nuestros productos más solicitados.",
          "Los clientes lo prefieren por su calidad excepcional.",
          "Tiene excelentes reseñas y se vende mucho.",
          "Es tendencia entre los deportistas de la ciudad.",
          "Su relación calidad-precio lo hace muy demandado.",
          "Los atletas lo recomiendan constantemente.",
          "Es el favorito de nuestros clientes frecuentes.",
          "Su tecnología innovadora lo hace muy popular.",
        ]
        return `${stockPhrases.low[randomSeed % stockPhrases.low.length]} ${adjustedStock} unidades de ${product.name} ${product.brand}. ${popularityReasons[randomSeed % popularityReasons.length]}`
      } else {
        const similarProduct = kb.products.find((p) => p.category === product.category && p.stock > 0)
        if (similarProduct) {
          const alternativeDescriptions = [
            "pero tengo una excelente alternativa:",
            "sin embargo, te ofrezco una opción superior:",
            "pero puedo sugerirte algo aún mejor:",
            "no obstante, tengo una propuesta fantástica:",
            "pero hay una alternativa increíble:",
            "sin embargo, te presento una opción premium:",
            "pero tengo algo que te va a encantar:",
            "no obstante, hay una alternativa perfecta:",
            "pero puedo ofrecerte algo excepcional:",
            "sin embargo, tengo una sugerencia brillante:",
          ]
          return `${stockPhrases.out[randomSeed % stockPhrases.out.length]} ${product.name} ${product.brand}, ${alternativeDescriptions[randomSeed % alternativeDescriptions.length]} ${similarProduct.name} ${similarProduct.brand} por $${similarProduct.price.toLocaleString()}. Tiene características similares y está disponible.`
        }
        const restockOptions = [
          "Te puedo avisar cuando llegue nuevo stock o puedo recomendarte productos similares.",
          "Puedo notificarte cuando tengamos reposición o sugerirte alternativas.",
          "Te contacto cuando recibamos mercancía nueva o te muestro opciones parecidas.",
          "Te aviso cuando llegue el próximo embarque o exploramos otras opciones.",
          "Te notifico cuando tengamos restock o revisamos productos similares.",
          "Te informo cuando recibamos nueva mercancía o vemos alternativas.",
          "Te comunico cuando llegue inventario nuevo o analizamos otras opciones.",
          "Te actualizo cuando tengamos reposición o exploramos productos parecidos.",
        ]
        return `${stockPhrases.out[randomSeed % stockPhrases.out.length]} ${product.name} ${product.brand}. ${restockOptions[randomSeed % restockOptions.length]}`
      }
    }
  }

  const generalStockResponses = [
    "Tenemos excelente disponibilidad en la mayoría de nuestros productos deportivos. ¿Podrías especificar qué producto te interesa para darte información exacta del inventario?",
    "Nuestro inventario está bien surtido en todas las categorías. ¿Qué producto específico necesitas? Así te confirmo disponibilidad inmediata.",
    "Mantenemos buen stock en general para satisfacer la demanda. ¿Cuál es el artículo que buscas? Te verifico existencias al instante.",
    "Contamos con inventario actualizado en tiempo real. ¿Qué producto específico te interesa? Te doy información precisa de disponibilidad.",
    "Tenemos stock variado en todas nuestras líneas deportivas. ¿Podrías indicarme el producto exacto? Te confirmo existencias inmediatamente.",
  ]

  return generalStockResponses[randomSeed % generalStockResponses.length]
}

function handleAdvancedLocationQuery(analysis: any, kb: SportsKnowledgeBase, randomSeed: number): string {
  const locationIntros = [
    "Tenemos dos sucursales físicas para atenderte mejor:",
    "Contamos con dos puntos de venta estratégicamente ubicados:",
    "Puedes visitarnos en nuestras dos sucursales:",
    "Disponemos de dos locales comerciales para tu comodidad:",
    "Operamos en dos ubicaciones principales:",
    "Tenemos presencia en dos centros comerciales:",
    "Contamos con dos tiendas físicas:",
    "Disponemos de dos puntos de atención:",
    "Operamos desde dos ubicaciones estratégicas:",
    "Tenemos dos espacios comerciales:",
  ]

  // Generar horarios variables
  const scheduleVariations = [
    "Lunes a Sábado: 10:00 AM - 9:00 PM, Domingos: 11:00 AM - 7:00 PM",
    "Lunes a Sábado: 9:00 AM - 8:00 PM, Domingos: 10:00 AM - 6:00 PM",
    "Lunes a Viernes: 9:00 AM - 8:00 PM, Sábados: 9:00 AM - 9:00 PM, Domingos: 10:00 AM - 7:00 PM",
    "Lunes a Sábado: 8:30 AM - 8:30 PM, Domingos: 10:30 AM - 6:30 PM",
    "Lunes a Viernes: 10:00 AM - 8:00 PM, Fines de semana: 9:00 AM - 9:00 PM",
  ]

  const locations = [
    {
      name: "Sucursal Norte - Centro Comercial Plaza Mayor",
      address: "Carrera 15 #123-45, Piso 2, Local 201",
      hours: scheduleVariations[randomSeed % scheduleVariations.length],
      phone: "(601) 234-5678",
      specialties: "Especializada en calzado deportivo y ropa fitness",
    },
    {
      name: "Sucursal Sur - Centro Comercial Sur Plaza",
      address: "Avenida 68 #45-67, Piso 1, Local 105",
      hours: scheduleVariations[(randomSeed + 1) % scheduleVariations.length],
      phone: "(601) 345-6789",
      specialties: "Especializada en equipos deportivos y accesorios",
    },
  ]

  let response = locationIntros[randomSeed % locationIntros.length] + "\n\n"

  locations.forEach((location, index) => {
    response += `${index + 1}. **${location.name}**\n`
    response += `   📍 ${location.address}\n`
    response += `   🕒 ${location.hours}\n`
    response += `   📞 ${location.phone}\n`
    response += `   ⭐ ${location.specialties}\n\n`
  })

  const closingOptions = [
    "También puedes comprar en nuestra tienda online con entrega a domicilio en toda la ciudad. Ambas sucursales cuentan con parqueadero gratuito y fácil acceso en transporte público.",
    "Adicionalmente, ofrecemos compras online con delivery express. Las dos sucursales tienen estacionamiento sin costo y están perfectamente conectadas por transporte masivo.",
    "También manejamos ventas virtuales con envío a domicilio. Ambas ubicaciones tienen parqueadero gratuito y excelente acceso en transporte público.",
    "Igualmente, contamos con plataforma digital para compras online. Las sucursales incluyen estacionamiento gratuito y están bien ubicadas para transporte público.",
    "Además, disponemos de tienda virtual con servicio de entrega. Ambos locales ofrecen parqueadero sin costo y conexión directa con rutas de transporte.",
  ]

  response += closingOptions[randomSeed % closingOptions.length]
  return response
}

function handleAdvancedServiceQuery(analysis: any, kb: SportsKnowledgeBase, randomSeed: number): string {
  const serviceIntros = [
    "Nos enorgullecemos de ofrecer un servicio integral:",
    "Brindamos un servicio completo y de calidad:",
    "Nuestro compromiso incluye servicios excepcionales:",
    "Ofrecemos un paquete completo de servicios:",
    "Nos caracterizamos por un servicio premium:",
    "Proporcionamos servicios de primera categoría:",
    "Nuestro enfoque incluye servicios superiores:",
    "Garantizamos servicios de excelencia:",
    "Nos distinguimos por servicios integrales:",
    "Ofrecemos un portafolio completo de servicios:",
  ]

  // Generar variaciones en los servicios
  const warrantyPeriods = ["6 meses", "8 meses", "1 año", "18 meses"]
  const returnPeriods = ["30 días", "45 días", "60 días"]
  const consultationThresholds = ["$100,000", "$150,000", "$200,000"]

  const services = {
    warranty: [
      `${warrantyPeriods[randomSeed % warrantyPeriods.length]} de garantía en todos nuestros productos`,
      `Garantía completa de ${warrantyPeriods[randomSeed % warrantyPeriods.length]}`,
      `${warrantyPeriods[randomSeed % warrantyPeriods.length]} de respaldo total`,
      `Cobertura integral por ${warrantyPeriods[randomSeed % warrantyPeriods.length]}`,
      `Garantía extendida de ${warrantyPeriods[randomSeed % warrantyPeriods.length]}`,
    ],
    returns: [
      `${returnPeriods[randomSeed % returnPeriods.length]} para cambios y devoluciones sin preguntas`,
      `Política de ${returnPeriods[randomSeed % returnPeriods.length]} para cambios`,
      `${returnPeriods[randomSeed % returnPeriods.length]} de garantía de satisfacción`,
      `Cambios libres durante ${returnPeriods[randomSeed % returnPeriods.length]}`,
      `Devoluciones sin complicaciones por ${returnPeriods[randomSeed % returnPeriods.length]}`,
    ],
    advice: [
      "Asesoría deportiva especializada gratuita",
      "Consultoría deportiva sin costo",
      "Asesoramiento profesional incluido",
      "Orientación experta sin cargo",
      "Consulta especializada gratuita",
      "Asesoría técnica sin costo adicional",
      "Orientación profesional incluida",
      "Consultoría deportiva completa",
    ],
  }

  let response = serviceIntros[randomSeed % serviceIntros.length] + "\n\n"

  response += `🛡️ **Garantía:** ${services.warranty[randomSeed % services.warranty.length]}. Si algo sale mal, nosotros respondemos completamente.\n\n`
  response += `🔄 **Cambios y Devoluciones:** ${services.returns[randomSeed % services.returns.length]}. Tu satisfacción es nuestra máxima prioridad.\n\n`
  response += `👨‍💼 **Asesoría Especializada:** ${services.advice[randomSeed % services.advice.length]}. Nuestro equipo te ayuda a elegir el mejor equipo según tu deporte y nivel.\n\n`

  const additionalServices = [
    `Además, si compras por más de ${consultationThresholds[randomSeed % consultationThresholds.length]}, te regalamos una consulta personalizada con nuestro especialista deportivo.`,
    `Como valor agregado, compras superiores a ${consultationThresholds[randomSeed % consultationThresholds.length]} incluyen asesoría personalizada gratuita.`,
    `Beneficio especial: consulta individual con experto deportivo en compras mayores a ${consultationThresholds[randomSeed % consultationThresholds.length]}.`,
    `Bonus exclusivo: asesoría premium gratuita para compras desde ${consultationThresholds[randomSeed % consultationThresholds.length]}.`,
    `Regalo especial: consulta deportiva personalizada en compras superiores a ${consultationThresholds[randomSeed % consultationThresholds.length]}.`,
  ]

  response += additionalServices[randomSeed % additionalServices.length]
  return response
}

function handleAdvancedDeliveryQuery(analysis: any, kb: SportsKnowledgeBase, randomSeed: number): string {
  const deliveryIntros = [
    "¡Por supuesto! Tenemos varias opciones de entrega para que elijas la que mejor te convenga:",
    "¡Claro que sí! Ofrecemos múltiples alternativas de envío:",
    "¡Absolutamente! Contamos con diferentes modalidades de entrega:",
    "¡Perfecto! Disponemos de varias opciones de envío:",
    "¡Excelente! Tenemos múltiples alternativas de entrega:",
    "¡Por supuesto! Manejamos diversas opciones de envío:",
    "¡Claro! Contamos con varias modalidades de entrega:",
    "¡Definitivamente! Ofrecemos múltiples opciones de envío:",
    "¡Sin duda! Tenemos diferentes alternativas de entrega:",
    "¡Naturalmente! Disponemos de varias opciones de envío:",
  ]

  let response = deliveryIntros[randomSeed % deliveryIntros.length] + "\n\n"

  // Generar costos variables
  const standardCosts = ["$8,000", "$10,000", "$12,000"]
  const expressCosts = ["$15,000", "$18,000", "$20,000"]
  const freeThresholds = ["$100,000", "$120,000", "$150,000"]

  const deliveryOptions = [
    {
      type: "Entrega Estándar",
      time: "2-3 días hábiles",
      cost: standardCosts[randomSeed % standardCosts.length],
      condition: `Compras menores a ${freeThresholds[randomSeed % freeThresholds.length]}`,
    },
    {
      type: "Entrega Gratis",
      time: "2-3 días hábiles",
      cost: "Gratis",
      condition: `Compras mayores a ${freeThresholds[randomSeed % freeThresholds.length]}`,
    },
    {
      type: "Entrega Express",
      time: "24 horas",
      cost: expressCosts[randomSeed % expressCosts.length],
      condition: "Disponible en Bogotá y área metropolitana",
    },
  ]

  deliveryOptions.forEach((option, index) => {
    response += `${index + 1}. **${option.type}**\n`
    response += `   ⏰ Tiempo: ${option.time}\n`
    response += `   💰 Costo: ${option.cost}\n`
    response += `   📋 ${option.condition}\n\n`
  })

  const includedServices = [
    "📦 Todos nuestros envíos incluyen empaque especializado, seguro contra daños y seguimiento en tiempo real.",
    "📦 Cada envío cuenta con protección especial, cobertura de seguro y rastreo completo.",
    "📦 Incluimos empaque profesional, seguro total y monitoreo constante del envío.",
    "📦 Todos los envíos tienen empaque premium, seguro completo y tracking en vivo.",
    "📦 Cada entrega incluye protección avanzada, seguro integral y seguimiento detallado.",
    "📦 Nuestros envíos cuentan con empaque especializado, cobertura total y rastreo GPS.",
    "📦 Incluimos protección profesional, seguro completo y monitoreo 24/7.",
    "📦 Todos los paquetes tienen empaque de calidad, seguro total y seguimiento en línea.",
  ]

  response += includedServices[randomSeed % includedServices.length]
  return response
}

function handleRecommendationQuery(analysis: any, kb: SportsKnowledgeBase, randomSeed: number): string {
  const recommendationIntros = [
    "Basándome en tu consulta, estas son mis recomendaciones:",
    "Según tu pregunta, te sugiero estos productos:",
    "Considerando tu necesidad, estas son mis mejores opciones:",
    "Analizando tu consulta, te recomiendo:",
    "Evaluando tu pregunta, estas son mis sugerencias:",
    "Tomando en cuenta tu necesidad, te propongo:",
    "Considerando tu consulta, mis recomendaciones son:",
    "Basado en tu pregunta, te aconsejo:",
    "Analizando tu requerimiento, te sugiero:",
    "Evaluando tu consulta, mis propuestas son:",
  ]

  const recommendations = []

  if (analysis.products.length > 0) {
    for (const product of kb.products) {
      const matches = analysis.products.some(
        (p: string) =>
          product.name.toLowerCase().includes(p) ||
          product.category.toLowerCase().includes(p) ||
          product.features.some((f) => f.toLowerCase().includes(p)),
      )
      if (matches) {
        recommendations.push(product)
      }
    }
  } else {
    // Seleccionar productos aleatorios diferentes cada vez
    const shuffledProducts = [...kb.products].sort(() => Math.random() - 0.5)
    recommendations.push(...shuffledProducts.slice(0, 3))
  }

  if (recommendations.length === 0) {
    const personalizedQuestions = [
      "Para darte la mejor recomendación personalizada, me gustaría conocer más sobre ti. ¿Qué deporte practicas o qué tipo de actividad física realizas regularmente?",
      "Para personalizar mi sugerencia de manera óptima, ¿podrías contarme qué actividad deportiva te interesa más o cuál es tu nivel de experiencia?",
      "Para hacer una recomendación precisa y acertada, ¿qué tipo de deporte o ejercicio planeas realizar y con qué frecuencia?",
      "Para ofrecerte la mejor opción, ¿podrías especificar tu deporte favorito, nivel de experiencia y objetivos deportivos?",
      "Para una recomendación perfecta, necesito saber: ¿qué actividad deportiva practicas, cuál es tu presupuesto y qué características priorizas?",
    ]
    return personalizedQuestions[randomSeed % personalizedQuestions.length]
  }

  let response = recommendationIntros[randomSeed % recommendationIntros.length] + "\n\n"

  recommendations.slice(0, 3).forEach((product, index) => {
    // Generar calificaciones variables
    const rating = (3.8 + Math.random() * 1.4).toFixed(1)
    const reviewCount = Math.floor(Math.random() * 500) + 50

    // Generar precios con variaciones
    const priceVariation = (randomSeed % 10) - 5 // -5% a +5%
    const adjustedPrice = Math.floor(product.price * (1 + priceVariation / 100))

    response += `${index + 1}. **${product.name} ${product.brand}** - $${adjustedPrice.toLocaleString()}\n`
    response += `   ⭐ Calificación: ${rating}/5.0 (${reviewCount} reseñas)\n`
    response += `   📝 ${product.description}\n`
    response += `   ✨ Características: ${product.features.join(", ")}\n`
    response += `   📦 Stock: ${product.stock} unidades disponibles\n\n`
  })

  const closingRecommendations = [
    "Estas recomendaciones están basadas en la calidad, durabilidad y satisfacción de nuestros clientes más exigentes.",
    "Estas sugerencias se fundamentan en las mejores valoraciones y experiencias de usuarios verificados.",
    "Estas opciones han sido seleccionadas por su excelente relación calidad-precio y comentarios positivos constantes.",
    "Estas recomendaciones provienen de análisis de ventas, reseñas de clientes y evaluaciones de expertos deportivos.",
    "Estas sugerencias están respaldadas por estudios de satisfacción, pruebas de calidad y feedback de atletas profesionales.",
    "Estas opciones han sido elegidas por su rendimiento superior, durabilidad comprobada y aceptación del mercado.",
    "Estas recomendaciones se basan en tendencias actuales, innovación tecnológica y preferencias de deportistas.",
    "Estas sugerencias combinan análisis de mercado, evaluaciones técnicas y experiencias reales de usuarios.",
  ]

  response += closingRecommendations[randomSeed % closingRecommendations.length]
  return response
}

function handleComparisonQuery(analysis: any, kb: SportsKnowledgeBase, randomSeed: number): string {
  const products = kb.products
    .filter((p) =>
      analysis.products.some(
        (ap: string) => p.name.toLowerCase().includes(ap) || p.category.toLowerCase().includes(ap),
      ),
    )
    .slice(0, 2)

  if (products.length < 2) {
    const comparisonHelp = [
      "Para hacer una comparación efectiva y detallada, necesito que me especifiques exactamente qué productos quieres comparar.",
      "Para una comparación precisa y útil, ¿podrías indicarme exactamente qué productos te interesan evaluar?",
      "Para ayudarte con la comparación más acertada, necesito saber qué productos específicos quieres analizar.",
      "Para realizar una comparación completa, ¿podrías mencionar los productos exactos que te gustaría evaluar?",
      "Para una comparación detallada y objetiva, necesito que especifiques qué artículos deportivos quieres contrastar.",
    ]
    return comparisonHelp[randomSeed % comparisonHelp.length]
  }

  const comparisonIntros = [
    `Excelente pregunta. Te ayudo a comparar ${products[0].name} ${products[0].brand} vs ${products[1].name} ${products[1].brand}:`,
    `Perfecto. Analicemos las diferencias entre ${products[0].name} ${products[0].brand} y ${products[1].name} ${products[1].brand}:`,
    `Muy buena consulta. Comparemos ${products[0].name} ${products[0].brand} contra ${products[1].name} ${products[1].brand}:`,
    `Fantástica pregunta. Evaluemos ${products[0].name} ${products[0].brand} versus ${products[1].name} ${products[1].brand}:`,
    `Excelente comparación. Analicemos ${products[0].name} ${products[0].brand} frente a ${products[1].name} ${products[1].brand}:`,
  ]

  let response = comparisonIntros[randomSeed % comparisonIntros.length] + "\n\n"

  // Generar variaciones en precios
  const price1Variation = (randomSeed % 8) - 4
  const price2Variation = ((randomSeed + 1) % 8) - 4
  const adjustedPrice1 = Math.floor(products[0].price * (1 + price1Variation / 100))
  const adjustedPrice2 = Math.floor(products[1].price * (1 + price2Variation / 100))

  response += `**${products[0].name} ${products[0].brand}:**\n`
  response += `💰 Precio: $${adjustedPrice1.toLocaleString()}\n`
  response += `📝 ${products[0].description}\n`
  response += `✨ Características: ${products[0].features.join(", ")}\n`
  response += `📦 Stock: ${products[0].stock} unidades\n\n`

  response += `**${products[1].name} ${products[1].brand}:**\n`
  response += `💰 Precio: $${adjustedPrice2.toLocaleString()}\n`
  response += `📝 ${products[1].description}\n`
  response += `✨ Características: ${products[1].features.join(", ")}\n`
  response += `📦 Stock: ${products[1].stock} unidades\n\n`

  const recommendations = [
    "**Mi recomendación:**\nSi buscas mejor relación calidad-precio, te recomiendo el más económico. Si buscas la máxima calidad y rendimiento, el premium es excelente.",
    "**Mi sugerencia:**\nPara presupuesto ajustado, la opción más accesible es ideal. Para máximo rendimiento y durabilidad, la opción premium vale la inversión.",
    "**Mi consejo:**\nLa opción económica ofrece gran valor por tu dinero. La premium brinda características superiores para uso intensivo y profesional.",
    "**Mi análisis:**\nEl producto más accesible es perfecto para comenzar. El premium ofrece tecnología avanzada para deportistas exigentes.",
    "**Mi evaluación:**\nLa alternativa económica es excelente para uso regular. La premium proporciona características profesionales y mayor durabilidad.",
    "**Mi recomendación experta:**\nEl modelo básico cumple perfectamente para entrenamientos regulares. El avanzado es ideal para competencias y uso intensivo.",
    "**Mi sugerencia profesional:**\nLa opción estándar ofrece calidad confiable. La premium incluye innovaciones tecnológicas para máximo rendimiento.",
  ]

  response += recommendations[randomSeed % recommendations.length]
  return response
}

function handleGeneralQuery(
  analysis: any,
  kb: SportsKnowledgeBase,
  originalQuestion: string,
  randomSeed: number,
): string {
  const generalResponses = [
    `Entiendo perfectamente tu consulta sobre "${originalQuestion}". En nuestra tienda deportiva manejamos una amplia gama de productos de las mejores marcas internacionales.`,
    `Gracias por tu interesante pregunta sobre "${originalQuestion}". Como especialistas en deportes, tenemos todo lo que necesitas para tu actividad física.`,
    `Me da mucho gusto que preguntes sobre "${originalQuestion}". Somos expertos en equipamiento deportivo y podemos ayudarte con cualquier necesidad.`,
    `Aprecio tu consulta sobre "${originalQuestion}". Como tienda especializada en deportes, contamos con productos para todas las disciplinas.`,
    `Excelente pregunta sobre "${originalQuestion}". Nuestro enfoque es brindar soluciones deportivas completas para atletas de todos los niveles.`,
    `Me complace tu consulta sobre "${originalQuestion}". En nuestra tienda encontrarás equipamiento deportivo de primera calidad.`,
    `Fantástica pregunta sobre "${originalQuestion}". Nos especializamos en productos deportivos innovadores y de alta calidad.`,
    `Muy buena consulta sobre "${originalQuestion}". Como expertos en deportes, tenemos las mejores opciones para ti.`,
  ]

  let response = generalResponses[randomSeed % generalResponses.length] + " "

  if (originalQuestion.includes("deporte") || originalQuestion.includes("ejercicio")) {
    const sportInfo = [
      "Contamos con equipos para todos los deportes: fútbol, tenis, básquet, ciclismo, running, boxeo y muchos más.",
      "Tenemos equipamiento completo para múltiples disciplinas deportivas y actividades físicas.",
      "Manejamos productos para toda clase de actividades físicas, deportes y entrenamientos especializados.",
      "Disponemos de equipos para deportes tradicionales, modernos y actividades fitness innovadoras.",
      "Contamos con productos para deportes individuales, de equipo y actividades de acondicionamiento físico.",
      "Tenemos equipamiento para deportes profesionales, amateur y actividades recreativas.",
      "Manejamos productos para deportes de interior, exterior y actividades de alto rendimiento.",
    ]
    response += sportInfo[randomSeed % sportInfo.length] + " "
  }

  if (originalQuestion.includes("marca") || originalQuestion.includes("calidad")) {
    const brandInfo = [
      `Trabajamos con las mejores marcas: ${kb.brands.slice(0, 4).join(", ")} y más. Todos nuestros productos tienen garantía de calidad superior.`,
      `Manejamos marcas reconocidas mundialmente: ${kb.brands.slice(1, 5).join(", ")} entre otras. Calidad garantizada en cada producto.`,
      `Contamos con marcas premium: ${kb.brands.slice(2, 6).join(", ")} y más. Excelencia y durabilidad en cada artículo.`,
      `Disponemos de las mejores marcas: ${kb.brands.slice(0, 3).join(", ")} y otras. Calidad profesional garantizada.`,
      `Trabajamos con marcas líderes: ${kb.brands.slice(3, 7).join(", ")} entre otras. Productos de primera categoría.`,
    ]
    response += brandInfo[randomSeed % brandInfo.length] + " "
  }

  const helpOffers = [
    "¿Podrías ser más específico sobre qué producto o información necesitas para tu actividad deportiva?",
    "¿Te interesa algún producto en particular o tienes alguna disciplina deportiva específica en mente?",
    "¿Hay algo específico en lo que te pueda ayudar relacionado con equipamiento deportivo?",
    "¿Qué tipo de deporte practicas o qué equipo específico estás buscando?",
    "¿Podrías contarme más sobre tu actividad deportiva para darte la mejor recomendación?",
    "¿Hay algún producto deportivo específico que te interese o alguna marca en particular?",
    "¿Qué disciplina deportiva practicas o qué tipo de equipamiento necesitas?",
    "¿Te gustaría que te ayude con algún producto específico o tienes alguna consulta particular?",
  ]

  response += helpOffers[randomSeed % helpOffers.length]
  return response
}

function preprocessQuestion(question: string): string {
  // Eliminar signos de puntuación
  const cleaned = question.toLowerCase().replace(/[¿?¡!.,;:]/g, "")

  // Eliminar stopwords específicas
  const stopwords = ["es", "son", "está", "están", "hay", "tiene", "tengo", "me", "se", "le", "lo", "la"]
  const words = cleaned.split(" ")
  const filteredWords = words.filter((word) => !stopwords.includes(word))

  return filteredWords.join(" ")
}
