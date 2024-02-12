import React, {useContext, useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import stylesGlobal from '../../../../css/style';
import { DarkModeContext } from '../../../../App';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function ItemSquare({navigation, ...props}) {
  const [item, setItem] = useState(props.item);

 const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });
  const [itemDimensions, setItemDimensions] = useState({
    width: (((100 * 155) / 360) * dimensions.window.width) / 100,
    height: (((154 * 100) / 640) * dimensions.window.height) / 100,
  });
  const [imageDimensions, setImageDimensions] = useState({
    width: (((100 * 92) / 360) * dimensions.window.width) / 100,
    height: (((76 * 100) / 640) * dimensions.window.height) / 100,
  });
  const [progressBarDimensions, setProgressBarDimensions] = useState({
    width: (((100 * 40.15) / 360) * dimensions.window.width) / 100,
    height: (((4.87 * 100) / 640) * dimensions.window.height) / 100,
  });
  const [textDimensions, setTextDimensions] = useState({
    width: (((100*250)/360) * dimensions.window.width) / 100,
  })
/*   const [itemDimensions, setItemDimensions] = useState({
    width: 169.1,
    height: 188.48,
  });
  const [imageDimensions, setImageDimensions] = useState({
    width: 100.36,
    height: 93.01
  });
  const [progressBarDimensions, setProgressBarDimensions] = useState({
    width: 43.8,
    height: 5.96,
  });
  const [textDimensions, setTextDimensions] = useState({
    width: 23,
  }) */
  const {darkMode, setDarkMode} = useContext(DarkModeContext);

  const handlePress = () => {
    navigation.navigate("Page")
  }

  const styles = StyleSheet.create({
    mainContainer: {
      width: itemDimensions.width, //43vw
      height: itemDimensions.height, //24vh
      backgroundColor: darkMode ? stylesGlobal.bg_b5.backgroundColor : stylesGlobal.bg_w3.backgroundColor,
      borderRadius: 8,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
    },
    progressBarContainer: {
      alignItems: 'center',
    },
    image: {
      width: imageDimensions.width,
      height: imageDimensions.height,
      borderColor: darkMode ? stylesGlobal.border_w1.borderColor : stylesGlobal.border_b5.borderColor,
      borderWidth: 1,
      borderRadius: 10,
      margin: 5,
    },
    progressBar: {
      width: progressBarDimensions.width,
      height: progressBarDimensions.height,
      backgroundColor: darkMode ? stylesGlobal.bg_b4.backgroundColor : '#DEDEDE',
      borderRadius: 20,
    },
    progress: {
      width: progressBarDimensions.width * (item.progress / 100),
      height: progressBarDimensions.height,
      borderRadius: 20,
      backgroundColor: stylesGlobal.bg_bg1.backgroundColor,
    },
    text: {
      color: darkMode ? stylesGlobal.color_w1.color : stylesGlobal.color_b1.color,
      textAlign: 'center',
      maxWidth: '70%',
      margin: 3,
      marginBottom: 6,
    },
  });

  return (
    <TouchableOpacity underlayColor={darkMode ? 'white' : 'black'} onPress={handlePress}>
      <View style={styles.mainContainer}>
          <View>
            <Image style={styles.image} source={{uri: `${item.image}`}} />
          </View>
          <View style={styles.progressBarContainer}>
            <Text numberOfLines={2} ellipsizeMode="tail" style={[styles.text, stylesGlobal.font_subtitle]}>{item.title}</Text>
            <View style={styles.progressBar}>
              <View style={styles.progress}></View>
            </View>
          </View>
      </View>
    </TouchableOpacity>
  );
}
