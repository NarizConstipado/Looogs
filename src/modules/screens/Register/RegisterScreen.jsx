import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { DarkModeContext } from '../../../App'

import stylesGlobal from '../../../css/style'
import { Select_Option } from '../../components/Svg'
import { register } from '../../../../api/user.jsx'

export default function LoginScreen({ navigation }) {

  const { darkMode, setDarkMode } = useContext(DarkModeContext)
  const [nextStep, setNextStep] = useState(false)
  const [finalStep, setFinalStep] = useState(false)
  const [email, setEmail] = useState(null)
  const [username, setUsername] = useState(null)
  const [name, setName] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [address, setAddress] = useState(null)
  const [balls, setBalls] = useState({
    first: true,
    second: false,
    third: false
  })

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: darkMode ? stylesGlobal.bg_b3.backgroundColor : stylesGlobal.bg_w3.backgroundColor,
      height: '100%',
    },
    text: {
      color: darkMode ? stylesGlobal.color_w1.color : stylesGlobal.color_b1.color
    },
    inputText: {
      marginLeft: 45,
      marginBottom: 10
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
    },
    circles: {
      width: 10,
      height: 10,
      borderRadius: 500,
      margin: 5,
      backgroundColor: darkMode ? stylesGlobal.color_w3.color : stylesGlobal.color_b3.backgroundColor,
    },
    circlesContainer: {
      flexDirection: 'row',
      width: '100%',
      height: '20%',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 50,
      alignContent: 'center'
    }
  })

  const handleResgiter = async () => {

    const input = {
      name: name,
      username: username,
      password: password,
      phone: parseInt(phoneNumber),
      address: address,
      email: email
    }

    await register(input)
      .then(res => {
        if (res.register) {
          navigation.navigate('Login')
        } else {
          Alert.alert("username or email aready exist")
        }
      })
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

        <View style={{ height: '80%', justifyContent: 'space-around' }}>
          <View>
            <Text style={[styles.text, stylesGlobal.font_titleHuge, { marginLeft: 45 }]}>Register</Text>
          </View>
          {/* Inputs */}
          {nextStep ?
            <View style={{ height: '80%', justifyContent: 'space-evenly' }}>

              <View>
                <Text style={[styles.text, stylesGlobal.font_body, styles.inputText]}>Password</Text>
                <TextInput style={styles.input} secureTextEntry placeholder='Enter your password...' onChange={(e) => { setPassword(e.nativeEvent.text) }} placeholderTextColor={darkMode ? stylesGlobal.color_w4.color : stylesGlobal.color_b4.color} />
              </View>
              <View>
                <Text style={[styles.text, stylesGlobal.font_body, styles.inputText]}>Confirm Password</Text>
                <TextInput style={styles.input} secureTextEntry placeholder='Confirm your password...' onChange={(e) => { setConfirmPassword(e.nativeEvent.text) }} placeholderTextColor={darkMode ? stylesGlobal.color_w4.color : stylesGlobal.color_b4.color} />
              </View>
            </View> :

            finalStep ?
              <View style={{ height: '80%', justifyContent: 'space-evenly' }}>

                <View>
                  <Text style={[styles.text, stylesGlobal.font_body, styles.inputText]}>Phone Number</Text>
                  <TextInput style={styles.input} placeholder='Enter your phone number...' onChange={(e) => { setPhoneNumber(e.nativeEvent.text) }} placeholderTextColor={darkMode ? stylesGlobal.color_w4.color : stylesGlobal.color_b4.color} />
                </View>
                <View>
                  <Text style={[styles.text, stylesGlobal.font_body, styles.inputText]}>Address</Text>
                  <TextInput style={styles.input} placeholder='Confirm your address...' onChange={(e) => { setAddress(e.nativeEvent.text) }} placeholderTextColor={darkMode ? stylesGlobal.color_w4.color : stylesGlobal.color_b4.color} />
                </View>
              </View> :

              <View style={{ height: '80%', justifyContent: 'space-evenly' }}>

                <View>
                  <Text style={[styles.text, stylesGlobal.font_body, styles.inputText]}>Email</Text>
                  <TextInput style={styles.input} placeholder='Enter your email address...' onChange={(e) => { setEmail(e.nativeEvent.text) }} placeholderTextColor={darkMode ? stylesGlobal.color_w4.color : stylesGlobal.color_b4.color} />
                </View>
                <View>
                  <Text style={[styles.text, stylesGlobal.font_body, styles.inputText]}>Username</Text>
                  <TextInput style={styles.input} placeholder='Enter your username...' onChange={(e) => { setUsername(e.nativeEvent.text) }} placeholderTextColor={darkMode ? stylesGlobal.color_w4.color : stylesGlobal.color_b4.color} />
                </View>
                <View>
                  <Text style={[styles.text, stylesGlobal.font_body, styles.inputText]}>Name</Text>
                  <TextInput style={styles.input} placeholder='Enter your name...' onChange={(e) => { setName(e.nativeEvent.text) }} placeholderTextColor={darkMode ? stylesGlobal.color_w4.color : stylesGlobal.color_b4.color} />
                </View>
              </View>}



        </View>

        {/* Buttons */}
        <View style={{ flexDirection: 'column' }}>

          <View style={styles.circlesContainer}>
            <View style={[styles.circles, { backgroundColor: balls.first ? stylesGlobal.color_bl1.color : styles.circles.backgroundColor }]} />
            <View style={[styles.circles, { backgroundColor: balls.second ? stylesGlobal.color_bl1.color : styles.circles.backgroundColor }]} />
            <View style={[styles.circles, { backgroundColor: balls.third ? stylesGlobal.color_bl1.color : styles.circles.backgroundColor }]} />
          </View>

          <View style={styles.buttonContainer}>

            <View>

              <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                <Text style={[styles.text, stylesGlobal.font_bodyLarge]}>Cancel</Text>
                <View style={{ height: 1, width: '100%', backgroundColor: stylesGlobal.color_bl1.color }} />
              </TouchableOpacity>

            </View>
            <View>
              {
                nextStep ?
                  <TouchableOpacity onPress={() => {
                    if (nextStep == true && password && confirmPassword) {
                      if (password == confirmPassword) {

                        setBalls(
                          {
                            first: false,
                            second: false,
                            third: true
                          }
                        )

                        setNextStep(false)
                        setFinalStep(true)
                      } else {
                        Alert.alert('Passwords do not match')
                      }
                    } else {
                      Alert.alert('All fields are required!')
                    }
                  }}>
                    <View style={[styles.button, { width: 100 }]}>
                      <Text style={stylesGlobal.font_h3}>Next</Text>
                    </View>
                  </TouchableOpacity> :
                  finalStep ?
                    <TouchableOpacity onPress={() => {
                      if (finalStep == true && address && phoneNumber) {

                        if (phoneNumber == parseInt(phoneNumber)) {
                          handleResgiter()
                        } else {
                          Alert.alert('Phone number is not valid')
                        }

                      } else {
                        Alert.alert('All fields are required!')
                      }

                    }}>
                      <View style={[styles.button]}>
                        <Text style={stylesGlobal.font_h3}>Register</Text>
                      </View>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => {
                      if (email && username && name) {

                        setBalls(
                          {
                            first: false,
                            second: true,
                            third: false
                          }
                        )

                        setNextStep(true)
                      } else {
                        Alert.alert('All fields are required!')
                      }
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

    </View>
  )
}
