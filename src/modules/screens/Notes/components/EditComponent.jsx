import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Modal, Text} from 'react-native';
import stylesGlobal from '../../../../css/style.jsx';
import {DarkModeContext} from '../../../../App.jsx';
import {
  CheckBox,
  TextFormat,
  TextColor,
  TextBackground,
  Reply,
  Close,
  NumberList,
  CheckList,
  BulletedList,
  CounterList,
  H1,
  H2,
  H3,
} from '../../../components/Svg';

const EditComponent = ({addElement}) => {
  const {darkMode} = useContext(DarkModeContext);
  const [isCheckPressed, setCheckPress] = useState(false);

  const loadModal = () => {
    return (
      <Modal transparent={true}>
        <View
          style={[
            styles.modal,
            darkMode ? stylesGlobal.bg_b3 : stylesGlobal.bg_w3,
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={[
                stylesGlobal.font_h4,
                darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
              ]}>
              Other Options
            </Text>
            <TouchableOpacity onPress={() => setCheckPress(false)}>
              <Close
                color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}
              />
            </TouchableOpacity>
          </View>
          <View>
            <View
              style={[
                styles.modelList,
                darkMode ? stylesGlobal.bg_b6 : stylesGlobal.bg_w5,
                {width: 155},
              ]}>
              <View>
                <TouchableOpacity
                  onPress={() => Alert.alert('Feature not implemented yet')
                  }>
                  <NumberList
                    color={
                      darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b3
                    }
                    color2={
                      darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b6
                    }
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    addElement({
                      description: 'CheckList',
                      type: 'checkbox',
                      value: 0,
                    })
                  }>
                  <CheckList
                    color={
                      darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b3
                    }
                    color2={
                      darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b6
                    }
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    addElement({
                      description: 'BulletList',
                      type: 'bulletList',
                      value: null,
                    })
                  }>
                  <BulletedList
                    color={
                      darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b3
                    }
                    color2={
                      darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b6
                    }
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    addElement({
                      description: 'Counter',
                      type: 'count',
                      value: 0,
                    })
                  }>
                  <CounterList
                    color={
                      darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b3
                    }
                    color2={
                      darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b6
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                styles.modelList,
                darkMode ? stylesGlobal.bg_b6 : stylesGlobal.bg_w5,
                {width: 110},
              ]}>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    addElement({
                      description: 'Title h1',
                      type: 'h1',
                      value: null,
                    })
                  }>
                  <H1
                    color1={
                      darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b3
                    }
                    color2={
                      darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b6
                    }
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    addElement({
                      description: 'Title h2',
                      type: 'h2',
                      value: null,
                    })
                  }>
                  <H2
                    color1={
                      darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b3
                    }
                    color2={
                      darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b6
                    }
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    addElement({
                      description: 'Title h3',
                      type: 'h3',
                      value: null,
                    })
                  }>
                  <H3
                    color1={
                      darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b3
                    }
                    color2={
                      darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b6
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      {isCheckPressed && loadModal()}
      <View
        style={[
          darkMode ? stylesGlobal.bg_b4 : stylesGlobal.bg_w5,
          styles.container,
        ]}>
        <TouchableOpacity onPress={() => setCheckPress(true)}>
          <View
            style={[
              isCheckPressed &&
                (darkMode ? stylesGlobal.bg_b6 : stylesGlobal.bg_w5),
            ]}>
            <View
              style={[
                styles.checkBox,
                darkMode
                  ? [
                      stylesGlobal.border_w1,
                      {backgroundColor: 'rgba(0,0,0,0.3)'},
                    ]
                  : [
                      stylesGlobal.border_b1,
                      {backgroundColor: 'rgba(255,255,255,0.3)'},
                    ],
              ]}>
              <CheckBox
                color={darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b2}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <TextFormat
            color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}
          />
        </View>
        <View>
          <TextColor
            color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}
          />
        </View>
        <View>
          <TextBackground
            color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}
          />
        </View>
        <View style={styles.return}>
          <Reply
            color={darkMode ? stylesGlobal.color_w3 : stylesGlobal.color_b3}
          />
        </View>
        <View style={styles.forward}>
          <Reply
            color={darkMode ? stylesGlobal.color_w3 : stylesGlobal.color_b3}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  return: {
    transform: [{rotate: '180deg'}],
  },
  forward: {transform: [{scaleX: -1}, {rotate: '180deg'}]},
  modal: {
    width: 280,
    height: 159,
    position: 'absolute',
    bottom: 0,
    marginBottom: 70,
    alignSelf: 'center',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 22,
  },
  modelList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 10,
    marginTop: 6,
  },
});

export default EditComponent;
