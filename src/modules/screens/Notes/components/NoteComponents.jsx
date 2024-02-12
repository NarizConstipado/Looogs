import React, {useState, useContext, useEffect} from 'react';
import {
  StatusBar,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import stylesGlobal from '../../../../css/style.jsx';
import {DarkModeContext} from '../../../../App.jsx';
import {CheckBox} from '../../../components/Svg';
import {storeData, checkForUpdates} from '../../../../utilities/utilities.jsx';

export const NoteComponents = ({
  id,
  description,
  value,
  type,
  noteId,
  note,
  setNote,
}) => {
  const {darkMode, setChapters, setTags, setFavoriteNotes, setNotes} =
    useContext(DarkModeContext);

  const [input, setInput] = useState(description);
  const [valueState, setValue] = useState(value);

  const updateNotes = () => {
    setFavoriteNotes(prevFavorite => {
      const updatedFavorites = prevFavorite.map(n => {
        if (n.id === note.id) {
          let updatedComponents = note.components.map(c => {
            if (c.id === id) {
              return {...c, description: input, value: valueState};
            }
            return c;
          });
          return {...n, components: updatedComponents};
        }
        return n;
      });
      storeData('favoriteNotes', updatedFavorites);
      return updatedFavorites;
    });
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.map(n => {
        if (n.id === note.id) {
          let updatedComponents = note.components.map(c => {
            if (c.id === id) {
              return {...c, description: input, value: valueState};
            }
            return c;
          });
          return {...n, components: updatedComponents};
        }
        return n;
      });

      console.log('updatedNotes', updatedNotes);
      storeData('notes', updatedNotes);
      return updatedNotes;
    });
    checkForUpdates(setChapters, setTags, setFavoriteNotes, setNotes);
  };

  const updateComponentValue = countType => {
    setFavoriteNotes(prevNotes => {
      const updatedArray = prevNotes.map(note => {
        if (note.id === noteId) {
          const updatedComponents = note.components.map(c => {
            if (c.id === id) {
              switch (type) {
                case 'checkbox':
                  c.value = c.value === 0 ? 1 : 0;
                  break;
                case 'count':
                  if (type === 'add') c.value = c.value + 1;
                  else c.value = Math.max(0, c.value - 1);
                  break;
                default:
                  break;
              }
            }
            return c;
          });

          return {...note, components: updatedComponents};
        }
        return note;
      });

      storeData('favoriteNotes', updatedArray);
      return updatedArray;
    });
    setNotes(prevNotes => {
      const updatedArray = prevNotes.map(note => {
        if (note.id === noteId) {
          const updatedComponents = note.components.map(c => {
            if (c.id === id) {
              switch (type) {
                case 'checkbox':
                  c.value = c.value === 0 ? 1 : 0;
                  break;
                case 'count':
                  if (type === 'add') c.value = c.value + 1;
                  else c.value = Math.max(0, c.value - 1);
                  break;
                default:
                  break;
              }
            }
            return c;
          });

          return {...note, components: updatedComponents};
        }
        return note;
      });

      storeData('notes', updatedArray);
      return updatedArray;
    });
    setNote(prevNote => {
      const updatedComponents = prevNote.components.map(c => {
        if (c.id === id) {
          switch (type) {
            case 'checkbox':
              c.value = c.value === 0 ? 1 : 0;
              break;
            case 'count':
              if (countType === 'add') {
                c.value = c.value + 1;
              } else {
                c.value = Math.max(0, c.value - 1);
              }
              break;
            default:
              break;
          }
        }
        return c;
      });
      return {...prevNote, components: updatedComponents};
    });

    checkForUpdates(setChapters, setTags, setFavoriteNotes, setNotes);
  };

  const deleteComponent = e => {
    if (e.nativeEvent.key === 'Backspace' && input.trim() === '') {
      setFavoriteNotes(prevFavorite => {
        const updatedFavorites = prevFavorite.map(n => {
          if (n.id === note.id) {
            let updatedComponents = note.components.slice();
            const indexToRemove = updatedComponents.findIndex(c => c.id === id);
            if (indexToRemove !== -1) {
              updatedComponents.splice(indexToRemove, 1);
            }
            return {...n, components: updatedComponents};
          }
          return n;
        });
        storeData('favoriteNotes', updatedFavorites);
        return updatedFavorites;
      });
      setNotes(prevNotes => {
        const updatedNotes = prevNotes.map(n => {
          if (n.id === note.id) {
            let updatedComponents = note.components.slice();
            const indexToRemove = updatedComponents.findIndex(c => c.id === id);
            if (indexToRemove !== -1) {
              updatedComponents.splice(indexToRemove, 1);
            }
            return {...n, components: updatedComponents};
          }
          return n;
        });
        storeData('notes', updatedNotes);
        return updatedNotes;
      });
      setNote(prevValue => {
        let updatedComponents = note.components.slice();
        const indexToRemove = updatedComponents.findIndex(c => c.id === id);
        if (indexToRemove !== -1) {
          updatedComponents.splice(indexToRemove, 1);
        }
        return {...prevValue, components: updatedComponents};
      });

      checkForUpdates(setChapters, setTags, setFavoriteNotes, setNotes);
    }
  };

  switch (type) {
    case 'count':
      return (
        <View style={[styles.component, styles.alignComponent]}>
          <TextInput
            multiline={true}
            value={input}
            onChangeText={setInput}
            onBlur={updateNotes}
            onKeyPress={e => deleteComponent(e)}
            style={[
              darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
              stylesGlobal.font_body,
            ]}
          />
          <View style={styles.alignComponent}>
            <TouchableOpacity onPress={() => updateComponentValue('minus')}>
              <View
                style={[
                  styles.counterButton,
                  stylesGlobal.bg_bl2,
                  styles.alignCenter,
                ]}>
                <Text
                  style={[
                    darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
                    valueState == 0 &&
                      (darkMode
                        ? stylesGlobal.color_w2
                        : stylesGlobal.color_b2),
                    stylesGlobal.font_h4,
                  ]}>
                  -
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={{paddingHorizontal: 5}}>{valueState}</Text>
            <TouchableOpacity onPress={() => updateComponentValue('add')}>
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
                    darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
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
        <View style={styles.component}>
          <TouchableOpacity onPress={() => updateComponentValue('check')}>
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
                valueState === 1 && [
                  stylesGlobal.color_w2,
                  stylesGlobal.border_w2,
                ],
              ]}>
              {valueState === 1 && (
                <CheckBox
                  color={
                    darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b2
                  }
                />
              )}
            </View>
          </TouchableOpacity>
          <TextInput
            multiline={true}
            value={input}
            onChangeText={setInput}
            onBlur={updateNotes}
            onKeyPress={e => deleteComponent(e)}
            style={[
              darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
              stylesGlobal.font_body,
              valueState === 1 && [
                stylesGlobal.color_w2,
                {textDecorationLine: 'line-through'},
              ],
            ]}
          />
        </View>
      );
    case 'bulletList':
      return (
        <View>
          <View
            style={[
              darkMode ? stylesGlobal.bg_w1 : stylesGlobal.bg_b1,
              styles.bulletList,
            ]}
          />
          <TextInput
            multiline={true}
            value={input}
            onChangeText={setInput}
            onBlur={updateNotes}
            onKeyPress={e => deleteComponent(e)}
            style={[
              stylesGlobal.font_h3,
              styles.simpleText,
              {marginVertical: 10},
            ]}
          />
        </View>
      );
    case 'h1':
      return (
        <TextInput
          multiline={true}
          value={input}
          onChangeText={setInput}
          onBlur={updateNotes}
          onKeyPress={e => deleteComponent(e)}
          style={[stylesGlobal.font_h1, {marginVertical: 10}]}
        />
      );
    case 'h2':
      return (
        <TextInput
          multiline={true}
          value={input}
          onChangeText={setInput}
          onBlur={updateNotes}
          onKeyPress={e => deleteComponent(e)}
          style={[
            stylesGlobal.font_h2,
            styles.simpleText,
            {marginVertical: 10},
          ]}
        />
      );
    case 'h3':
      return (
        <TextInput
          multiline={true}
          value={input}
          onChangeText={setInput}
          onBlur={updateNotes}
          onKeyPress={e => deleteComponent(e)}
          style={[
            stylesGlobal.font_h3,
            styles.simpleText,
            {marginVertical: 10},
          ]}
        />
      );
    default:
      return (
        <TextInput
          multiline={true}
          value={input}
          onChangeText={setInput}
          onBlur={updateNotes}
          onKeyPress={e => deleteComponent(e)}
          style={[stylesGlobal.font_body, styles.component]}
        />
      );
  }
};

export const EmptyState = text => {
  const darkMode = useContext(DarkModeContext);
  return (
    <View>
      <Text
        style={[
          stylesGlobal.font_bodyLarge,
          darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b2,
        ]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
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
  bulletList: {
    width: 5,
    height: 5,
  },
});
