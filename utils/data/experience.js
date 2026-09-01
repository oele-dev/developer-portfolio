export const experiences = [
  {
    id: 'level60',
    years: { en: '2024 — NOW', es: '2024 — HOY' },
    role: { en: 'Senior Software Engineer', es: 'Senior Software Engineer' },
    company: 'Level60 Consulting · Nashville, TN',
    description: {
      en: 'Working across a multi-app Laravel ecosystem — several applications deploying from one core codebase against a shared database, built on Blade and Livewire, with Inertia as the target architecture. Decomposing oversized Livewire components: queries and database calls pulled out of the views, business logic moved into controllers, components reshaped into prop-driven, event-emitting boundaries. Consolidated a React SPA and a separate Laravel API into a single Inertia monolith, with DTOs generated through Spatie laravel-data keeping what Laravel emits and what TypeScript expects in sync. Modernized a production application from Laravel 8 to Laravel 12 with Rector, generating coverage to verify behavior before each stage. Cut the heaviest SQL Server queries from 5 s to 900 ms with targeted queries, Redis and Laravel Octane. Introduced Filament as the admin layer in several projects, contributed to Next.js / TypeScript frontends and to the CI/CD pipeline. Heavy use of AI-assisted development (Claude Code, Cursor) to ship faster with rigorous code review.',
      es: 'Trabajando sobre un ecosistema Laravel multi-app — varias aplicaciones desplegadas desde un mismo código base contra una base de datos compartida, construidas en Blade y Livewire, con Inertia como arquitectura objetivo. Descomponiendo componentes Livewire sobredimensionados: queries y llamados a base de datos fuera de las vistas, lógica de negocio movida a controladores, componentes reconvertidos en límites orientados a props y eventos. Consolidé una SPA en React y una API Laravel separada en un único monolito Inertia, con DTOs generados vía Spatie laravel-data que mantienen sincronizado lo que emite Laravel con lo que espera TypeScript. Modernicé una aplicación en producción de Laravel 8 a Laravel 12 con Rector, generando cobertura para verificar el comportamiento antes de cada etapa. Reduje las queries más pesadas de SQL Server de 5 s a 900 ms con queries dirigidas, Redis y Laravel Octane. Introduje Filament como capa de administración en varios proyectos, contribuí en frontends con Next.js/TypeScript y en el pipeline de CI/CD. Uso intensivo de desarrollo asistido por IA (Claude Code, Cursor) para entregar más rápido con revisión de código rigurosa.',
    },
  },
  {
    id: 'eyeuniversal',
    years: { en: '2022 — 2024', es: '2022 — 2024' },
    role: { en: 'Senior Software Engineer (Contract)', es: 'Senior Software Engineer (Contrato)' },
    company: 'EyeUniversal LLC · San José, CA',
    description: {
      en: 'Lead developer on Run Layout Tool, a drainage system configurator built from scratch on Laravel + Inertia + Vue 3 and still running in production — validation, display state and pricing rules kept separated behind a props contract, with requirements taken directly from the product manager and no tech lead above me. Also delivered web applications with Laravel and online stores with WooCommerce, WordPress and Shopify for US clients. Owned the full delivery cycle: requirements, architecture, implementation, deployment.',
      es: 'Desarrollador líder de Run Layout Tool, un configurador de sistemas de drenaje construido desde cero sobre Laravel + Inertia + Vue 3 y aún en producción — validación, estado de presentación y reglas de precios separados detrás de un contrato de props, con los requisitos tomados directamente del product manager y sin tech lead por encima. También entregué aplicaciones web con Laravel y tiendas online con WooCommerce, WordPress y Shopify para clientes de EE.UU. Dueño del ciclo completo de entrega: requisitos, arquitectura, implementación, despliegue.',
    },
  },
  {
    id: 'sena',
    years: { en: '2021 — 2025', es: '2021 — 2025' },
    role: { en: 'Software Development Instructor', es: 'Instructor de Desarrollo de Software' },
    company: 'SENA · Colombia',
    description: {
      en: 'Trained ADSO students in HTML, CSS, JS, PHP/Laravel, Git/GitHub and CI/CD. Designed practice repos and evaluation rubrics tied to GA evidences.',
      es: 'Formé aprendices del ADSO en HTML, CSS, JS, PHP/Laravel, Git/GitHub y CI/CD. Diseñé repositorios de práctica y rúbricas de evaluación alineadas a evidencias del programa.',
    },
  },
  {
    id: 'ovy',
    years: { en: '2017 — 2022', es: '2017 — 2022' },
    role: { en: 'Lead Developer', es: 'Lead Developer' },
    company: 'Ovy.so · Colombia',
    description: {
      en: 'Led the migration of a PHP Vanilla product to Laravel and Blade, then to Inertia, and carried the application from Inertia v1 to v2 with Docker-based development. Moved the frontend from Vue 2 to Vue 3 with the Composition API, building session and auth handling, the props contract between controller and page, and the component boundaries separating presentational single-file components from those owning logic. Implemented GitLab Flow, Conventional Commits and Continuous Delivery. Converted the frontend to a PWA with offline capabilities, covered in Laravel Dusk, and led the Google Workspace integration (Meet, Calendar, Accounts).',
      es: 'Lideré la migración de un producto en PHP vanilla a Laravel y Blade, luego a Inertia, y llevé la aplicación de Inertia v1 a v2 con desarrollo basado en Docker. Migré el frontend de Vue 2 a Vue 3 con la Composition API, construyendo el manejo de sesión y autenticación, el contrato de props entre controlador y página, y los límites de componentes que separan los single-file components presentacionales de los que cargan lógica. Implementé GitLab Flow, Conventional Commits y Entrega Continua. Convertí el frontend a una PWA con capacidades offline, cubierta con Laravel Dusk, y lideré la integración de Google Workspace (Meet, Calendar, Accounts).',
    },
  },
];
