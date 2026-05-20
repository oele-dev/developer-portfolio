import maltaPharmacy from '/public/image/malta-pharmacy.jpg';
import runLayoutTool from '/public/image/runlayouttool.jpg';
import ovy from '/public/image/ovy.jpg';
import edicxonGelviz from '/public/image/edicxongelviz.jpg';
import voiceMyGoals from '/public/image/voicemygoals.jpg';
import atlasOrganico from '/public/image/atlasorganico.jpg';

export const projectsData = [
  {
    id: 'malta-pharmacy',
    image: maltaPharmacy,
    imagePlaceholder: false,
    demo: 'https://malta-pharmacy.com',
    code: '',
    role: 'Solo Founder & Developer',
    tools: ['Next.js 15', 'TypeScript', 'SQLite', 'Static Generation', 'JSON-LD', 'PWA', 'Tailwind'],
    metric: { value: '800+', unit: { en: 'static pages', es: 'páginas estáticas' } },
    name: {
      en: 'Malta Pharmacy Empire — Programmatic SEO',
      es: 'Malta Pharmacy Empire — SEO Programático',
    },
    description: {
      en: 'High-performance pharmacy directory for Malta. 800+ static pages generated at build time from SQLite → JSON exports. Includes JSON-LD schemas, sitemaps, PWA support and a Mediterranean design system. Zero runtime database — maximum Core Web Vitals.',
      es: 'Directorio de farmacias para Malta con alto rendimiento. Más de 800 páginas estáticas generadas en tiempo de build desde exportaciones SQLite → JSON. Incluye schemas JSON-LD, sitemaps, soporte PWA y un sistema de diseño mediterráneo. Sin base de datos en runtime — máximos Core Web Vitals.',
    },
  },
  {
    id: 'mkdn',
    image: null,
    imagePlaceholder: true,
    placeholderLabel: 'OPEN SOURCE · NPM PACKAGE',
    demo: 'https://github.com/oele-dev/mkdn',
    code: 'https://github.com/oele-dev/mkdn',
    role: 'Author',
    tools: ['Node.js', 'CLI', 'Cloudflare Workers AI', 'npm'],
    metric: { value: '0', unit: { en: 'runtime deps', es: 'dependencias runtime' } },
    name: {
      en: 'mkdn — File-to-Markdown CLI',
      es: 'mkdn — CLI de archivos a Markdown',
    },
    description: {
      en: 'Node.js CLI + library that converts PDF, DOCX, Excel, HTML and images to clean Markdown via Cloudflare Workers AI. Zero runtime dependencies. Published on npm.',
      es: 'CLI + librería en Node.js que convierte PDF, DOCX, Excel, HTML e imágenes a Markdown limpio vía Cloudflare Workers AI. Cero dependencias en runtime. Publicado en npm.',
    },
  },
  {
    id: 'quickbooks-hotmart',
    image: null,
    imagePlaceholder: true,
    placeholderLabel: 'CLIENT WORK · PRIVATE',
    demo: '',
    code: '',
    role: 'Lead Full Stack Developer',
    tools: ['Laravel', 'Livewire', 'Filament', 'Tailwind', 'Alpine.js', 'QuickBooks API', 'Hotmart API', 'MySQL'],
    metric: null,
    name: {
      en: 'QuickBooks + Hotmart Billing Automation',
      es: 'Automatización de Facturación QuickBooks + Hotmart',
    },
    description: {
      en: 'Billing automation product that integrates QuickBooks and Hotmart APIs to invoice digital purchases automatically. Built end-to-end on the TALL stack with Filament PHP as the operator panel.',
      es: 'Producto de automatización de facturación que integra las APIs de QuickBooks y Hotmart para facturar compras digitales de forma automática. Construido de punta a punta en el stack TALL con Filament PHP como panel de operador.',
    },
  },
  {
    id: 'run-layout-tool',
    image: runLayoutTool,
    imagePlaceholder: false,
    demo: 'https://runlayouttool.com',
    code: '',
    role: 'Full Stack Developer',
    tools: ['Laravel', 'Inertia.js', 'Vue', 'MySQL', 'Puppeteer', 'Node Mailer', 'Nginx'],
    metric: null,
    name: {
      en: 'Run Layout Tool',
      es: 'Run Layout Tool',
    },
    description: {
      en: 'VILT-stack web app that lets contractors design rainwater gutter layouts based on parts and length, then generates technical PDFs via Puppeteer and emails them to the client.',
      es: 'Aplicación web en stack VILT que permite a contratistas diseñar planos de canales de lluvia por partes y medidas, genera PDFs técnicos con Puppeteer y los envía por correo al cliente.',
    },
  },
  {
    id: 'google-workspace-laravel',
    image: ovy,
    imagePlaceholder: false,
    demo: 'https://ovy.co',
    code: '',
    role: 'Lead Developer',
    tools: ['Laravel', 'Vue', 'Google Workspace API', 'OAuth2', 'MySQL'],
    metric: null,
    name: {
      en: 'Google Workspace ↔ Laravel Integration',
      es: 'Integración Google Workspace ↔ Laravel',
    },
    description: {
      en: 'PHP package integrating Google Workspace services (Meet, Classroom, Calendar, Accounts) with Laravel applications — used in production to power virtual classrooms with one-click Meet, calendar events and passwordless sign-in.',
      es: 'Paquete PHP que integra los servicios de Google Workspace (Meet, Classroom, Calendar, Accounts) con aplicaciones Laravel — en producción para aulas virtuales con Meet en un clic, eventos de calendario e inicio de sesión sin contraseña.',
    },
  },
  {
    id: 'edicxon-gelviz',
    image: edicxonGelviz,
    imagePlaceholder: false,
    demo: 'https://edicxongelviz.com',
    code: '',
    role: 'Developer',
    tools: ['Astro', 'Tailwind', 'JSON-LD', 'Medical SEO'],
    metric: null,
    name: {
      en: 'Dr. Edicxon Gelviz — Medical SEO',
      es: 'Dr. Edicxon Gelviz — SEO Médico',
    },
    description: {
      en: 'Professional website for an orthopedic surgeon in Cúcuta, Colombia. Multi-page SEO architecture with specialized landing pages for hip and knee replacement surgery. JSON-LD Physician/MedicalProcedure schemas, WhatsApp integration, YouTube testimonials.',
      es: 'Sitio web profesional para cirujano ortopédico en Cúcuta, Colombia. Arquitectura SEO multi-página con landing pages especializadas para cirugía de cadera y rodilla. Schemas JSON-LD de Médico/ProcedimientoMédico, integración con WhatsApp y testimonios en YouTube.',
    },
  },
  {
    id: 'voicemygoals',
    image: voiceMyGoals,
    imagePlaceholder: false,
    demo: 'https://voicemygoals.vercel.app',
    code: '',
    role: 'Solo Developer',
    tools: ['AI', 'TTS', 'Audio Generation', 'SaaS'],
    metric: null,
    name: {
      en: 'VoiceMyGoals — Affirmation Audio Generator',
      es: 'VoiceMyGoals — Generador de Audio de Afirmaciones',
    },
    description: {
      en: 'Personalized affirmation audio generator that converts your goals into professional audio files. Multiple AI voices, 432Hz background music, unlimited custom affirmations.',
      es: 'Generador de audio de afirmaciones personalizado que convierte tus metas en archivos de audio profesionales. Múltiples voces de IA, música de fondo en 432Hz, afirmaciones personalizadas ilimitadas.',
    },
  },
];
