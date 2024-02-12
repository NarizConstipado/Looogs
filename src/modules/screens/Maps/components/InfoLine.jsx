import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import stylesGlobal from '../../../../css/style';

export default function InfoLine({ text, children }) {
    return (
        <View style={styles.infoLine}>
            {children}
            <TouchableWithoutFeedback onPress={() => Clipboard.setString(text)}>
                <Text style={[styles.infoText, stylesGlobal.font_bodySmall,
                stylesGlobal.color_w1]}>
                    {text}
                </Text>
            </TouchableWithoutFeedback>
        </View>
    )
}
const styles = StyleSheet.create({
    infoLine: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: 'center',
    },
    infoText: {
        marginLeft: 12
    }
})