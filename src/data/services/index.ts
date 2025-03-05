import { ServiceCategory } from './types';
import { domesticServices } from './domestic';
import { healthServices } from './health';
import { foodServices } from './food';
import { technicalServices } from './technical';
import { educationServices } from './education';
import { transportServices } from './transport';

export * from './types';

export const serviceCategories: ServiceCategory[] = [
  domesticServices,
  healthServices,
  foodServices,
  technicalServices,
  educationServices,
  transportServices
];