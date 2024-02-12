import React, {useState, useEffect, useContext} from 'react';
import {StatusBar, Text, View, ScrollView, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import stylesGlobal from '../../../css/style.jsx';
import {DarkModeContext} from '../../../App.jsx';
import {EmptyState} from '../../components/Svg.jsx';
import {NotesHeader} from './components/NoteHeaders.jsx';
import NoteCard from './components/NoteCard.jsx';
import AddElements from './components/AddElements.jsx';
import ChapterComponent from './components/ChapterComponent.jsx';

import {storeData, checkForUpdates} from '../../../utilities/utilities.jsx';

export default function NotesScreen({navigation}) {
  const {
    darkMode,
    notes,
    setNotes,
    favoriteNotes,
    setFavoriteNotes,
    chapters,
    setChapters,
    tags,
    setTags,
  } = useContext(DarkModeContext);
  const [isOnline, setConnection] = useState(false);
  const [localId, setLocalId] = useState(0);
  const [isNoteHold, setNoteHold] = useState(false);

  const createNewNote = () => {
    setNotes(prevValue => {
      const newArray = [
        ...prevValue,
        {
          id: `l${localId}`,
          title: 'Note Title',
          icon: 'U+1F4C4',
          trash: false,
          chapter: null,
          components: [],
          shareWith: [],
          tags: [],
        },
      ];
      storeData('notes', newArray);
      return newArray;
    });
    setLocalId(prevValue => prevValue.length + 1);
    checkForUpdates(setChapters, setTags, setFavoriteNotes, setNotes);
  };
  const createNewChapter = () => {
    setChapters(prevValue => {
      const newArray = [
        ...prevValue,
        {
          id: `l${localId}`,
          color: 'grey',
          title: 'New Chapter',
        },
      ];
      storeData('userChapters', newArray);
      return newArray;
    });
    setLocalId(prevValue => prevValue.length + 1);
    checkForUpdates(setChapters, setTags, setFavoriteNotes, setNotes);
  };

  const handleFavoriteComponent = (component, type) => {
    setFavoriteNotes(prevNotes => {
      const updatedArray = prevNotes.map(note => {
        if (note.id === component.noteId) {
          const updatedComponents = note.components.map(c => {
            if (c.id === component.id) {
              switch (component.type) {
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
    checkForUpdates(setChapters, setTags, setFavoriteNotes, setNotes);
  };

  const emptyState = () => {
    return (
      <View style={styles.emptyState}>
        <EmptyState />
        <Text style={[stylesGlobal.font_subtitle2, styles.emptyText]}>
          It seems your notes are empty, why not change that?
        </Text>
      </View>
    );
  };
  const renderChapter = chapter => {
    if (chapter)
      return (
        <View key={`chapterView_${chapter.id}`}>
          <ChapterComponent
            key={chapter.id}
            isNoteHold={isNoteHold}
            chapter={chapter}
            setChapters={setChapters}
            setNotes={setNotes}
          />
          {notes.map(note => {
            if (note.chapter && note.chapter.id === chapter.id)
              return (
                <NoteCard navigation={navigation} key={note.id} note={note} />
              );
          })}
        </View>
      );
  };
  const renderNotes = (noteArray, other) => {
    return (
      <View style={[isNoteHold && styles.chapterOpen, styles.chapter]}>
        <Text
          style={[
            darkMode
              ? [stylesGlobal.color_w1, stylesGlobal.bg_b1]
              : [stylesGlobal.color_b1, stylesGlobal.bg_w1],
            stylesGlobal.font_h1,
            {
              marginBottom: 15,
              marginTop: -18,
              paddingHorizontal: 5,
              alignSelf: 'flex-start',
            },
          ]}>
          {other ? 'Other' : 'Favorites'}
        </Text>
        {other
          ? noteArray.map(note => {
              if (note.chapter === null)
                return (
                  <NoteCard
                    key={note.id}
                    navigation={navigation}
                    note={note}
                    favorite={false}
                    OnFavComponentChange={handleFavoriteComponent}
                  />
                );
            })
          : noteArray.map(note => {
              return (
                <NoteCard
                  key={note.id}
                  navigation={navigation}
                  note={note}
                  favorite={true}
                  OnFavComponentChange={handleFavoriteComponent}
                />
              );
            })}
      </View>
    );
  };
  const loadContent = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          darkMode ? stylesGlobal.bg_b1 : stylesGlobal.bg_w1,
          {paddingHorizontal: 10, paddingVertical: 10},
        ]}>
        {favoriteNotes.length > 0 && renderNotes(favoriteNotes, false)}
        {chapters &&
          chapters.map(chapter => {
            return renderChapter(chapter);
          })}
        {notes.length > 0 && renderNotes(notes, true)}
      </ScrollView>
    );
  };

  useEffect(() => {
    const netInfoSubscription = NetInfo.addEventListener(state =>
      setConnection(state.isConnected),
    );
    return () => netInfoSubscription();
  }, []);

  return (
    <View
      style={[
        darkMode ? stylesGlobal.bg_b1 : stylesGlobal.bg_w1,
        styles.screen,
      ]}>
      <StatusBar barStyle={darkMode ? 'white' : 'black'} />
      <NotesHeader />
      <AddElements
        OnCreateChapter={createNewChapter}
        OnCreateNote={createNewNote}
      />
      {notes.length > 0 || favoriteNotes.length > 0
        ? loadContent()
        : emptyState()}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1},
  emptyState: {justifyContent: 'center', alignItems: 'center', flex: 1},
  emptyText: {marginHorizontal: 55, textAlign: 'center', marginTop: 15},
});
