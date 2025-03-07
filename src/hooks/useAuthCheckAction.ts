import { View, Text } from 'react-native'
import React from 'react'
import { useToastStore } from '@/store/useToastStore';
import { useAuthStore } from '@/store/useAuthStore';

const useAuthCheckAction = () => {
    const user = useAuthStore(state => state.user)
    const { showToast } = useToastStore();

    const checkAuthAction = (): boolean => {
        if (!user) {
            showToast('error', "Connexion requise", "Vous devez être connecté pour contacter le vendeur");
            return true;
        }
        return true;
    }

    return checkAuthAction
}

export default useAuthCheckAction