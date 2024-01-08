import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@supabase/supabase-js";

interface UserState {
  user: User | undefined;
  setUser: (user: any) => void;
}

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    user: undefined,
    setUser: (user) => set(() => ({ user })),
  }))
);
