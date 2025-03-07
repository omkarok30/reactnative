import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

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

const ToastNotification = () => {
    return (
        <Toast config={toastConfig} />
    )
}

export default ToastNotification