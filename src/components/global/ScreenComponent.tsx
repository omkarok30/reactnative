import React, { ReactNode } from 'react';
import { Platform, View, Dimensions, ViewStyle } from 'react-native';

const { height } = Dimensions.get('window');

interface ScreenComponentProps {
    style?: ViewStyle;
    children: ReactNode;
}

const ScreenComponent: React.FC<ScreenComponentProps> = ({ style, children }) => {
    const paddingTop = Platform.OS === 'ios' ? height * 0.06 : 10;

    return (
        <View style={[{ flex: 1, paddingTop }, style]}>
            {children}
        </View>
    );
};

export default ScreenComponent;
