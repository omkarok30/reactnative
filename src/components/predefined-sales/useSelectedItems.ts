import { SelectedItem } from "./types";

export const useSelectedItems = (items: any[], value: string[]) => {
  const selectedItemsData: SelectedItem[] = value.map(itemName => {
    return {
      name: itemName,
    };
  });

  return selectedItemsData;
};