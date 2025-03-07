import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { navigate } from '@/utils/NavigationUtils';
import { supabase } from '@/integrations/supabase/client';

type AuthState = {
    isAuthenticated: boolean,
    user: any | null;
    session: any | null;
    setAuth: (user: any, session: any) => void;
    logout: () => void;
    checkUser: () => Promise<void>;
    unsubscribeAuth: () => void; // Add unsubscribe function
};

export const useAuthStore = create<AuthState>()(
    devtools(persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            session: null,
            unsubscribeAuth: () => { }, // Placeholder to avoid errors,
            setAuth: (userData, sessionData) => set({ user: userData, session: sessionData, isAuthenticated: !!sessionData }),
            logout: async () => {
                await supabase.auth.signOut();
                set({ user: null });
                navigate("Reserve")
            },
            checkUser: async () => {
                const { data: { session } } = await supabase.auth.getSession();
                console.log(session);
                set({ session: session ?? null, isAuthenticated: !!session });

                const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                    set({
                        user: session?.user ?? null,
                        session: session ?? null,
                        isAuthenticated: !!session
                    });
                });

                // Store unsubscribe function in Zustand
                set({ unsubscribeAuth: () => subscription.unsubscribe() });
            },
        }),
        {
            name: "auth-storage", // Storage key
            storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage
        }
    ))
);
