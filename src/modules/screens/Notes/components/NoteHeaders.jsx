import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {DarkModeContext} from '../../../../App';
import {
  Search,
  Select_Option,
  Options,
  AirPlane,
  Edit,
  Share,
  Close,
} from '../../../components/Svg';
import stylesGlobal from '../../../../css/style';
import {storeData, checkForUpdates} from '../../../../utilities/utilities';

export const NotesHeader = () => {
  const darkMode = useContext(DarkModeContext);
  return (
    <View
      style={[
        styles.notesHeader,
        darkMode ? stylesGlobal.bg_b2 : stylesGlobal.bg_w3,
      ]}>
      <Text
        style={[
          darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
          stylesGlobal.font_titleBig,
        ]}>
        Notes
      </Text>
      <View
        style={[
          darkMode ? stylesGlobal.bg_b4 : stylesGlobal.bg_w2,
          stylesGlobal.centerChildren,
          darkMode ? styles.borderLight : styles.borderDark,
          styles.searchButton,
        ]}>
        <Search
          color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}
        />
      </View>
    </View>
  );
};

export const NoteHeader = ({
  note,
  isOnline,
  navigation,
  hasMenu,
  onChangeMenu,
}) => {
  const {darkMode, setFavoriteNotes, setNotes, setChapters, setTags} =
    useContext(DarkModeContext);
  const noteCreatedAt = new Date(parseInt(note.createdAt));
  const noteUpdatedAt = new Date(parseInt(note.updatedAt));

  const trashNote = () => {
    setFavoriteNotes(prevFavorite => {
      const updatedFavorites = prevFavorite.map(n => {
        if (n.id === note.id) {
          return {...n, trash: true};
        }
        return n;
      });
      console.log(updatedFavorites);
      storeData('favoriteNotes', updatedFavorites);
      return updatedFavorites;
    });
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.map(n => {
        if (n.id === note.id) {
          return {...n, trash: true};
        }
        return n;
      });
      console.log(updatedNotes);
      storeData('notes', updatedNotes);
      return updatedNotes;
    });
    checkForUpdates(setChapters, setTags, setFavoriteNotes, setNotes);
    navigation.navigate('Notes')
  };

  const offlineSection = () => {
    return (
      <View
        style={[
          styles.offline,
          darkMode ? stylesGlobal.bg_b5 : stylesGlobal.bg_w4,
          {flexDirection: 'row'},
        ]}>
        <AirPlane
          color={darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b6}
        />
        <Text
          style={[
            darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b6,
            {marginLeft: 5},
          ]}>
          You are Offline
        </Text>
      </View>
    );
  };
  const renderTags = () => {
    return note.tags.map((tag, index) => (
      <View
        key={index}
        style={[{borderRadius: 25, backgroundColor: tag.color, margin: 2}]}>
        <View style={[styles.tagMenu, styles.borderColor]}>
          <Text
            style={[{color: 'rgba(0,0,0,0.6)'}, stylesGlobal.font_bodyBold]}>
            {tag.title}
          </Text>
          <Close color={{color: 'rgba(0,0,0,0.8)'}} />
        </View>
      </View>
    ));
  };
  const menuSection = () => {
    return (
      <Modal transparent={true}>
        <View
          style={[
            styles.menu,
            darkMode ? stylesGlobal.bg_b4 : stylesGlobal.bg_w3,
          ]}>
          <View>
            <View style={styles.itemContainer}>
              <Edit
                color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}
              />
              <Text
                style={[
                  stylesGlobal.font_h4,
                  darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
                  {marginLeft: 5},
                ]}>
                Rename Note
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (isOnline)
                  navigation.navigate('ShareNote', {noteID: note.id});
              }}>
              <View
                style={[
                  stylesGlobal.border_b2,
                  styles.menuItem,
                  styles.itemContainer,
                ]}>
                <Share
                  color={
                    darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1
                  }
                />
                <Text
                  style={[
                    stylesGlobal.font_h4,
                    darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
                    {marginLeft: 5},
                  ]}>
                  Share Note
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={[
                stylesGlobal.border_b2,
                styles.menuItem,
                styles.itemContainer,
              ]}>
              <TouchableOpacity onPress={() => trashNote()}>
                <Text style={[stylesGlobal.font_h4, stylesGlobal.color_r1]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.tagSection, stylesGlobal.border_b2]}>
            {note.tags.length > 0 && renderTags()}
            <View style={[{borderRadius: 25, margin: 2}, stylesGlobal.bg_w3]}>
              <View
                style={[
                  styles.tagMenu,
                  stylesGlobal.bg_w3,
                  styles.borderColor,
                ]}>
                <Text
                  style={[stylesGlobal.color_b5, stylesGlobal.font_bodyBold]}>
                  Add +
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <View>
              <Text
                style={[stylesGlobal.font_bodySmall, stylesGlobal.color_w4]}>
                Created
              </Text>
              <Text
                style={[
                  darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b3,
                  stylesGlobal.font_bodySmaller,
                ]}>
                {noteCreatedAt.toLocaleDateString('en-GB')}{' '}
                {noteCreatedAt.getHours() + ':' + noteCreatedAt.getMinutes()}
              </Text>
            </View>
            <View>
              <Text
                style={[stylesGlobal.font_bodySmall, stylesGlobal.color_w4]}>
                Updated
              </Text>
              <Text
                style={[
                  darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b3,
                  stylesGlobal.font_bodySmaller,
                ]}>
                {noteUpdatedAt.toLocaleDateString('en-GB')}{' '}
                {noteUpdatedAt.getHours() + ':' + noteUpdatedAt.getMinutes()}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      <View
        style={[
          styles.notesHeader,
          styles.notesHeaderDetail,
          darkMode ? stylesGlobal.bg_b2 : stylesGlobal.bg_w3,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.goBack}>
              <TouchableOpacity
                underlayColor={darkMode ? 'white' : 'black'}
                onPress={() => navigation.goBack()}>
                <Select_Option
                  color={
                    darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b1
                  }
                />
              </TouchableOpacity>
            </View>
            <Text
              style={[
                stylesGlobal.font_h1,
                stylesGlobal.color_w1,
                {alignSelf: 'center'},
              ]}>
              {note.icon != undefined
                ? String.fromCodePoint(parseInt(note.icon.substring(2), 16))
                : String.fromCodePoint(parseInt('1F4C4'))}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
                stylesGlobal.font_h1,
                styles.title,
              ]}>
              {note.title != undefined
                ? note.title.length < 18
                  ? `${note.title}`
                  : `${note.title.substring(0, 18)}...`
                : 'Note Title'}
            </Text>
          </View>
          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity onPress={() => onChangeMenu(true)}>
              <Options
                color={darkMode ? stylesGlobal.color_b6 : stylesGlobal.color_b3}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {!isOnline && offlineSection()}
      {hasMenu && menuSection()}
    </View>
  );
};

export const ShareHeader = ({note, navigation}) => {
  const darkMode = useContext(DarkModeContext);
  return (
    <View
      style={[
        styles.notesHeader,
        styles.notesHeaderDetail,
        darkMode ? stylesGlobal.bg_b2 : stylesGlobal.bg_w3,
      ]}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.goBack}>
          <TouchableOpacity
            underlayColor={darkMode ? 'white' : 'black'}
            onPress={() => navigation.goBack()}>
            <Select_Option
              color={darkMode ? stylesGlobal.color_w2 : stylesGlobal.color_b1}
            />
          </TouchableOpacity>
        </View>
        <Text style={[stylesGlobal.font_h1, stylesGlobal.color_w1]}>Share</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notesHeader: {
    paddingBottom: 10,
    paddingTop: 26,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  notesHeaderDetail: {
    paddingBottom: 20,
    paddingTop: 40,
  },
  searchButton: {
    borderRadius: 5,
    borderWidth: 2,
    paddingHorizontal: 18,
    paddingVertical: 4,
  },
  borderLight: {borderColor: 'rgba(255,255,255,0.1)'},
  borderDark: {borderColor: 'rgba(0,0,0,0.1)'},
  title: {marginLeft: 8},
  offline: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5,
    paddingTop: 16,
    marginTop: -10,
    borderRadius: 8,
    zIndex: -1,
  },
  menu: {
    position: 'absolute',
    right: 0,
    marginHorizontal: 10,
    marginTop: 40,
    width: 240,
    borderRadius: 8,
  },
  menuItem: {
    marginTop: -2,
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tagMenu: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 3,
    borderRadius: 25,
    flexDirection: 'row',
  },
  borderColor: {
    borderColor: 'rgba(0,0,0,.3)',
  },
  tagSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    padding: 10,
    borderBottomWidth: 2,
  },
  goBack: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    transform: [{scaleX: -1}],
  },
});
