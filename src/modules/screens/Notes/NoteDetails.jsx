import React, {useState, useEffect, useContext} from 'react';
import {
  StatusBar,
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import stylesGlobal from '../../../css/style.jsx';
import {DarkModeContext} from '../../../App.jsx';
import {storeData, checkForUpdates} from '../../../utilities/utilities.jsx';

import {NoteHeader} from './components/NoteHeaders.jsx';
import {NoteComponents, EmptyState} from './components/NoteComponents.jsx';
import EditComponent from './components/EditComponent.jsx';

const windowHeight = Dimensions.get('window').height;

const NoteDetails = ({navigation, route}) => {
  const {
    darkMode,
    notes,
    setChapters,
    setTags,
    setFavoriteNotes,
    setNotes,
    tags,
  } = useContext(DarkModeContext);
  const [note, setNote] = useState(route.params.note);
  const [isOnline, setConnection] = useState(false);
  const [hasMenu, setMenu] = useState(false);
  const [localId, setLocalId] = useState(0);

  const loadComponents = () => {
    return note.components.map(component => (
      <NoteComponents
        key={`component${component.id}`}
        {...component}
        note={note}
        setNote={setNote}
      />
    ));
  };

  const addElement = input => {
    setNotes(prevNote => {
      let updatedNote = prevNote.map(n => {
        if (n.id === note.id) {
          const updatedComponents = [
            ...n.components,
            {
              id: `newC_${localId}`,
              description: input.description,
              value: input.value,
              type: input.type,
            },
          ];
          console.log(updatedComponents);
          return {...n, components: updatedComponents};
        }
        return n;
      });
      storeData('notes', updatedNote);
      return updatedNote;
    });
    setFavoriteNotes(prevFav => {
      let updatedFav = prevFav.map(fav => {
        if (fav.id === note.id) {
          const updatedFavComponents = [
            ...fav.components,
            {
              id: `newC_${localId}`,
              description: input.description,
              value: input.value,
              type: input.type,
            },
          ];
          console.log(updatedFavComponents);
          return {...fav, components: updatedFavComponents};
        }
        return fav;
      });
      storeData('favoriteNotes', updatedFav);
      return updatedFav;
    });
    setNote(prevNote => {
      const updatedComponents = [
        ...prevNote.components,
        {
          id: `newC_${localId}`,
          description: input.description,
          value: input.value,
          type: input.type,
        },
      ];
      return {...prevNote, components: updatedComponents};
    });
    setLocalId(prevLocalId => prevLocalId + 1);
    checkForUpdates(setChapters, setTags, setFavoriteNotes, setNotes);
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
      <ScrollView>
        <NoteHeader
          note={note}
          navigation={navigation}
          isOnline={isOnline}
          hasMenu={hasMenu}
          onChangeMenu={setMenu}
        />
        <View style={styles.componentsContainer}>
          {note.components.length > 0
            ? loadComponents()
            : EmptyState(
                'You dont have any components in this note, why not change that?',
              )}
        </View>
        <TouchableWithoutFeedback
          onPress={() =>
            addElement({description: 'Text', value: null, type: 'text'})
          }>
          <View style={styles.underNote} />
        </TouchableWithoutFeedback>
      </ScrollView>
      <EditComponent addElement={addElement} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  componentsContainer: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  underNote: {
    height: windowHeight * 0.7,
  },
});

export default NoteDetails;
