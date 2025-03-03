import { CommonActions, createNavigationContainerRef, StackActions } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function openLoginModal(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(routeName, params));
    }
}

export async function navigate(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(routeName, params));
    }
}

export async function replace(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(routeName, params));
    }
}

export async function resetAndNavigate(routeName: string) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: routeName }],
            })
        );
    }
}

export async function goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.dispatch(CommonActions.goBack());
    }
}

export async function push(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(routeName, params));
    }
}

export async function prepareNavigation() {
    if (navigationRef.isReady()) {
        console.log("✅ Navigation is ready");
    }
}
