import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated
} from 'react-native';
import { PlantsCardProps } from '../services/interfaces';

import { RectButton } from 'react-native-gesture-handler';
import  Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Feather } from '@expo/vector-icons';


export const PlantsCardPrimary = ({data, ...rest}: PlantsCardProps) => {
    return (
        <RectButton
            style={styles.card}
            {...rest}
        >
            <SvgFromUri
                uri={data.photo}
                width={80}
                height={80}
            />
            <Text style={styles.content}>
                {data.name}
            </Text>
        </RectButton>
    )
}

export const PlantsCardSecondary= ({data, handleDelete, ...rest}: PlantsCardProps) => {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.delete}
                            onPress={handleDelete}
                        >
                            <Feather name="trash" size={32} color={colors.white}/>
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton
                style={styles.card_secondary}
                {...rest}
            >
                <SvgFromUri
                    uri={data.photo}
                    width={60}
                    height={60}
                />
                <Text style={styles.title}>
                    {data.name}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.time_label}>
                        Regar às
                    </Text>
                    <Text style={styles.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    )
}


const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 10,
        padding: 20,
        alignItems: 'center',
        maxWidth: '45%',
        borderRadius: 20,
        backgroundColor: colors.shape,
    },
    card_secondary: {
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 25,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 20,
        backgroundColor: colors.shape,
    },
    content: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
        marginVertical: 16
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading,
    },
    details: {
        alignItems: 'flex-end'
    },
    time: {
        marginTop: 5,
        fontFamily: fonts.heading,
        fontSize: 16,
        color: colors.body_dark
    },
    time_label: {
        fontFamily: fonts.text,
        fontSize: 16,
        color: colors.body_light
    },
    delete: {
        position: 'relative',
        right: 20,
        marginTop: 15,
        paddingLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 90,
        borderRadius: 20,
        backgroundColor: colors.red

    }
})