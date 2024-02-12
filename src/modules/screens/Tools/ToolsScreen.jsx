import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  useColorScheme,
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { DarkModeContext } from '../../../App';
import stylesGlobal from '../../../css/style';
import { Timer, Mirror, Compass_Tools, Leveler, Magnofyier, Ruler, Distress, Flashlight } from '../../components/Svg';
import Torch from 'react-native-torch';

export default function ToolsScreen({navigation}) {
  const { darkMode, setDarkMode } = useContext(DarkModeContext)
  const [ flashlight, setFlashlight ] = useState(false)
  

  const styles = StyleSheet.create({
    mainContainer: {
      height: '100%',
      backgroundColor: darkMode ? stylesGlobal.bg_b1.backgroundColor : stylesGlobal.bg_w1.backgroundColor,
    },
    square: {
      width: 78,
      height: 78,
      backgroundColor: darkMode ? stylesGlobal.bg_b3.backgroundColor : stylesGlobal.bg_w3.backgroundColor,
      borderRadius: 16
    },
    text: {
      color: darkMode ? stylesGlobal.color_w1.color : stylesGlobal.color_b1.color,
      marginTop: 10
    },
    lineContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
    },
    containerText: {
      alignItems: 'center',
    },
    icon: {
      zIndex: 1, 
      position: 'absolute', 
      paddingTop: 10
    }
  })

  const handleFlashlight = () => {
    if(flashlight) {
      Torch.switchState(true)
      setFlashlight(false) // Turn ON
    } else {
      Torch.switchState(false)
      setFlashlight(true) // Turn ON
    }
  }

  return (
      <View style={styles.mainContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={[styles.text, stylesGlobal.font_h1, {marginBottom: 60, marginTop: 30}]}>Tools</Text>
        </View>
        <View style={{height: '70%', justifyContent: 'space-around'}}>

          <View style={styles.lineContainer}>

            <TouchableOpacity>
              <View style={styles.containerText}>
                <View style={styles.square} />
                  <View style={styles.icon}>
                    <Timer />
                  </View>
                <Text style={styles.text}>Timer</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('Camera')}}>
              <View style={styles.containerText}>
                <View style={styles.square} />
                  <View style={styles.icon}>
                    <Mirror />
                  </View>
                <Text style={styles.text}>Mirror</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.containerText}>
                <View style={styles.square} />
                  <View style={styles.icon}>
                    <Compass_Tools />
                  </View>
                <Text style={styles.text}>Compass</Text>
              </View>
            </TouchableOpacity>

          </View>

          <View style={styles.lineContainer}>

            <TouchableOpacity>
              <View style={styles.containerText}>
                <View style={styles.square} />
                  <View style={styles.icon}>
                    <Leveler />
                  </View>
                <Text style={styles.text}>Leveler</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.containerText}>
                <View style={styles.square} />
                  <View style={styles.icon}>
                    <Magnofyier />
                  </View>
                <Text style={styles.text}>Magnifyer</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.containerText}>
                <View style={styles.square} />
                  <View style={styles.icon}>
                    <Ruler />
                  </View>
                <Text style={styles.text}>Ruler</Text>
              </View>
            </TouchableOpacity>

          </View>

          <View style={styles.lineContainer}>

            <TouchableOpacity>
              <View style={[styles.containerText]}>
                <View style={styles.square} />
                  <View style={styles.icon}>
                    <Distress />
                  </View>
                  <View>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={[styles.text, {width: 60, textAlign: 'center'}]}>Distress Signal</Text>
                  </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleFlashlight}>
              <View style={styles.containerText}>
                <View style={styles.square} />
                  <View style={styles.icon}>
                    <Flashlight />
                  </View>
                <Text style={styles.text}>Flashlight</Text>
              </View>
            </TouchableOpacity>

          </View>

        </View>
      </View>
  );
}
