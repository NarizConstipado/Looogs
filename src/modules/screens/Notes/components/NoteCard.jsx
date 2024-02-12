import React, {useContext} from 'react';
import {
  useColorScheme,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {DarkModeContext} from '../../../../App';
import stylesGlobal from '../../../../css/style';
import CardComponent from './CardComponents';

const NoteCard = ({
  note,
  favorite,
  navigation,
  OnFavComponentChange,
}) => {
  const isDark = useContext(DarkModeContext);
  const date = new Date(parseInt(note.createdAt));
  let dayOfWeek;
  switch (date.getDay()) {
    case 0:
      dayOfWeek = 'Sunday';
      break;
    case 1:
      dayOfWeek = 'Monday';
      break;
    case 2:
      dayOfWeek = 'Tuesday';
      break;
    case 3:
      dayOfWeek = 'Wednesday';
      break;
    case 4:
      dayOfWeek = 'Thursday';
      break;
    case 5:
      dayOfWeek = 'Friday';
      break;
    case 6:
      dayOfWeek = 'Saturday';
      break;
    default:
      dayOfWeek = 'InvalidDay';
      break;
  }
  const loadComponents = () => {
    if (favorite && note.components != undefined) {
      return note.components.map(component => {
        if (component.type !== 'text')
          return (
            <CardComponent
              key={component.id}
              component={component}
              OnFavComponentChange={OnFavComponentChange}
            />
          );
      });
    } else if(note.components != undefined) {
      return note.components.map(component => {
        if (component.type === 'text')
          return (
            <CardComponent
              key={component.id}
              component={component}
              OnFavComponentChange={OnFavComponentChange}
            />
          );
      });
    }
  };

  return (
    <View style={{marginBottom: 15, marginHorizontal: 5}}>
      <TouchableOpacity
        underlayColor={isDark ? 'white' : 'black'}
        onPress={() => navigation.navigate('NoteDetails', {note: note})}>
        <View
          style={[
            styles.cardBackground,
            isDark ? stylesGlobal.bg_b5 : stylesGlobal.bg_w2,
          ]}>
          <View style={styles.alignContent}>
            <Text
              style={[
                stylesGlobal.font_h4,
                styles.noteIcon,
                stylesGlobal.color_w1,
              ]}>
              {note.icon != undefined && String.fromCodePoint(parseInt(note.icon.substring(2), 16))}
            </Text>
            <Text
              style={[
                stylesGlobal.font_h4,
                isDark ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
                {width: '75%'},
              ]}>
              {note.title}
            </Text>
            <Text
              style={[
                stylesGlobal.font_subtitle,
                isDark ? stylesGlobal.color_w2 : stylesGlobal.color_b2,
              ]}>
              {dayOfWeek}
            </Text>
          </View>
          <View style={styles.noteContent}>
            {note.components !== null && loadComponents()}
          </View>
        </View>
        <View
          style={[
            styles.detailsBackground,
            isDark ? stylesGlobal.bg_b4 : styles.bg_detailLight,
            styles.alignContent,
          ]}>
          <View style={[stylesGlobal.bg_bl3, styles.noteDate]}>
            <Text style={[stylesGlobal.font_bodySmall, {color: '#0e434b'}]}>
              {date.toLocaleDateString('en-GB')}
            </Text>
          </View>
          {note.chapter !== null && note.chapter !== undefined ? (
            <View style={[styles.tag, {backgroundColor: note.chapter.color}]} />
          ) : (
            <View
              style={[
                styles.tag,
                isDark ? stylesGlobal.bg_w3 : stylesGlobal.bg_w4,
              ]}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBackground: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 8,
  },
  detailsBackground: {
    paddingHorizontal: 12,
    paddingBottom: 4,
    paddingTop: 20,
    marginTop: -16,
    borderRadius: 8,
    zIndex: -1,
  },
  alignContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  noteIcon: {
    marginRight: 4,
  },
  noteDate: {
    borderRadius: 8,
    paddingHorizontal: 5,
    marginVertical: 3,
  },
  tag: {
    width: 23,
    height: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  bg_detailLight: {
    backgroundColor: '#b0b0b0',
  },
  noteContent: {
    marginHorizontal: 12,
  },
});

export default NoteCard;
