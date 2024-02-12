import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {DarkModeContext} from '../../../../App.jsx';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import stylesGlobal from '../../../../css/style';
import {storeData} from '../../../../utilities/utilities.jsx';

const ChapterComponent = ({
  chapter,
  isNoteHold,
  setChapters,
  setNotes,
  validConnection,
  OnChapterLongPress,
}) => {
  const isDark = useContext(DarkModeContext);
  const [isDoubleTap, setDoubleTap] = useState(false);
  const [chapterTitle, onChangeTitle] = useState(chapter.title);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        ('worklet');
        runOnJS(setDoubleTap)(true);
      }
    });

  const onBlurTextInput = () => {
    //edit chapter from chapters
    setChapters(prevChapters => {
      const updatedChapters = prevChapters.map(c => {
        if (c.id === chapter.id) {
          return {...c, title: chapterTitle};
        }
        return c;
      });

      storeData('userChapters', updatedChapters);
      return updatedChapters;
    });

    setNotes(prevNotes => {
      const updatedNotes = prevNotes.map(n => {
        if (n.chapter && n.chapter.id === chapter.id) {
          return {...n, chapter: {...n.chapter, title: chapterTitle}};
        }
        return n;
      });

      storeData('notes', updatedNotes);
      return updatedNotes;
    });

    validConnection();
    setDoubleTap(false);
  };

  const loadDefault = () => {
    return (
      <Text
        style={[
          isDark
            ? [stylesGlobal.color_w1, stylesGlobal.bg_b1]
            : [stylesGlobal.color_b1, stylesGlobal.bg_w1],
          stylesGlobal.font_h1,
          styles.offset,
          styles.chapterOffset,
        ]}>
        {chapterTitle}
      </Text>
    );
  };
  const loadEdit = () => {
    return (
      <TextInput
        style={[
          isDark
            ? [stylesGlobal.color_w1, stylesGlobal.bg_b1]
            : [stylesGlobal.color_b1, stylesGlobal.bg_w1],
          stylesGlobal.font_h1,
          styles.offset,
          styles.inputOffset,
        ]}
        onChangeText={onChangeTitle}
        value={chapterTitle}
        onBlur={onBlurTextInput}
      />
    );
  };

  return (
    <View
      key={chapter.id}
      style={[
        isNoteHold && styles.chapterOpen,
        isDark ? stylesGlobal.bg_b1 : stylesGlobal.bg_w1,
        styles.chapter,
      ]}>
      <GestureDetector gesture={doubleTap}>
        {isDoubleTap ? loadEdit() : loadDefault()}
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  chapter: {
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  chapterOpen: {
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    zIndex: -1,
  },
  offset: {
    marginBottom: 15,
    paddingHorizontal: 5,
    alignSelf: 'flex-start',
  },
  chapterOffset: {
    marginTop: -18,
  },
  inputOffset: {
    marginTop: -22,
  },
});

export default ChapterComponent;
