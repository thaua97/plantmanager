import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Alert,
    Platform,
    ScrollView,
    View,
    Image,
    Text,
    TouchableOpacity

} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { SvgFromUri } from 'react-native-svg';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { PlantInterface } from '../services/interfaces'
import { format, isBefore } from 'date-fns';
import { storePlant } from '../services/storage';
import { Spotlight } from '../components/Spotlight';

interface Params {
    plant: PlantInterface
}

export function PlantSave() {
    const
        [selectedDateTime, setSelectedDateTime] = useState(new Date()),
        [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios'),
        route = useRoute(),
        navigation = useNavigation(),
        { plant } = route.params as Params;

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if(Platform.OS === 'android') {
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro 🕙');
        }

        if(dateTime)
            setSelectedDateTime(dateTime);
    }

    function openDateTimePickerOnAndroid() {
        setShowDatePicker(oldState => !oldState);
    }

    async function handleSaving() {
        try {
            await storePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                complement: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                button: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'Plants'
            });
        } catch {
            Alert.alert('Não foi possivel salvar! 😢');
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.info}>
                    <SvgFromUri
                        uri={plant.photo}
                        width={150}
                        height={150}
                    />
                    <Text style={styles.title}>{plant.name}</Text>
                    <Text style={styles.complement}>{plant.about}</Text>
                </View>

                <View style={styles.controller}>
                    <Spotlight
                        relative
                        text={plant.water_tips}
                    />

                    <Text style={styles.label}>Escolha o melhor horário para ser lembrado:</Text>

                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                        />
                    )}
                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity
                                style={styles.android_button}
                                onPress={openDateTimePickerOnAndroid}
                            >
                                <Text style={styles.android_text}>{`Mudar ${format(selectedDateTime, 'HH:mm')}`}</Text>
                            </TouchableOpacity>
                        )
                    }

                    <Button onPress={handleSaving}>Cadastrar Planta</Button>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    info: {
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        marginTop: 10,
        marginBottom: 15,
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading
    },
    complement: {
        marginTop: 10,
        fontFamily: fonts.text,
        fontSize: 17,
        color: colors.heading,
        textAlign: 'center'
    },
    controller: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
        backgroundColor: colors.white,
    },
    label: {
        marginVertical: 5,
        fontSize: 14,
        fontFamily: fonts.complement,
        textAlign: 'center',
        color: colors.heading,
    },
    android_button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    android_text: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }

})