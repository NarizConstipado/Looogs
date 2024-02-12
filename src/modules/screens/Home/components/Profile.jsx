import { Text, View, StyleSheet, Image, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import stylesGlobal from '../../../../css/style';

const styles = StyleSheet.create({
    icon: {
        width: 52,
        height: 52,
        borderRadius: 36,
        opacity: 1
    },
    iconBg: {
        marginTop: 27,
        marginBottom: 34,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 36,
        padding: 3,
    }
});

export default function Profile({ url, isDarkMode, navigation }) {
    if (isDarkMode) {
        return (
            <TouchableNativeFeedback onPress={() => {
                navigation.navigate('Profile');
            }}>
                <View style={[
                    stylesGlobal.bg_w4,
                    styles.iconBg
                ]}>
                    <Image style={styles.icon}
                        source={{
                            uri: url
                        }} />
                </View>
            </TouchableNativeFeedback>
        )
    } else {
        return (
            <View style={[
                stylesGlobal.bg_w2,
                styles.iconBg
            ]}>
                <Image style={styles.icon}
                    source={{
                        uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
                    }} />
            </View>
        )
    }
}
