import { processFontFamily } from 'expo-font';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    children: any;
}

export function Button({ children, ...rest} : ButtonProps ) {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            {...rest}
        >
            <Text style={styles.buttonText}>
                { children }
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 10,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        minWidth: 56,
        borderRadius: 16,
        backgroundColor: colors.green
    },

    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: fonts.heading
    }
})

