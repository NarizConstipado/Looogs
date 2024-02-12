import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import stylesGlobal from '../../../../css/style'


export default function ButtonAction({ text, action, children }) {
    return (
        <TouchableNativeFeedback onPress={action}>
            <View style={[styles.container, stylesGlobal.border_bg4, stylesGlobal.bg_bg8]}>
                {children}
                <Text style={[styles.text, stylesGlobal.font_bodySmall, stylesGlobal.color_w1]}>{text}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 5,
        borderRadius: 20,
        alignItems: 'center',

    },
    text: {
        marginLeft: 4,
    }
})