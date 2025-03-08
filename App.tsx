import { QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from '@/navigation/Navigation';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalHost } from '@rn-primitives/portal';
import { queryClient } from '@/hooks/queryClient';
import ToastNotification from '@/components/ToastNotification';
import "./global.css"; import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/integrations/supabase/client";
;

export default function App() {
  const setAuth = useAuthStore(state => state.setAuth)
  const unsubscribeAuth = useAuthStore((state) => state.unsubscribeAuth);
  const colorScheme = useColorScheme();


  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      // console.log(session)
      setAuth(session?.user, session);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // console.log(session)
      setAuth(session?.user ?? null, session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
              <Navigation />
              <ToastNotification />
            </ThemeProvider>
            {/* Default Portal Host (one per app) */}
            <PortalHost />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </>
  );
}