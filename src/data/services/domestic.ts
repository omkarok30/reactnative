import { ServiceCategory } from './types';

export const domesticServices: ServiceCategory = {
  id: 1,
  name: "Services Domestiques",
  description: "Regroupe l'ensemble des services d'entretien, de ménage et de soutien à la maison.",
  subcategories: [
    {
      id: 1,
      name: "Personnel de maison et entretien",
      services: [
        "Aide-ménagère",
        "Gouvernante",
        "Blanchisseur",
        "Repasseur",
        "Agent d'entretien",
        "Jardinier",
        "Gardien/Agent de sécurité"
      ]
    }
  ]
};