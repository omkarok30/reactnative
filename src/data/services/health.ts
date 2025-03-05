import { ServiceCategory } from './types';

export const healthServices: ServiceCategory = {
  id: 2,
  name: "Santé, Beauté et Bien-être",
  description: "Couvre tous les métiers liés aux soins corporels, à l'accompagnement et aux pratiques thérapeutiques.",
  subcategories: [
    {
      id: 2,
      name: "Soins à la personne",
      services: [
        "Nourrice/Garde d'enfants",
        "Assistante maternelle",
        "Aide aux personnes âgées ou handicapées",
        "Infirmier(ère) / Aide-soignant(e) à domicile",
        "Esthéticien(ne)",
        "Coiffeur(se)",
        "Masseur(se)",
        "Coach sportif"
      ]
    },
    {
      id: 7,
      name: "Santé et bien-être traditionnels",
      services: [
        "Guérisseur traditionnel",
        "Herboriste",
        "Sage-femme traditionnelle",
        "Praticien en médecine douce",
        "Conseiller en santé naturelle",
        "Thérapeute traditionnel"
      ]
    }
  ]
};