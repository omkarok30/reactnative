import { SelectedService } from "./types";

export const useSelectedServices = (services: any[], value: string[]) => {
  const selectedServicesData: SelectedService[] = value.map(serviceName => {
    return {
      name: serviceName,
    };
  });

  return selectedServicesData;
};