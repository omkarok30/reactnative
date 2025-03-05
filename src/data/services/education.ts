import { ServiceCategory } from './types';

export const educationServices: ServiceCategory = {
  id: 5,
  name: "Éducation, Formation et Services Numériques",
  description: "Réunit la transmission de connaissances et les services digitaux ou informatiques.",
  subcategories: [
    {
      id: 6,
      name: "Éducation et formation",
      services: [
        "Enseignant(e) à domicile",
        "Professeur de langues",
        "Formateur informatique",
        "Coach en développement personnel",
        "Instructeur d'arts traditionnels",
        "Professeur de musique/danse",
        "Éducateur spécialisé"
      ]
    },
    {
      id: 9,
      name: "Services numériques et technologiques",
      services: [
        "Informaticien à domicile",
        "Réparateur de smartphones",
        "Installateur de réseaux",
        "Formateur en outils digitaux",
        "Dépanneur informatique",
        "Conseiller en solutions digitales",
        "Community Manager"
      ]
    }
  ]
};