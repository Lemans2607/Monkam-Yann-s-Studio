import { PricingPlan, ContentCategory } from './types';

export const WHATSAPP_NUMBER = "676042996";
export const WHATSAPP_LINK = `https://wa.me/237${WHATSAPP_NUMBER}`;

export const PRICING_DATA = [
  {
    id: PricingPlan.STUDENT,
    title: "Succès Académique",
    price: "2 000 FCFA",
    features: [
      "Fiche Audio Zéro Data",
      "Guide d'étude personnalisé",
      "Accès basique au Hub"
    ],
    cta: "Je réussis mes examens"
  },
  {
    id: PricingPlan.ENTREPRENEUR,
    title: "Entrepreneur",
    price: "15k - 50k FCFA",
    features: [
      "Pitch Deck 24h",
      "Sermon Podcast Express",
      "Formalisation Flash"
    ],
    cta: "Je booste mon business"
  },
  {
    id: PricingPlan.EXPERT,
    title: "Expert DAO",
    price: "120 000+ FCFA",
    features: [
      "Décodeur DAO (Marchés Publics)",
      "Analyse stratégique complète",
      "Support prioritaire"
    ],
    cta: "Je gagne des marchés"
  }
];

export const MOCK_ADMIN_CONTENT = [
  {
    id: '1',
    title: 'Résumé Droit Civil L2',
    description: 'Audio de révision rapide pour les partiels.',
    category: ContentCategory.AUDIO,
    url: '#',
    isZeroData: true,
    date: '2023-10-25'
  },
  {
    id: '2',
    title: 'Structure Pitch Deck Investisseurs',
    description: 'Template PDF pour lever des fonds.',
    category: ContentCategory.SLIDE,
    url: '#',
    isZeroData: false,
    date: '2023-10-26'
  }
];