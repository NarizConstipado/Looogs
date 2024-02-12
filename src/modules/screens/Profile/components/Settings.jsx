import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View, Alert } from 'react-native'

import stylesGlobal from '../../../../css/style'
import { Bell, Moon, Shield, Planet, SwitchOff, SwitchOn, Select_Option, Close, Check } from '../../../components/Svg';
import { BlurView } from '@react-native-community/blur';
import languages from '../../../../utilities/languages.json'
import { DarkModeContext } from '../../../../App.jsx'
import { editMe } from '../../../../../api/user.jsx'

export default function Settings() {


    const {darkMode, setDarkMode} = useContext(DarkModeContext)


    // const [darkMode, setDarkMode] = useState(true)
    const [isNotificationsOn, setIsNotificationsOn] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [switchLanguage, setSwitchLanguage] = useState(false)
    const [allLanguages, setAllLanguages] = useState(languages.languages)
    const [language, setLanguage] = useState('English')
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)


    const styles = StyleSheet.create({
        mainContainer: {
            height: 258,
            backgroundColor: darkMode ? stylesGlobal.bg_b4.backgroundColor : stylesGlobal.bg_w4.backgroundColor,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            justifyContent: 'center',
            alignContent: 'center',
            marginBottom: 30
        },        
        text: {
            color: darkMode ? stylesGlobal.color_w1.color : stylesGlobal.color_b1.color,
        },
        settings: {
            height: '80%',
            justifyContent: 'space-evenly',
        },
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 30
        },
        innerContainerLeft: {
            flexDirection: 'row',
            justifyContent: 'space-around',

        },
        innerContainerLeftText: {
            marginLeft: 10,
            alignItems: 'center',
        },
        innerContainerRightButtons: {
            marginRight: 20
        },
        innerContainerRight: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginRight: 30
        },
        editInfo: {
            flexDirection: 'column',
            width: '90%',
            height: '70%',
            alignSelf: 'center',
            justifyContent: 'space-evenly',
        },
        editInfoContainer : {
            alignItems: 'flex-start',
        },
        editLabels: {
            alignSelf: 'flex-start',
            marginBottom: 5
        },
        editPassword: {
            width: 310,
            height: 200,
            backgroundColor: stylesGlobal.bg_bg7.backgroundColor,
            borderColor: stylesGlobal.bg_bg5.backgroundColor,
            borderWidth: 2,
            borderRadius: 20,
            alignSelf: 'center',
            marginTop: 90
        },
        blur: {
            width: 310,
            height: 400,
            alignSelf: 'center',
            marginTop: 90,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 24,
            marginBottom: 0
        },
        inputs: {
            height: 36,
            backgroundColor: darkMode ? stylesGlobal.color_b3.color : stylesGlobal.color_w3.color,
            borderRadius: 8,
            borderColor: darkMode ? stylesGlobal.color_b6.color : stylesGlobal.color_w5.color,
            borderWidth: 2,
            padding: 10,
        },
        largeInputs: {
            width: 280,
        },
        smallInputs: {
            width: 135,
        },
        editLanguage: {
            width: 310,
            height: 400,
            backgroundColor: stylesGlobal.bg_bg7.backgroundColor,
            borderColor: stylesGlobal.bg_bg5.backgroundColor,
            borderWidth: 2,
            borderRadius: 20,
            alignSelf: 'center',
            marginTop: 80,
            paddingLeft: 10
        },
    })

    const toggleMuteSwitch = () => {
        if(isNotificationsOn) {
            return (
                <SwitchOn />
            )
        } else {
            return (
                <SwitchOff />
            )
        }
    }

    const toggleDarkSwitch = () => {
        if(darkMode){
            return(
                <SwitchOn />
            )
        } else {
            return(
                <SwitchOff />
            )
        }
    }

    const handleMuteSwitcher = () => {
        if(isNotificationsOn){
            setIsNotificationsOn(false)
        } else {
            setIsNotificationsOn(true)
        }
    }

    const editUserPassword = async () => {
        const input = {
            password: password,
        }

        try{
            const result = await editMe(input)
            setEditPassword(!editPassword)
            Alert.alert('Password changed!')
        } catch (err) {
            console.log(err);
        }
    }

    const handlePasswordConfirmation = () => {
        if(password == confirmPassword){
            editUserPassword()
        } else {
            Alert.alert('Your passwords are different')
        }
    }

    const handleLanguage = (name) => {
        setLanguage(name)
        setSwitchLanguage(false)
    }

  return (
    <View style={styles.mainContainer}>
        <View>

            <Text style={[stylesGlobal.font_bodyBold, styles.text, {marginLeft: 30}]}>Settings</Text>
            <View style={styles.settings}>
                <View style={styles.container}>
                    <View style={styles.innerContainerLeft}>
                        <Bell color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                        <Text style={[stylesGlobal.font_bodyBold, styles.text, styles.innerContainerLeftText]}>Mute Notifications</Text>
                    </View>
                    <View style={styles.innerContainerRight}>
                        <TouchableOpacity activeOpacity={0.3} onPress={handleMuteSwitcher}>
                            {toggleMuteSwitch()}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.innerContainerLeft}>
                        <Moon color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                        <Text style={[stylesGlobal.font_bodyBold, styles.text, styles.innerContainerLeftText]}>Night Mode</Text>
                    </View>
                    <View style={styles.innerContainerRight}>
                        <TouchableOpacity activeOpacity={0.3} onPress={() => {setDarkMode(prevMode => !prevMode)}}>
                            {toggleDarkSwitch()}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.innerContainerLeft}>
                        <Shield color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                        <Text style={[stylesGlobal.font_bodyBold, styles.text, styles.innerContainerLeftText]}>Change Password</Text>
                    </View>
                    <View style={styles.innerContainerRight}>
                        <TouchableOpacity onPress={() => {setEditPassword(true)}}>
                            <Select_Option color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                        </TouchableOpacity>

                        {/* Change Password Modal */}
                        <Modal animationType='fade' transparent={true} visible={editPassword} onRequestClose={() => {setEditPassword(false)}}>
                            <BlurView style={[styles.blur]} blurType="extraDark" blurRadius={10} reducedTransparencyFallbackColor="white">
                                <View style={styles.editPassword}>

                                    {/* Edit Password Section */}
                                    <View style={styles.headerContainer}>
                                        <TouchableOpacity onPress={() => {setEditPassword(false)}}>
                                            <Close color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handlePasswordConfirmation}>
                                            <Check color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.editInfo}>
                                        <View style={styles.editInfoContainer}>
                                            <Text style={[styles.text, stylesGlobal.font_bodySmall, styles.editLabels]}>Password</Text>
                                            <TextInput style={[styles.largeInputs, styles.text, styles.inputs]} secureTextEntry={true} onChange={(e) => {setPassword(e.nativeEvent.text)}}/>
                                        </View>
                                        <View style={styles.editInfoContainer}>
                                            <Text style={[styles.text, stylesGlobal.font_bodySmall, styles.editLabels]}>Confirm Password</Text>
                                            <TextInput style={[styles.largeInputs, styles.text, styles.inputs]} secureTextEntry={true} onChange={(e) => {setConfirmPassword(e.nativeEvent.text)}}/>
                                        </View>
                                    </View>
                                </View>
                            </BlurView>
                        </Modal>

                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.innerContainerLeft}>
                        <Planet color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                        <Text style={[stylesGlobal.font_bodyBold, styles.text, styles.innerContainerLeftText]}>Language</Text>
                    </View>
                    <View style={styles.innerContainerRight}>
                        <Text style={[stylesGlobal.font_bodyBold, styles.text, styles.innerContainerRightButtons]}>{language}</Text>
                        <TouchableOpacity onPress={() => {setSwitchLanguage(true)}}>
                            <Select_Option color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1} />
                        </TouchableOpacity>

                        {/* Switch Language*/}

                        <Modal animationType='fade' transparent={true} visible={switchLanguage} onRequestClose={() => {setSwitchLanguage(false)}}>
                            <BlurView style={[styles.blur]} blurType="extraDark" blurAmount={15} blurRadius={10} reducedTransparencyFallbackColor="white">
                                <View style={styles.editLanguage}>

                                    {/* Switch Language Section */}
                                    <View>
                                        <ScrollView>
                                            {allLanguages.map((language, i) => (
                                                <View key={i}>
                                                    <TouchableOpacity onPress={() => {handleLanguage(language.name)}}>
                                                        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, stylesGlobal.font_bodyLarge, {padding: 5}]}>{language.name}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </View>
                            </BlurView>
                        </Modal>

                    </View>
                </View>
            </View>
        </View>
    </View>
  )
}
