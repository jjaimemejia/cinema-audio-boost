export type Locale = "es" | "en";
export type LocalizedText = Record<Locale, string>;
type BenefitKey = "dialogue" | "volume" | "cinema" | "platforms";
type Action = {
  href: string;
  label: LocalizedText;
  variant: "primary" | "secondary";
};

export type InfoPageKey = "privacy" | "support";

export function getText(text: LocalizedText, locale: Locale) {
  return text[locale];
}

export const siteCopy = {
  header: {
    prelaunch: { es: "Experiencia en pre-lanzamiento", en: "Pre-launch experience" },
    nav: {
      home: { es: "Inicio", en: "Home" },
      privacy: { es: "Privacidad", en: "Privacy" },
      support: { es: "Soporte", en: "Support" },
    },
    launchCta: { es: "Únete al lanzamiento", en: "Join the launch" },
    locale: {
      label: { es: "Selector de idioma", en: "Language selector" },
      es: { es: "ES", en: "ES" },
      en: { es: "EN", en: "EN" },
    },
  },
  home: {
    hero: {
      badge: {
        es: "Audio streaming con carácter de cine",
        en: "Streaming audio with cinema character",
      },
      title: {
        es: "Escucha cada diálogo claramente mientras ves streaming",
        en: "Hear every dialogue clearly while streaming",
      },
      subtitle: {
        es: "Mejora el audio de Netflix, Disney+, Prime Video y más con sonido tipo cine.",
        en: "Enhance audio on Netflix, Disney+, Prime Video and more with cinematic sound.",
      },
      primaryCta: { es: "Disponible pronto", en: "Coming soon" },
      secondaryCta: { es: "Únete al lanzamiento", en: "Join the launch" },
      note: {
        es: "Cinema Audio Boost todavía no está publicado. Esta página existe para reunir interés temprano, validar usuarios y abrir la puerta al lanzamiento.",
        en: "Cinema Audio Boost is not published yet. This page exists to build early interest, validate users, and shape launch momentum.",
      },
      visual: {
        eyebrow: { es: "Vista previa inmersiva", en: "Immersive preview" },
        title: {
          es: "Perfiles diseñados para que voces, impacto y detalle se sientan más cerca.",
          en: "Presets designed to bring voices, impact, and detail closer.",
        },
        status: { es: "Próximamente", en: "Coming soon" },
        metrics: [
          {
            label: { es: "Perfiles", en: "Presets" },
            value: { es: "Movie / Vocal / Speech", en: "Movie / Vocal / Speech" },
          },
          {
            label: { es: "Plataformas", en: "Platforms" },
            value: { es: "10", en: "10" },
          },
          {
            label: { es: "Modo", en: "Mode" },
            value: { es: "Cine", en: "Cinema" },
          },
        ],
      },
    },
    benefits: {
      eyebrow: { es: "Beneficios", en: "Benefits" },
      title: {
        es: "Hecho para escuchar mejor cada escena",
        en: "Built to make every scene easier to hear",
      },
      intro: {
        es: "Desde conversaciones tensas hasta explosiones y ambientes, Cinema Audio Boost está pensado para devolver claridad y presencia a tu experiencia de streaming.",
        en: "From tense conversations to full-impact scenes, Cinema Audio Boost is designed to restore clarity and presence to your streaming sessions.",
      },
      items: [
        {
          key: "dialogue" as BenefitKey,
          title: { es: "Diálogos más claros", en: "Clear dialogue" },
          description: {
            es: "Resalta voces y conversaciones para que sigas la historia sin subir demasiado el volumen general.",
            en: "Lifts voices and conversations so you can follow the story without pushing overall volume too hard.",
          },
        },
        {
          key: "volume" as BenefitKey,
          title: { es: "Más volumen", en: "More volume" },
          description: {
            es: "Aumenta la presencia del audio cuando la mezcla original se queda corta o suena demasiado plana.",
            en: "Adds more presence when the original mix feels too quiet or lacks energy.",
          },
        },
        {
          key: "cinema" as BenefitKey,
          title: { es: "Sonido tipo cine", en: "Cinematic sound" },
          description: {
            es: "Activa perfiles con más profundidad, cuerpo y sensación envolvente para una escucha más dramática.",
            en: "Switch on profiles with more depth, body, and immersion for a more dramatic listening experience.",
          },
        },
        {
          key: "platforms" as BenefitKey,
          title: { es: "Funciona en múltiples plataformas", en: "Works across platforms" },
          description: {
            es: "Pensado para acompañarte en tus servicios favoritos sin cambiar tu forma de ver series, películas o anime.",
            en: "Designed to follow your favorite services without changing how you watch shows, films, or anime.",
          },
        },
      ],
    },
    platforms: {
      eyebrow: { es: "Plataformas", en: "Platforms" },
      title: {
        es: "Compatible con tus plataformas favoritas",
        en: "Compatible with your favorite platforms",
      },
      intro: {
        es: "El objetivo es que la experiencia sea consistente en los servicios donde más importa escuchar bien cada línea.",
        en: "The goal is a consistent experience across the streaming services where hearing every line matters most.",
      },
      items: [
        "Netflix",
        "Disney+",
        "Max",
        "HBO Max",
        "Prime Video",
        "Apple TV+",
        "Paramount+",
        "Movistar Plus+",
        "Claro video",
        "Crunchyroll",
      ],
    },
    howItWorks: {
      eyebrow: { es: "Cómo funciona", en: "How it works" },
      title: {
        es: "Tres pasos para cambiar la forma en que escuchas streaming",
        en: "Three steps to change how streaming sounds",
      },
      intro: {
        es: "Sin hardware extra, sin paneles complejos y con una experiencia pensada para activarse en segundos.",
        en: "No extra hardware, no complex panels, and an experience designed to feel ready in seconds.",
      },
      steps: [
        {
          number: 1,
          title: { es: "Instala la extensión", en: "Install the extension" },
          description: {
            es: "Añade Cinema Audio Boost a Chrome cuando llegue el lanzamiento oficial.",
            en: "Add Cinema Audio Boost to Chrome once the official launch goes live.",
          },
        },
        {
          number: 2,
          title: { es: "Abre tu plataforma", en: "Open your platform" },
          description: {
            es: "Entra en Netflix, Disney+, Prime Video o cualquiera de las plataformas compatibles.",
            en: "Open Netflix, Disney+, Prime Video, or any of the supported platforms.",
          },
        },
        {
          number: 3,
          title: { es: "Activa el modo cine", en: "Enable cinema mode" },
          description: {
            es: "Elige el preset que mejor encaje con lo que estás viendo y escucha la diferencia.",
            en: "Choose the preset that best matches what you are watching and hear the difference.",
          },
        },
      ],
    },
    presets: {
      eyebrow: { es: "Presets", en: "Presets" },
      title: {
        es: "Tres perfiles para encontrar tu mezcla ideal",
        en: "Three profiles to find your preferred mix",
      },
      intro: {
        es: "Cada preset apunta a un tipo de escucha distinto, desde impacto cinematográfico hasta voz prioritaria.",
        en: "Each preset is tuned for a different listening style, from cinematic impact to voice-first clarity.",
      },
      items: [
        {
          name: "Movie",
          description: {
            es: "Aporta más profundidad, pegada y atmósfera para noches de película con sensación envolvente.",
            en: "Adds depth, punch, and atmosphere for a more enveloping movie-night feel.",
          },
        },
        {
          name: "Vocal",
          description: {
            es: "Hace que las voces ganen presencia y definición cuando el diálogo necesita salir al frente.",
            en: "Gives voices more presence and definition when dialogue needs to come forward.",
          },
        },
        {
          name: "Speech",
          description: {
            es: "Prioriza inteligibilidad y nitidez para podcasts, series densas en conversación o escenas sutiles.",
            en: "Prioritizes intelligibility and crispness for podcasts, dialogue-heavy series, or subtle scenes.",
          },
        },
      ],
    },
    pro: {
      eyebrow: { es: "Próximamente Pro", en: "Coming soon Pro" },
      title: { es: "Desbloquea la experiencia Pro", en: "Unlock the Pro experience" },
      intro: {
        es: "Las funciones avanzadas están en camino para quienes quieran un control más fino del sonido.",
        en: "Advanced features are on the way for listeners who want more control over their sound.",
      },
      features: [
        { es: "Mejora de diálogo inteligente", en: "Smart dialogue enhancement" },
        { es: "Perfiles personalizados", en: "Custom profiles" },
        { es: "Boost avanzado", en: "Advanced boost" },
      ],
      cta: { es: "Próximamente", en: "Coming soon" },
    },
    signup: {
      eyebrow: { es: "Acceso temprano", en: "Early access" },
      title: {
        es: "Déjanos tu correo y sé de los primeros en probarlo",
        en: "Enter your email to be among the first to try it",
      },
      intro: {
        es: "La interfaz está lista para capturar interés temprano y ayudarte a medir demanda antes del lanzamiento oficial.",
        en: "The interface is ready to capture early interest and help validate demand before the official release.",
      },
      inputLabel: { es: "Correo electrónico", en: "Email address" },
      placeholder: { es: "tu@correo.com", en: "you@example.com" },
      button: { es: "Notificarme", en: "Notify me" },
      loading: { es: "Enviando...", en: "Sending..." },
      success: { es: "Gracias, te avisaremos cuando esté disponible", en: "You're on the list" },
      error: { es: "Error, intenta de nuevo", en: "Something went wrong" },
      invalidEmail: {
        es: "Introduce un correo válido para continuar.",
        en: "Enter a valid email to continue.",
      },
    },
    faq: {
      eyebrow: { es: "FAQ", en: "FAQ" },
      title: {
        es: "Preguntas frecuentes antes del lanzamiento",
        en: "Frequently asked questions before launch",
      },
      intro: {
        es: "Las respuestas clave para entender en qué momento está el producto y qué esperar del lanzamiento.",
        en: "The key answers to understand where the product stands and what to expect from launch.",
      },
      items: [
        {
          question: {
            es: "¿Cinema Audio Boost ya está disponible?",
            en: "Is Cinema Audio Boost available now?",
          },
          answer: {
            es: "Todavía no. La página es de pre-lanzamiento y está enfocada en generar expectativa antes de publicar la extensión oficialmente.",
            en: "Not yet. This is a pre-launch page focused on building anticipation before the extension is officially published.",
          },
        },
        {
          question: {
            es: "¿En qué plataformas funcionará?",
            en: "Which platforms will it support?",
          },
          answer: {
            es: "La experiencia está pensada para Netflix, Disney+, Max, HBO Max, Prime Video, Apple TV+, Paramount+, Movistar Plus+, Claro video y Crunchyroll.",
            en: "The experience is planned for Netflix, Disney+, Max, HBO Max, Prime Video, Apple TV+, Paramount+, Movistar Plus+, Claro video, and Crunchyroll.",
          },
        },
        {
          question: {
            es: "¿Necesitaré hardware adicional?",
            en: "Will I need extra hardware?",
          },
          answer: {
            es: "No. La idea es mejorar la experiencia desde Chrome con una extensión ligera y fácil de activar.",
            en: "No. The goal is to enhance the experience directly in Chrome with a lightweight extension that is easy to activate.",
          },
        },
        {
          question: {
            es: "¿Habrá una versión Pro?",
            en: "Will there be a Pro version?",
          },
          answer: {
            es: "Sí, está prevista una experiencia Pro con mejora de diálogo inteligente, perfiles personalizados y opciones de boost más avanzadas.",
            en: "Yes, a Pro experience is planned with smart dialogue enhancement, custom profiles, and more advanced boost controls.",
          },
        },
      ],
    },
  },
  footer: {
    privacy: { es: "Política de privacidad", en: "Privacy policy" },
    support: { es: "Soporte", en: "Support" },
    note: {
      es: "Cinema Audio Boost es una experiencia de pre-lanzamiento para validar interés antes de la publicación oficial.",
      en: "Cinema Audio Boost is a pre-launch experience built to validate interest ahead of the official release.",
    },
    legal: { es: "No afiliado con plataformas", en: "Not affiliated with streaming platforms" },
  },
} as const;

export const infoPages: Record<
  InfoPageKey,
  {
    eyebrow: LocalizedText;
    title: LocalizedText;
    intro: LocalizedText;
    sections: { title: LocalizedText; body: LocalizedText }[];
    actions: Action[];
  }
> = {
  privacy: {
    eyebrow: { es: "Información legal", en: "Legal information" },
    title: { es: "Política de privacidad", en: "Privacy policy" },
    intro: {
      es: "Esta versión del sitio presenta Cinema Audio Boost como producto en pre-lanzamiento. La página comunica el concepto y ya permite registrarse en la lista de espera.",
      en: "This version of the site presents Cinema Audio Boost as a pre-launch product. The page communicates the concept and now supports waitlist signups.",
    },
    sections: [
      {
        title: { es: "Estado actual de la captura de datos", en: "Current data collection status" },
        body: {
          es: "La interfaz de email visible en esta versión envía el correo a una automatización de Google Apps Script para registrar interés temprano en la lista de espera.",
          en: "The email interface visible in this version sends the address to a Google Apps Script automation to register early waitlist interest.",
        },
      },
      {
        title: { es: "Uso del correo", en: "Email usage" },
        body: {
          es: "El objetivo del registro es utilizar el correo únicamente para avisos relacionados con el lanzamiento, acceso temprano y novedades del producto.",
          en: "The intended use of submitted email is limited to launch notices, early access updates, and product news.",
        },
      },
      {
        title: { es: "Plataformas y afiliación", en: "Platforms and affiliation" },
        body: {
          es: "Cinema Audio Boost no está afiliado con Netflix, Disney+, Max, HBO Max, Prime Video, Apple TV+, Paramount+, Movistar Plus+, Claro video ni Crunchyroll. Los nombres mencionados se usan solo para describir compatibilidad prevista.",
          en: "Cinema Audio Boost is not affiliated with Netflix, Disney+, Max, HBO Max, Prime Video, Apple TV+, Paramount+, Movistar Plus+, Claro video, or Crunchyroll. Any names referenced are used only to describe intended compatibility.",
        },
      },
    ],
    actions: [
      {
        href: "/#join-launch",
        label: { es: "Únete al lanzamiento", en: "Join the launch" },
        variant: "primary",
      },
      {
        href: "/support",
        label: { es: "Ver soporte", en: "View support" },
        variant: "secondary",
      },
    ],
  },
  support: {
    eyebrow: { es: "Ayuda", en: "Help" },
    title: { es: "Soporte", en: "Support" },
    intro: {
      es: "Cinema Audio Boost sigue en fase previa al lanzamiento, así que el canal de soporte aún no está abierto como servicio completo.",
      en: "Cinema Audio Boost is still in pre-launch, so the support channel is not open yet as a full service.",
    },
    sections: [
      {
        title: { es: "Qué puedes esperar ahora", en: "What you can expect right now" },
        body: {
          es: "Esta página funciona como referencia temprana para explicar el estado del producto y orientar a quienes quieran seguir de cerca el lanzamiento.",
          en: "This page acts as an early reference to explain the product status and guide people who want to stay close to launch updates.",
        },
      },
      {
        title: { es: "Soporte cuando el producto salga", en: "Support once the product launches" },
        body: {
          es: "La versión pública incluirá detalles de contacto, ayuda inicial y una forma clara de reportar dudas sobre compatibilidad o presets.",
          en: "The public release will include contact details, onboarding help, and a clear way to report compatibility or preset questions.",
        },
      },
      {
        title: { es: "Mejor siguiente paso", en: "Best next step" },
        body: {
          es: "Si quieres estar entre los primeros en probar Cinema Audio Boost, vuelve a la portada y usa la sección de lanzamiento para registrarte en la lista de espera.",
          en: "If you want to be among the first to try Cinema Audio Boost, head back to the homepage and use the launch section to join the waitlist.",
        },
      },
    ],
    actions: [
      {
        href: "/#join-launch",
        label: { es: "Ir al lanzamiento", en: "Go to launch" },
        variant: "primary",
      },
      {
        href: "/privacy",
        label: { es: "Política de privacidad", en: "Privacy policy" },
        variant: "secondary",
      },
    ],
  },
};
