import { create } from 'zustand';

interface IsOpen {
  isOpen: boolean;
  setIsOpen: (term: boolean) => void;
}

const useDrawer = create<IsOpen>((set) => ({
  isOpen: false,
  setIsOpen: (term) => set({ isOpen: term }),
}));

export default useDrawer;
