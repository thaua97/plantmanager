import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text

} from 'react-native';

import { SpotlightProps } from '../services/interfaces';

import Waterdrop from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Spotlight({text, relative, background = true}: SpotlightProps ){
    return (
        <View
            style={[
                styles.tip,
                relative && styles.tip_relative,
                background && styles.tip_background,
            ]}
        >
            <Image
                source={Waterdrop}
                style={styles.tip_image}
            />
            <Text style={styles.tip_text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tip: {
        marginVertical: 20,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20
    },
    tip_relative: {
        position: 'relative',
        bottom: 60,
        marginVertical: 0
    },
    tip_background: {
        backgroundColor: colors.blue_light,
    },
    tip_image: {
        width: 56,
        height: 56,
    },
    tip_text: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        fontSize: 17,
        textAlign: 'justify',
        color: colors.blue
    },
})