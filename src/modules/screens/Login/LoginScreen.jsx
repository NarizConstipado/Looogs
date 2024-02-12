import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { DarkModeContext } from '../../../App'
import {
    GoogleOneTapSignIn,
    GoogleOneTapSignInButton,
    statusCodes,
} from 'react-native-google-one-tap-signin';

GoogleOneTapSignIn.configure({
    webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
});

import stylesGlobal from '../../../css/style'
import { Select_Option } from '../../components/Svg'
import { login } from '../../../../api/user.jsx'
import { storeData } from '../../../utilities/utilities.jsx';

export default function LoginScreen({ navigation }) {

    const { darkMode, setDarkMode } = useContext(DarkModeContext)
    const [nextStep, setNextStep] = useState(false)
    const [isGoogle, setIsGoogle] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: darkMode ? stylesGlobal.bg_b3.backgroundColor : stylesGlobal.bg_w3.backgroundColor,
            height: '100%',
        },
        text: {
            color: darkMode ? stylesGlobal.color_w1.color : stylesGlobal.color_b1.color
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 45
        },
        interactiveContainer: {
            height: '70%',
            justifyContent: 'space-between',
        },
        input: {
            width: 300,
            backgroundColor: darkMode ? stylesGlobal.bg_b4.backgroundColor : stylesGlobal.bg_w4.backgroundColor,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: darkMode ? stylesGlobal.border_b2.borderColor : stylesGlobal.border_w2.borderColor,
            color: darkMode ? stylesGlobal.color_w4.color : stylesGlobal.color_b4.color,
            marginLeft: 45,
            paddingLeft: 20
        },
        googleButton: {
            height: 64,
            width: 300,
            borderRadius: 8,
            borderWidth: 1,
            marginLeft: 45
        },
        buttonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },
        button: {
            width: 175,
            height: 45,
            backgroundColor: stylesGlobal.bg_bl2.backgroundColor,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: stylesGlobal.bg_bl3.backgroundColor,
            color: stylesGlobal.color_bg8.color,
            justifyContent: 'center',
            alignItems: 'center',
        }
    })

    const handleLogin = async () => {
        await login(username, password)
            .then((res) => {
                if (res.login == "Invalid credentials. Please try again") {
                    return Alert.alert("Invalid credentials. Please try again")
                }
                else {
                    storeData('token',res.login)
                    navigation.navigate('Home')
                }
            })
            .then(navigation.navigate('Home'))
            .catch(err => console.error(err))
    }

    return (
        <View style={styles.mainContainer}>

            {/* Header */}
            <View style={styles.header}>
                <View style={{ transform: [{ scaleX: -1 }] }} >
                    <TouchableOpacity onPress={() => {
                        setNextStep(false)
                    }
                    }>
                        {nextStep ? <Select_Option color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1} /> : <></>}
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={[styles.text, stylesGlobal.font_h1]}>Looogs</Text>
                </View>
            </View>

            {/* Interactive Container */}
            <View style={styles.interactiveContainer}>

                <View style={{ height: '70%', justifyContent: 'space-around' }}>
                    <View>
                        <Text style={[styles.text, stylesGlobal.font_titleHuge, { marginLeft: 45 }]}>Log In</Text>
                    </View>
                    {/* Inputs */}
                    <View style={{ height: '60%', justifyContent: 'space-evenly' }}>
                        <TextInput style={styles.input} placeholder='@username' onChange={(e) => { setUsername(e.nativeEvent.text) }} placeholderTextColor={darkMode ? stylesGlobal.color_w4.color : stylesGlobal.color_b4.color} />
                        {nextStep ?
                            <TextInput
                                onChange={(e) => { setPassword(e.nativeEvent.text) }}
                                style={styles.input}
                                placeholder='Password'
                                secureTextEntry
                                placeholderTextColor={darkMode ? stylesGlobal.color_w4.color : stylesGlobal.color_b4.color} />
                            :
                            <GoogleOneTapSignInButton
                                style={styles.googleButton}
                                size={GoogleOneTapSignInButton.Size.Wide}
                                color={GoogleOneTapSignInButton.Color.Dark}
                                onPress={() => {
                                    Alert.alert('Feature is not available')
                                    setIsGoogle(true)
                                }}
                                disabled={isGoogle} />
                        }
                    </View>
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <View>
                        {nextStep ?
                            <TouchableOpacity onPress={() => { Alert.alert('Feature is not available') }}>
                                <Text style={[styles.text, stylesGlobal.font_bodyLarge]}>Forgot Password?</Text>
                                <View style={{ height: 1, width: '100%', backgroundColor: stylesGlobal.color_bl1.color }} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => { navigation.navigate('Register') }}>
                                <Text style={[styles.text, stylesGlobal.font_bodyLarge]}>Register</Text>
                                <View style={{ height: 1, width: '100%', backgroundColor: stylesGlobal.color_bl1.color }} />
                            </TouchableOpacity>}

                    </View>
                    <View>

                        {
                            nextStep ?
                                <TouchableOpacity onPress={() => { password != null ? handleLogin() : Alert.alert('Password field is empty!') }}>
                                    <View style={[styles.button, { width: 100 }]}>
                                        <Text style={stylesGlobal.font_h3}>Log In</Text>
                                    </View>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => {
                                    if (username != null) setNextStep(true)
                                    else Alert.alert('Username field is empty!')
                                }
                                }>
                                    <View style={styles.button}>
                                        <Text style={stylesGlobal.font_h3}>Next</Text>
                                    </View>
                                </TouchableOpacity>
                        }

                    </View>
                </View>

            </View>

        </View>
    )
}
