import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import stylesGlobal from '../../../../css/style';

export default function CardSearchLocation({ title, category, address, postalCode, zone, images, setLocationInfo }) {
    return (
        <TouchableNativeFeedback
        onPress={setLocationInfo}>
            <View style={[styles.container, stylesGlobal.bg_b5]}>
                <View style={{
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    width: "70%",
                }}>
                    <Text numberOfLines={2} style={[stylesGlobal.font_h4, stylesGlobal.color_w1]}>{title}</Text>
                    <Text numberOfLines={2} style={[stylesGlobal.font_detail, stylesGlobal.color_w1]}>{category}</Text>
                    <Text numberOfLines={2} style={[stylesGlobal.font_bodySmall, stylesGlobal.color_w1]}>{address}, {postalCode}, {zone}</Text>
                </View>
                <Image style={{ width: "30%", borderTopRightRadius: 8, borderBottomRightRadius: 8 }} source={{ uri: images[0] }} />
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 320,
        flexDirection: 'row',
        borderRadius: 8,
    }
});