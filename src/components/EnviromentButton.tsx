import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function EnviromentButton({
    title,
    active = false,
    ...rest
} : EnviromentButtonProps) {
    return (
        <RectButton
            style={[
                styles.button,
                active && styles.button_active
            ]}
            {...rest}
        >
            <Text style={[
                styles.title,
                active && styles.title_active
            ]}>
                {title}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    button: {
        marginRight: 8,
        width: 75,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: colors.shape
    },
    button_active: {
        backgroundColor: colors.green_light
    },
    title: {
        fontFamily: fonts.text,
        color: colors.heading
    },
    title_active: {
        fontFamily: fonts.heading,
        color: colors.green_dark,
    }
})