export type Locale = "es" | "en";

type LocalizedText = Record<Locale, string>;
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
    prelaunch: {
      es: "Experiencia en pre-lanzamiento",
      en: "Pre-launch experience",
    },
    nav: {
      home: { es: "Inicio", en: "Home" },
      privacy: { es: "Privacidad", en: "Privacy" },
      support: { es: "Soporte", en: "Support" },
    },
    launchCta: {
      es: "Únete al lanzamiento",
      en: "Join the launch",
    },
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
      primaryCta: {
        es: "Disponible pronto",
        en: "Coming soon",
      },
      secondaryCta: {
        es: "Únete al lanzamiento",
        en: "Join the launch",
      },
      note: {
        es: "Cinema Audio Boost todavía no está publicado. Esta página existe para reunir interés temprano, validar usuarios y abrir la puerta al lanzamiento.",
        en: "Cinema Audio Boost is not published yet. This page exists to build early interest, validate users, and shape launch momentum.",
      },
      visual: {
        eyebrow: {
          es: "Vista previa inmersiva",
          en: "Immersive preview",
        },
        title: {
          es: "Perfiles diseñados para que voces, impacto y detalle se sientan más cerca.",
          en: "Presets designed to bring voices, impact, and detail closer.",
        },
        status: {
          es: "Próximamente",
          en: "Coming soon",
        },
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
            es: "Activa perfiles con más profundidad, cuerpo y sensación envolvente para una escucha más dramatica.",
            en: "Switch on profiles with more depth, body, and immersion for a more dramatic listening experience.",
          },
        },
        {
          key: "platforms" as BenefitKey,
          title: {
            es: "Funciona en múltiples plataformas",
            en: "Works across platforms",
          },
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
            es: "Añade Cinema Audio Boost a Chrome cuando llegue el la