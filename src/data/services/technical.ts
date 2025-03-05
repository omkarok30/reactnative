import { ServiceCategory } from './types';

export const technicalServices: ServiceCategory = {
  id: 4,
  name: "Artisanat et Services Techniques",
  description: "Englobe les métiers manuels, de réparation, de maintenance et de travaux techniques.",
  subcategories: [
    {
      id: 4,
      name: "Artisanat et réparation",
      services: [
        "Couturier(ère)",
        "Tailleur",
        "Cordonnier",
        "Réparateur d'appareils électroniques/électroménager",
        "Menuisier",
        "Tapissier-décorateur",
        "Vitrier"
      ]
    },
    {
      id: 5,
      name: "Services techniques",
      services: [
        "Électricien",
        "Plombier",
        "Technicien climatisation/énergie solaire",
        "Mécanicien ambulant",
        "Soudeur",
        "Maçon pour petits travaux",
        "Peintre en bâtiment"
      ]
    }
  ]
};