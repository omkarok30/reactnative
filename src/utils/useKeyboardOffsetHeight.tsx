import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

export default function useKeyboardOffsetHeight() {
    const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0);

    useEffect(() => {
        const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

        const keyboardShowListener = Keyboard.addListener(showEvent, (e) => {
            const height = e.endCoordinates.height;
            setKeyboardOffsetHeight(Math.min(height, 100)); // Limit max height
        });

        const keyboardHideListener = Keyboard.addListener(hideEvent, () => {
            setKeyboardOffsetHeight(0);
        });

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, []);

    return keyboardOffsetHeight;
}
