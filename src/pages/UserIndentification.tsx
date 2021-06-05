import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Button } from '../components/Button';

export function UserIndentification() {
    const
        [name, setName] = useState<string>(),
        [isFocused, setIsFocused] = useState(false),
        [isFilled, setIsFilled] = useState(false),
        navigation = useNavigation();

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    }

    async function handlerSubmit() {
        if(!name)
            return Alert.alert('Me diz como chamar vocé? 🥲');

        await AsyncStorage.setItem('@plantmanager:user', name);

        navigation.navigate('Confirmation', {
            title: 'Prontinho!',
            complement: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
            button: 'Comerçar',
            icon: 'smile',
            nextScreen: 'PlantSelect'
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? '😄' : '😀'}
                                </Text>
                                <Text style={styles.title}>Como podemos{'\n'} chamar você?</Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && {borderColor: colors.green}
                                ]}
                                placeholder="Digite um nome"
                                onChangeText={handleInputChange}
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                            />
                            <View style={styles.form_footer}>
                                <Button onPress={handlerSubmit}>Confirmar</Button>
                            </View>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 54
    },
    header: {
        alignItems: 'center',
    },
    emoji: {
        marginBottom: 20,
        fontSize: 44
    },
    input: {
        marginTop: 50,
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        fontSize: 18,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        fontFamily: fonts.heading,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
    },
    form_footer: {
        marginTop: 40,
        paddingHorizontal: 20,
        width: '100%'
    }
})