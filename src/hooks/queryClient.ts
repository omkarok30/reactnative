import { QueryClient } from "@tanstack/react-query";

// Create a client
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            staleTime: 1000 * 60, // 1 minute
        },
    },
});