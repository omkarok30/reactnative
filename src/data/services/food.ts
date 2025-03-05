import { ServiceCategory } from './types';

export const foodServices: ServiceCategory = {
  id: 3,
  name: "Alimentation et Événementiel",
  description: "Rassemble la préparation de repas, la restauration et tout ce qui concerne l'organisation d'événements.",
  subcategories: [
    {
      id: 3,
      name: "Alimentation et cuisine",
      services: [
        "Cuisinier(ère) à domicile",
        "Traiteur",
        "Nutritionniste en cuisine locale",
        "Préparateur de repas pour bébés",
        "Chef spécialisé en régimes particuliers",
        "Vendeur ambulant de repas",
        "Transformateur de produits alimentaires"
      ]
    },
    {
      id: 11,
      name: "Services événementiels",
      services: [
        "Organisateur de cérémonies",
        "Décorateur d'événements",
        "Animateur",
        "Griot/Conteur",
        "Musicien traditionnel",
        "Photographe ambulant",
        "Vidéaste",
        "DJ mobile / Technicien son et lumière"
      ]
    }
  ]
};