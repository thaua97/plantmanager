import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';

import avatar from '../assets/avatar.jpeg';
import fonts from '../styles/fonts';

export function Header() {
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        getUserName();
    }, []);

    async function getUserName() {
        const name = await AsyncStorage.getItem('@plantmanager:user');

        setUserName(`${name}`);
    };
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.username}>{userName}</Text>
            </View>
            <Image
                source={avatar}
                style={styles.avatar}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 32,
        fontFamily: fonts.text,
        color: colors.heading
    },
    username: {
        fontSize: 32,
        fontFamily: fonts.heading,
        lineHeight: 40,
        color: colors.heading
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        resizeMode: 'contain'
    }
})