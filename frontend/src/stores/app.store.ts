import { create } from "zustand";

interface AppStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  projectsQuantity: number;
  setProjectsQuantity: (projectsQuantity: number) => void;
  serviceOrdersQuantity: number;
  setServiceOrdersQuantity: (serviceOrdersQuantity: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isLoading: false,
  projectsQuantity: 0,
  serviceOrdersQuantity: 0,
  setIsLoading: (isLoading) => set({ isLoading }),
  setProjectsQuantity: (projectsQuantity) => set({ projectsQuantity }),
  setServiceOrdersQuantity: (serviceOrdersQuantity) =>
    set({ serviceOrdersQuantity }),
}));
