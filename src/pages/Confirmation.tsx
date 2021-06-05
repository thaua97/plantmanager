import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Button } from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/core';
import { ConfirmationInterface } from '../services/interfaces';

const emojis = {
    hug: '🤗',
    smile: '😄'
};

export function Confirmation() {
    const
        navigation = useNavigation(),
        routes = useRoute(),
        {
            title,
            complement,
            button,
            icon,
            nextScreen
        } = routes.params as ConfirmationInterface;

    function handleInit() {
        navigation.navigate(nextScreen)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>{emojis[icon]}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{complement}</Text>
                <View style={styles.footer}>
                    <Button onPress={handleInit}>{button}</Button>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        padding: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    emoji: {
        fontSize: 78
    },
    title: {
        marginTop: 15,
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        lineHeight: 38,
        color: colors.heading
    },
    subtitle: {
        paddingHorizontal: 10,
        fontSize: 17,
        fontFamily: fonts.text,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 28
    },
    footer: {
        marginTop: 20,
        paddingHorizontal: 50,
        width: '100%'
    }
})

