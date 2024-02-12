import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {DarkModeContext} from '../../../../App';

import stylesGlobal from '../../../../css/style';
import {Add, Remove, H1, BlankNote} from '../../../components/Svg';

const AddElements = ({OnCreateChapter, OnCreateNote}) => {
  const isDark = useContext(DarkModeContext);
  const [isPressed, setPressed] = useState(false);

  const loadDefault = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setPressed(true)}>
          <View
            style={[
              styles.addButton,
              isDark
                ? [stylesGlobal.bg_b3, stylesGlobal.border_b6]
                : [stylesGlobal.bg_w3],
            ]}>
            <Add
              color={isDark ? stylesGlobal.color_w1 : stylesGlobal.color_b5}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const loadPressed = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => {OnCreateChapter(),setPressed(false)}}>
          <View style={styles.container}>
            <View
              style={[
                styles.optionBackground,
                isDark ? stylesGlobal.bg_b4 : stylesGlobal.bg_b1,
              ]}>
              <Text
                style={[
                  isDark ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
                  stylesGlobal.font_bodyLarge,
                ]}>
                Chapter
              </Text>
            </View>
            <View
              style={[
                styles.optionBackground,
                isDark ? stylesGlobal.bg_b4 : stylesGlobal.bg_b1,
              ]}>
              <H1
                color1={isDark ? stylesGlobal.color_w1 : stylesGlobal.color_b1}
                color2={isDark ? stylesGlobal.color_w3 : stylesGlobal.color_b4}
              />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {OnCreateNote(), setPressed(false)}}>
          <View style={styles.container}>
            <View
              style={[
                styles.optionBackground,
                isDark ? stylesGlobal.bg_b4 : stylesGlobal.bg_b1,
              ]}>
              <Text
                style={[
                  isDark ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
                  stylesGlobal.font_bodyLarge,
                ]}>
                Blank
              </Text>
            </View>
            <View
              style={[
                styles.optionBackground,
                isDark ? stylesGlobal.bg_b4 : stylesGlobal.bg_b1,
              ]}>
              <BlankNote />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setPressed(false)}>
            <View
              style={[
                styles.addButton,
                isDark
                  ? [stylesGlobal.bg_b3, stylesGlobal.border_b6]
                  : [stylesGlobal.bg_w3],
              ]}>
              <Remove
                color={isDark ? stylesGlobal.color_w1 : stylesGlobal.color_b5}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.menu}>{isPressed ? loadPressed() : loadDefault()}</View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    right: 15,
    bottom: 10,
    zIndex: 2,
    width: 135,
  },
  addButton: {
    borderRadius: 10,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
  },
  optionBackground: {
    padding: 5,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  buttonContainer: {
    width: 60,
    height: 60,
    alignSelf: 'flex-end',
  },
});

export default AddElements;