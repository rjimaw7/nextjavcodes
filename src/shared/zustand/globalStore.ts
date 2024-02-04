// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from 'zustand';

interface GlobalState {
  isCreate: boolean;
  setIsCreate: (value: boolean) => void;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  isCreate: false,
  setIsCreate: (value: boolean) => set({ isCreate: value }),
  isEdit: false,
  setIsEdit: (value: boolean) => set({ isEdit: value })
}));

export default useGlobalStore;
