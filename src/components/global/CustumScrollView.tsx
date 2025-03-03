import { forwardRef } from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CustomScrollView = forwardRef<any, ScrollViewProps>((props, ref) => {
    const insets = useSafeAreaInsets();

    return (
        <ScrollView
            ref={ref}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            automaticallyAdjustsScrollIndicatorInsets
            contentInsetAdjustmentBehavior="automatic"
            contentInset={{ bottom: insets.bottom }}
            scrollIndicatorInsets={{ bottom: insets.bottom }}
            style={[{ flex: 1 }, props.style]}
            contentContainerStyle={[
                { flexGrow: 1, paddingBottom: insets.bottom + 120 },
                props.contentContainerStyle,
            ]}
            {...props}
        />
    );
});
