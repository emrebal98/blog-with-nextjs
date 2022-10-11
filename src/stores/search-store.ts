import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface SearchState {
  search: string;
  setSearch: (search: string) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>()(
  devtools((set) => ({
    search: '',
    setSearch: (search: string) => set({ search }),
    clearSearch: () => set({ search: '' }),
  }))
);
