import React, {useState, useEffect, useContext} from 'react';
import {useColorScheme, StatusBar, Text, View, StyleSheet} from 'react-native';
import stylesGlobal from '../../../css/style.jsx';
import {DarkModeContext} from '../../../App.jsx';
import {ShareHeader} from './components/NoteHeaders.jsx';
import {ShareButton, SearchBar} from './components/ShareComponents.jsx';

export default function NoteDetails({navigation, route}) {
  const isDark = useContext(DarkModeContext);
  const [note, setNote] = useState(route.params.noteID);
  useEffect(() => {}, []);
  return (
    <View
      style={[isDark ? stylesGlobal.bg_b1 : stylesGlobal.bg_w1, styles.screen]}>
      <StatusBar barStyle={isDark ? 'white' : 'black'} />
      <ShareHeader note={note} navigation={navigation} />
      <View style={styles.composition}>
        {/* <View style={styles.qrCode}></View> */}
        <Text
          style={[
            isDark ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
            styles.text,
            stylesGlobal.font_body,
          ]}>
          Scan the QR Code or add manually by writing your friends username
        </Text>
        <SearchBar />
        <ShareButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  composition: {height: '100%', alignItems: 'center', justifyContent: 'center'},
  text: {marginHorizontal: 46, textAlign: 'center', marginBottom: 14},
});
