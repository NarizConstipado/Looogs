import { Text, View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import stylesGlobal from '../../../../css/style'

const styles = StyleSheet.create({
    container: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 18,
    },
    containerPressed: {

    },
    icon: {
        width: 72,
        height: 72,
        borderRadius: 36,
        opacity: 1
    },
    iconBgDark: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 36,
        width:72,
        height:72,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBgLight: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 36,
    },
    title: {
        marginTop: 10,
    },
});

export default function CardHome({ title, iconURL, isDarkMode, onPress, children }) {
    if (isDarkMode) {
        return (
            <TouchableNativeFeedback onPress={onPress}>
                <View style={[styles.container,
                stylesGlobal.bg_bgTransparent
                ]}>
                    <View style={styles.iconBgDark}>
                        {children ?
                            children :
                            iconURL ?
                                <Image style={styles.icon}
                                    source={{
                                        uri: iconURL
                                    }} />
                                : undefined
                        }
                    </View>
                    <Text style={[styles.title,
                    stylesGlobal.color_w1,
                    stylesGlobal.font_subtitle
                    ]}>
                        {title}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        )
    } else {
        return (
            <View style={[styles.container,
            stylesGlobal.bg_bgTransparentLight
            ]}>
                <View style={styles.iconBgLight}>
                    <Image style={styles.icon}
                        source={{
                            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
                        }} />
                </View>
                <Text style={[styles.title,
                stylesGlobal.color_b1,
                stylesGlobal.font_subtitle
                ]}>
                    {title}
                </Text>
            </View>
        )

    }
}
