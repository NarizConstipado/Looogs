import React, {useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {DarkModeContext} from '../../../../App.jsx';
import stylesGlobal from '../../../../css/style';
import {CheckBox} from '../../../components/Svg';

export default function CardComponent({component, OnFavComponentChange}) {
  const isDark = useContext(DarkModeContext);

  switch (component.type) {
    case 'text':
      return (
        <Text
          style={[
            styles.component,
            isDark ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
            stylesGlobal.font_body,
          ]}>
          {component.description}
        </Text>
      );
    case 'count':
      return (
        <View style={[styles.component, styles.alignComponent]}>
          <Text
            style={[
              isDark ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
              stylesGlobal.font_body,
            ]}>
            {component.description}
          </Text>
          <View style={styles.alignComponent}>
            <TouchableOpacity
              onPress={() => OnFavComponentChange(component, 'remove')}>
              <View
                style={[
                  styles.counterButton,
                  stylesGlobal.bg_bl2,
                  styles.alignCenter,
                ]}>
                <Text
                  style={[
                    isDark ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
                    component.value == 0 &&
                      (isDark ? stylesGlobal.color_w2 : stylesGlobal.color_b2),
                    stylesGlobal.font_h4,
                  ]}>
                  -
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={{paddingHorizontal: 5}}>{component.value}</Text>
            <TouchableOpacity
              onPress={() => OnFavComponentChange(component, 'add')}>
              <View
                style={[
                  styles.counterButton,
                  stylesGlobal.bg_bl2,
                  styles.alignCenter,
                ]}>
                <Text
                  style={[
                    stylesGlobal.font_h4,
                    styles.alignCenter,
                    isDark ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
                  ]}>
                  +
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    case 'checkbox':
      return (
        <View style={[styles.component, styles.alignComponent]}>
          <Text
            style={[
              isDark ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
              stylesGlobal.font_body,
              component.value === 1 && [
                stylesGlobal.color_w2,
                {textDecorationLine: 'line-through'},
              ],
            ]}>
            {component.description}
          </Text>
          <TouchableOpacity
            onPress={() => OnFavComponentChange(component, 'nothing')}>
            <View
              style={[
                styles.checkBox,
                isDark ? stylesGlobal.border_w1 : stylesGlobal.border_b1,
                isDark
                  ? {backgroundColor: 'rgba(0,0,0,0.3)'}
                  : {backgroundColor: 'rgba(255,255,255,0.3)'},
                component.value === 1 && [
                  stylesGlobal.color_w2,
                  stylesGlobal.border_w2,
                ],
              ]}>
              {component.value === 1 && (
                <CheckBox
                  color={isDark ? stylesGlobal.color_w2 : stylesGlobal.color_b2}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      );
    default:
      return;
  }
}

const styles = StyleSheet.create({
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  component: {
    marginVertical: 5,
  },
  counterButton: {
    borderRadius: 26,
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
