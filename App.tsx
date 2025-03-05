
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Navigation from '@/navigation/Navigation';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { navigationRef } from '@/utils/NavigationUtils';
import { PortalHost } from '@rn-primitives/portal';
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        backgroundColor: "#D1FAE5", // Light green background
      }}
      text1Style={{
        flexWrap: "wrap",
        fontSize: 14,
        fontWeight: "bold",
        color: "green",
      }}
      text2Style={{
        flexWrap: "wrap",
        fontSize: 12,
        color: "#065F46", // Darker green
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "red",
        backgroundColor: "#FEE2E2", // Light red background
      }}
      text1Style={{
        flexWrap: "wrap",
        fontSize: 14,
        fontWeight: "bold",
        color: "red",
      }}
      text2Style={{
        flexWrap: "wrap",
        fontSize: 12,
        color: "#7F1D1D", // Darker red
      }}
    />
  ),
};

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
              <Navigation />
              <Toast config={toastConfig} />
            </ThemeProvider>
            {/* Default Portal Host (one per app) */}
            <PortalHost />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </>
  );
}