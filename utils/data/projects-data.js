// Each project belongs to one chapter; chapters filter this list.
// status: 'live' | 'beta' | 'client' | null. screenshot paths are served from /public.

export const projectsData = [
  // --- Foundation: Laravel work
  {
    id: 'billing',
    chapter: 'foundation',
    url: '',
    status: null,
    name: { en: 'QuickBooks and Hotmart billing', es: 'Facturación QuickBooks y Hotmart' },
    summary: {
      en: 'Webhooks into queued jobs on Redis and Horizon. Idempotent and retry-safe, so no purchase is invoiced twice.',
      es: 'Webhooks hacia jobs en cola sobre Redis y Horizon. Idempotente y seguro ante reintentos, así que ninguna compra se factura dos veces.',
    },
  },
  {
    id: 'laravel-missing-index',
    chapter: 'foundation',
    url: 'https://github.com/oele-dev/laravel-missing-index',
    status: null,
    name: { en: 'laravel-missing-index', es: 'laravel-missing-index' },
    summary: {
      en: 'Package that runs EXPLAIN on every dev query and hands you the CREATE INDEX that fixes it.',
      es: 'Paquete que corre EXPLAIN sobre cada query en desarrollo y te entrega el CREATE INDEX que la arregla.',
    },
  },
  {
    id: 'google-workspace',
    chapter: 'foundation',
    url: '',
    status: null,
    name: { en: 'Google Workspace for Laravel', es: 'Google Workspace para Laravel' },
    summary: {
      en: 'PHP package for Meet, Classroom, Calendar and Accounts. In production behind virtual classrooms with one-click Meet and passwordless sign-in.',
      es: 'Paquete PHP para Meet, Classroom, Calendar y Accounts. En producción detrás de aulas virtuales con Meet en un clic y acceso sin contraseña.',
    },
  },
  {
    id: 'vilt-test',
    chapter: 'foundation',
    url: 'https://github.com/oele-dev/vilt-test',
    status: null,
    name: { en: 'vilt-test', es: 'vilt-test' },
    summary: {
      en: 'Public VILT starter kit: Vue, Inertia, Laravel and Tailwind with Vite and PHPUnit wired. A readable reference for how I set up an Inertia app.',
      es: 'Starter kit público de VILT: Vue, Inertia, Laravel y Tailwind con Vite y PHPUnit configurados. Una referencia legible de cómo armo una app Inertia.',
    },
  },

  // --- Craft: tools that show how I work
  {
    id: 'mkdn',
    chapter: 'craft',
    url: 'https://github.com/oele-dev/mkdn',
    status: null,
    name: { en: 'mkdn', es: 'mkdn' },
    summary: {
      en: 'CLI and library that turns PDF, DOCX, Excel, HTML and images into clean Markdown for LLMs, via Cloudflare Workers AI. Zero runtime dependencies.',
      es: 'CLI y librería que convierte PDF, DOCX, Excel, HTML e imágenes en Markdown limpio para LLMs, vía Cloudflare Workers AI. Cero dependencias en runtime.',
    },
  },

  // --- Building: my own products, live first
  {
    id: 'ultti',
    chapter: 'building',
    url: 'https://ultti.co',
    status: 'live',
    statusLabel: { en: '2 tenants live', es: '2 negocios activos' },
    screenshot: { src: '/image/ultti.jpg', width: 1064, height: 665 },
    name: { en: 'Ultti', es: 'Ultti' },
    summary: {
      en: "A business's whole catalog in one link. Customers build their order and it lands on WhatsApp ready to dispatch, with products, address and payment method. No payment gateway, no commissions.",
      es: 'Todo el catálogo de un negocio en un link. El cliente arma su pedido y llega a WhatsApp listo para despachar, con productos, dirección y forma de pago. Sin pasarela y sin comisiones.',
    },
    alt: {
      en: 'Ultti landing page: your catalog in one link, orders arrive ready on WhatsApp',
      es: 'Landing de Ultti: tu catálogo en un link, los pedidos llegan listos por WhatsApp',
    },
  },
  {
    id: 'instructor-virtual',
    chapter: 'building',
    url: 'https://instructorvirtual.co',
    status: 'live',
    statusLabel: { en: '1,200+ graded', es: '1.200+ calificadas' },
    screenshot: { src: '/image/instructorvirtual.jpg', width: 1064, height: 665 },
    name: { en: 'Instructor Virtual', es: 'Instructor Virtual' },
    summary: {
      en: 'Chrome extension for SENA instructors. It surfaces what to grade first, unanswered forums and upcoming deadlines, and grades against evaluation rubrics with AI.',
      es: 'Extensión de Chrome para instructores SENA. Muestra qué calificar primero, los foros sin responder y las fechas de cierre, y califica con IA contra las rúbricas.',
    },
    alt: {
      en: 'Instructor Virtual landing page: stop wasting 30 minutes looking for what to grade',
      es: 'Landing de Instructor Virtual: deja de perder 30 minutos buscando qué calificar',
    },
  },
  {
    id: 'malta-pharmacy',
    chapter: 'building',
    url: 'https://malta-pharmacy.com',
    status: 'live',
    statusLabel: { en: 'Live', es: 'En vivo' },
    screenshot: { src: '/image/malta-pharmacy.jpg', width: 2880, height: 1800 },
    name: { en: 'Malta Pharmacy Empire', es: 'Malta Pharmacy Empire' },
    summary: {
      en: 'Programmatic SEO directory. 800+ static pages generated at build time, no runtime database.',
      es: 'Directorio de SEO programático. Más de 800 páginas estáticas generadas en build, sin base de datos en runtime.',
    },
    alt: { en: 'Malta Pharmacy Empire home page', es: 'Página de inicio de Malta Pharmacy Empire' },
  },
  {
    id: 'voicemygoals',
    chapter: 'building',
    url: 'https://voicemygoals.vercel.app',
    status: 'live',
    statusLabel: { en: 'Live', es: 'En vivo' },
    screenshot: { src: '/image/voicemygoals.jpg', width: 2880, height: 1800 },
    name: { en: 'VoiceMyGoals', es: 'VoiceMyGoals' },
    summary: {
      en: 'Turns your goals into personalized affirmation audio with AI voices.',
      es: 'Convierte tus metas en audios de afirmaciones personalizados con voces de IA.',
    },
    alt: { en: 'VoiceMyGoals affirmation audio generator', es: 'Generador de audios de afirmaciones VoiceMyGoals' },
  },
  {
    id: 'correconmigo',
    chapter: 'building',
    url: 'https://correconmigo.app',
    status: 'beta',
    statusLabel: { en: 'Beta', es: 'Beta' },
    screenshot: { src: '/image/correconmigo.jpg', width: 1064, height: 665 },
    name: { en: 'Corre Conmigo', es: 'Corre Conmigo' },
    summary: {
      en: "Family and friends record voice messages that play in a runner's headphones mid-race, plus strategy cues read out every kilometer. Installable web app, distance by GPS or pace.",
      es: 'Familia y amigos graban audios que suenan en los audífonos de quien corre durante la carrera, más avisos de estrategia en cada kilómetro. Web app instalable, distancia por GPS o por ritmo.',
    },
    alt: {
      en: 'Corre Conmigo: create a private link so family can send audio to a runner',
      es: 'Corre Conmigo: crea un enlace privado para que tu familia te mande audios mientras corres',
    },
  },
  {
    id: 'funaudios',
    chapter: 'building',
    url: 'https://funaudios.app',
    status: 'beta',
    statusLabel: { en: 'Beta', es: 'Beta' },
    screenshot: { src: '/image/funaudios.jpg', width: 1064, height: 665 },
    name: { en: 'FunAudios', es: 'FunAudios' },
    summary: {
      en: 'Tap a funny audio clip and send it to WhatsApp as a voice note instead of a sticker.',
      es: 'Toca un audio gracioso y mándalo a WhatsApp como nota de voz en vez de un sticker.',
    },
    alt: {
      en: 'FunAudios: grid of funny audio clips with share-to-WhatsApp buttons',
      es: 'FunAudios: grilla de audios graciosos con botones para compartir a WhatsApp',
    },
  },
  {
    id: 'edicxon-gelviz',
    chapter: 'building',
    url: 'https://edicxongelviz.com',
    status: 'client',
    statusLabel: { en: 'Lead agency', es: 'Agencia de leads' },
    screenshot: { src: '/image/edicxongelviz.jpg', width: 2880, height: 1800 },
    name: { en: 'Dr. Edicxon Gelviz', es: 'Dr. Edicxon Gelviz' },
    summary: {
      en: 'Medical SEO and lead generation for an orthopedic surgeon. Astro, JSON-LD.',
      es: 'SEO médico y generación de leads para un cirujano ortopedista. Astro, JSON-LD.',
    },
    alt: { en: 'Dr. Edicxon Gelviz orthopedic surgeon website', es: 'Sitio web del cirujano ortopedista Dr. Edicxon Gelviz' },
  },
];

export const projectsByChapter = (chapter) => projectsData.filter((p) => p.chapter === chapter);
