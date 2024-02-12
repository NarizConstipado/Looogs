import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming, withDelay, runOnJS, Easing } from 'react-native-reanimated';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

import stylesGlobal from '../../../css/style';
import { Select_Option } from '../../components/Svg';
import Progress from './components/progressCircles.jsx'
import { DarkModeContext } from '../../../App.jsx';

export default function PageScreen({navigation}) {

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });
  const [cardDimensions, setCardDimensions] = useState({
    width: (((100 * 266) / 360) * dimensions.window.width) / 100,
    height: (((365 * 100) / 640) * dimensions.window.height) / 100
  })
  const [imageDimensions, setImageDimensions] = useState({
    width: (((100 * 212) / 360) * dimensions.window.width) / 100,
    height: (((175 * 100) / 640) * dimensions.window.height) / 100,
  });
  const [number, setNumber] = useState(0)
  const [textArray, setTextArray] = useState(
    ['Select a clear, safe area for your fire away from flammable items.', 
    'Gather tinder (dry leaves, twigs), kindling (small sticks), and fuel (logs).', 
    'Arrange tinder in the center, surrounded by kindling in a teepee or log cabin structure.', 
    'Use waterproof matches or a lighter to light the tinder. Gradually add more kindling.', 
    'Once the fire is established, add larger logs gradually. Keep it small and controlled.']
    )
  const {darkMode, setDarkMode} = useContext(DarkModeContext);

  const translateX = useSharedValue(0)
  const scale = useSharedValue(1)

    useEffect(() => {
      console.log('page-screen');
    })

    const styles = StyleSheet.create({
      mainContainer: {
        backgroundColor: darkMode ? 'black' : 'white',
      },
      cardContainer: {
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingBottom: 180
      },
      backAndTitle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginLeft: 10
      },
      image: {
        width: imageDimensions.width,
        height: imageDimensions.height,
        borderColor: darkMode ? stylesGlobal.border_w1.borderColor : stylesGlobal.border_b5.borderColor,
        borderRadius: 10,
        borderColor: darkMode ? 'white' : 'black',
        borderWidth: 1,
        marginTop: 50
      },
      headerContainer: {
        marginTop: 10
      },
      h1: {
        color: darkMode ? 'white' : 'black',
        marginTop: 12,
        marginLeft: 20,
      },
      card: {
        width: cardDimensions.width,
        height: cardDimensions.height,
        backgroundColor: stylesGlobal.bg_b3.backgroundColor,
        borderWidth: 3,
        borderRadius: 8,
        borderColor: stylesGlobal.border_b4.borderColor,
      },
      backCard: {
        transform: 'rotateZ(-1.5deg)'
      },
      middleCard: {
        transform: 'rotateZ(0.75deg)'
      },
      frontCard: {
        transform: 'rotateZ(0.75deg)'
      },
      text: {
        color: darkMode ? stylesGlobal.color_w1.color : stylesGlobal.color_b1.color,
        textAlign: 'center',
        maxWidth: '70%',
        marginTop: 30,
        marginBottom: 50
      },
      contentContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }
    })

    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }, {scale: scale.value }]
    }))

    const handleBack = () => {
      navigation.navigate('Manual')
    }


    const handleProgressCircles = (direction) => {
      if(direction == 1) {
        setNumber(number+1)
      } else {
        setNumber(number-1)
      }
    }

    const handleRightSwipe = () => {
      console.log('right swipe');

      if(number < textArray.length-1) {
        translateX.value = withSequence(
          withTiming(400, {duration: 500, easing: Easing.out(Easing.sin)}, () => {
            scale.value = 0
            'worklet';
            runOnJS(setNumber)(number+1);
          }),
          withSpring(0, {duration: 0}, () => {
            scale.value = withSpring(1, {duration: 400})
          })
        )

        handleProgressCircles(0)
      } else {
        translateX.value = withSequence(
          withTiming(150, {duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1)}),
          withTiming(0, {duration: 300, easing: Easing.elastic(1.5)})
        )
      }
      

    }

    const handleLeftSwipe = () => {
      console.log('left swipe');

        // 1st option - Back to Back Animation
/*         translateX.value = withSequence(
          withSpring(-400, {duration: 1000}), 
         withSpring(0, {duration: 1500})

        ) */


      // 2nd option - Scrolled Swipe Animation

/*       translateX.value = withSequence(
        withSpring(-400, {duration: 1000}),
        withTiming(600, {duration: 0}),
        withSpring(0, {duration: 1500})
      ) */

      // 3rd option - Swipe + Scale Animation

      if(number > 0){
        translateX.value = withSequence(
          withTiming(-400, {duration: 500, easing: Easing.out(Easing.sin)}, () => {
            scale.value = 0
            'worklet';
            runOnJS(setNumber)(number-1);
          }),
          withSpring(0, {duration: 0}, () => {
            scale.value = withSpring(1, {duration: 400})
          })
        )

        handleProgressCircles(1)
      } else {
        translateX.value = withSequence(
          withTiming(-150, {duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1)}),
          withTiming(0, {duration: 300, easing: Easing.elastic(1.5)})
        )
      }


    }

    return (
      <View style={styles.mainContainer}>

      <View style={[styles.backAndTitle, styles.headerContainer]}>
        <View style={{transform: [{scaleX: -1}]}}>
          <TouchableOpacity onPress={handleBack}>
            <Select_Option color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
          </TouchableOpacity>
        </View>
        <Text style={[styles.h1, stylesGlobal.font_h2]}>Page</Text>
      </View>
      
      
      <View style={styles.cardContainer}>
        <View style={[styles.card, styles.backCard]}>
          <View style={[styles.card, styles.middleCard]}>
            
            <GestureRecognizer onSwipeRight={handleRightSwipe} onSwipeLeft={handleLeftSwipe} >
              <Animated.View style={[styles.card, styles.frontCard, animatedStyles]} >

                <View style={styles.contentContainer}>
                  <Image style={styles.image} source={{uri: `https://upload.wikimedia.org/wikipedia/commons/0/0f/Campfire_Pinecone.png`}} />
                  <Text style={[styles.text, stylesGlobal.font_h4]}>{textArray[number]}</Text>
                </View>

              </Animated.View>
            </GestureRecognizer>
          
          </View>
        </View>

        <Progress order={number} circles={textArray.length}/>
      
      </View>
      

    </View>
  )
}
