import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { navigate } from '@/utils/NavigationUtils';
import { supabase } from '@/integrations/supabase/client';

type AuthState = {
    user: any | null;
    session: any | null;
    setAuth: (user: any, session: any) => void;
    logout: () => void;
    // checkUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
    devtools(persist(
        (set) => ({
            user: null,
            session: null,
            setAuth: (userData, sessionData) => set({ user: userData, session: sessionData }),
            logout: async () => {
                await supabase.auth.signOut();
                set({ user: null });
                navigate("loginScreen")
            },

            // checkUser: async () => {
            //     const { data } = await supabase.auth.getSession();
            //     console.log("data", data)
            //     // set({ user: data.user ?? null });
            //     // supabase.auth.onAuthStateChange((_event, session) => {
            //     //     if (session) {
            //     //         set({ user: session.user, session });
            //     //     } else {
            //     //         set({ user: null, session: null });
            //     //     }
            //     // });
            // },
        }),
        {
            name: "auth-storage", // Storage key
            storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage
        }
    ))
);
