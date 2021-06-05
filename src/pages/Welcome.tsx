import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

import { useNavigation } from '@react-navigation/core'

import { Feather } from '@expo/vector-icons';

import wateringImg from '../assets/watering.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome() {
    const navigation = useNavigation();

    function handlerStart() {
        navigation.navigate('UserIndentification');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.heading}>
                    Gerencie {'\n'} suas plantas de {'\n'} forma fácil
                </Text>

                <Image
                    source={wateringImg}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.subheading}>
                    Não esqueça mais de regar suas plantas. {'\n'}
                    Nós cuidamos de lembrar você sempre que {'\n'} precisar.
                </Text>
                <Button onPress={handlerStart}>
                    <Feather name="chevron-right" style={styles.icon} />
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },

    heading: {
        marginTop: 38,
        fontSize: 32,
        fontFamily: fonts.heading,
        fontWeight: '900',
        textAlign: 'center',
        lineHeight: 34,
        color: colors.heading
    },

    subheading: {
        paddingHorizontal: 20,
        fontSize: 18,
        fontFamily: fonts.text,
        textAlign: 'center',
        color: colors.heading
    },

    image: {
        height: Dimensions.get('window').width * 0.7
    },

    icon: {
        fontSize: 32,
        color: colors.white
    }
})