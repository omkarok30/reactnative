import { create } from 'zustand';
import Toast from 'react-native-toast-message';

interface ToastStore {
    showToast: (type: 'success' | 'error' | 'info', text1: string, text2?: string) => void;
}

export const useToastStore = create<ToastStore>(() => ({
    showToast: (type, text1, text2) => {
        Toast.show({ type, text1, text2 });
    },
}));
