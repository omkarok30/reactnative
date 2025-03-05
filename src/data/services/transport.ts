import { ServiceCategory } from './types';

export const transportServices: ServiceCategory = {
  id: 6,
  name: "Transport et Services Commerciaux",
  description: "Concerne la mobilité, la logistique et les activités commerciales ou financières.",
  subcategories: [
    {
      id: 8,
      name: "Transport et livraison",
      services: [
        "Chauffeur personnel",
        "Moto-taxi",
        "Coursier",
        "Livreur à domicile",
        "Transporteur de marchandises",
        "Déménageur"
      ]
    },
    {
      id: 10,
      name: "Services commerciaux",
      services: [
        "Agent immobilier informel",
        "Vendeur à domicile",
        "Collecteur d'argent mobile",
        "Agent de microfinance",
        "Conseiller en achats",
        "Courtier local",
        "Distributeur itinérant de recharges/services financiers"
      ]
    }
  ]
};