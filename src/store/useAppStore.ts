import { create } from "zustand";
import { User } from "../types/user";

interface Store {
  userAuthenticated: User | null;
  setUserAuthenticated: (userAuthenticated: User | null) => void;
}

export const useAppStore = create<Store>((set) => ({
  userAuthenticated: null,
  setUserAuthenticated: (userAuthenticated: User | null) => {
    set((_state) => ({ userAuthenticated }));
  },
}));
