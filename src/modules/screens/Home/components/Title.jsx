import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import stylesGlobal from '../../../../css/style'

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 8,
        paddingRight: 8,
    }
});

export default function Title({ title, isDarkMode }) {
    if (isDarkMode) {
        return (
            <View style={[
                styles.container,
                stylesGlobal.bg_bgTransparent
            ]}>
                <Text style={[
                    stylesGlobal.color_w1,
                    stylesGlobal.font_h3
                ]}>
                    {title}
                </Text>
            </View>
        )
    } else {
        return (
            <View style={[
                styles.container,
                stylesGlobal.bg_bgTransparentLight
            ]}>
                <Text style={[
                    stylesGlobal.color_b1,
                    stylesGlobal.font_h3
                ]}>
                    {title}
                </Text>
            </View>
        )
    }
}
