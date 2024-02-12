import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, Alert } from 'react-native'

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function ItemRectangle({navigation, ...props}) {

    const [item, setItem] = useState(props.item)
    const [dimensions, setDimensions] = useState({
      window: windowDimensions,
      screen: screenDimensions,
    });
    const [itemDimensions, setItemDimensions] = useState({
      width: (((100*330)/360) * dimensions.window.width) / 100,
      height: (((64*100)/640) * dimensions.window.height) / 100
    })
    const [textDimensions, setTextDimensions] = useState({
      width: (((100*250)/360) * dimensions.window.width) / 100,
    })

    const handlePress = () => {
      navigation.navigate("Page")
    }

    const styles = StyleSheet.create({
      image: {
        width: itemDimensions.width,
        height: itemDimensions.height,
        marginBottom: 12,
        borderRadius: 9,
        overflow: 'hidden',
      },
      mainContainerProgressBar: {
        width: itemDimensions.width * (item.progress / 100),
        height: itemDimensions.height,
      },
      filter: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 9,
      },
      progressColor: {
        borderRadius: 9,
        backgroundColor: 'rgba(29,138,154,0.6)',
      },
      textContainer: {
        width: itemDimensions.width,
        height: itemDimensions.height,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      text: {
        color: '#FFFFFF',
        fontSize: (((10*100)/360) * dimensions.window.height) / 100
      },
      progressNumbers: {
        paddingRight: 10,
        fontFamily: 'NotoSans-Regular',
        includeFontPadding: false
      },
      title: {
        width: textDimensions.width,
        paddingLeft: 10,
        fontFamily: 'NotoSans-Regular',
        includeFontPadding: false
      }
    })

  return (
    <View>
      <TouchableOpacity underlayColor={'white'} onPress={handlePress}>
        <ImageBackground style={styles.image} source={{uri: `${item.image}`}} >
          <View style={styles.filter}>
            <View style={styles.mainContainerProgressBar}>
              <View style={styles.progressColor}>
                <View style={styles.textContainer}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, styles.title]}>{item.title}</Text>
                  <Text style={[styles.text, styles.progressNumbers]}>{item.progress}%</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}
