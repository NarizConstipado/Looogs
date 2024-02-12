import { Text, View, StyleSheet, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import stylesGlobal from '../../../../css/style'
import { getLocationById } from '../../../../../api/maps';
import { getNoteById } from '../../../../../api/home';

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: 3
    }
});

export default function SearchResult({ id, title, icon, isDarkMode, navigation }) {
    if (isDarkMode) {
        if (icon) {
            return (
                <TouchableNativeFeedback onPress={() => {
                    getNoteById(id).then((note) => {
                        navigation.navigate('NoteDetail', { note: note.getNoteById })
                    })
                }}>
                    <View style={[
                        styles.container,
                        stylesGlobal.bg_bgTransparent
                    ]}>
                        <Text style={[
                            stylesGlobal.color_w1,
                            stylesGlobal.font_body
                        ]}>
                            {String.fromCodePoint(parseInt(`0x${icon.replace('U+', '')}`))} {title}
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            )
        } else {
            return (
                <TouchableNativeFeedback onPress={() => {
                    getLocationById(id).then((location) => {
                        navigation.navigate('Maps', { location: location.getLocationById })
                    });
                }}>
                    <View style={[
                        styles.container,
                        stylesGlobal.bg_bgTransparent
                    ]}>
                        <Text style={[
                            stylesGlobal.color_w1,
                            stylesGlobal.font_body
                        ]}>
                            {title}
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            )

        }
    } else {
        return (
            <View style={[
                styles.container,
                stylesGlobal.bg_bgTransparentLight
            ]}>
                <Text style={[
                    stylesGlobal.color_b1,
                    stylesGlobal.font_body
                ]}>
                    {icon ? String.fromCodePoint(parseInt(`0x${icon.replace('U+', '')}`)) : undefined} {title}
                </Text>
            </View>
        )
    }
}
