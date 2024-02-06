// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from 'zustand';

import type { ICodes } from '../interfaces/ICodes';

interface GlobalState {
  isCreate: boolean;
  setIsCreate: (value: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  selectedCode: Partial<ICodes>;
  setSelectedCode: (code: Partial<ICodes>) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  isCreate: false,
  setIsCreate: (value: boolean) => set({ isCreate: value }),
  isModalOpen: false,
  setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),
  selectedCode: {},
  setSelectedCode: (code: Partial<ICodes>) => set({ selectedCode: code }),
  searchQuery: '',
  setSearchQuery: (value: string) => set({ searchQuery: value })
}));

export default useGlobalStore;
