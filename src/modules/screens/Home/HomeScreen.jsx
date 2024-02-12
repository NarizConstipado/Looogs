import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  useColorScheme,
  StatusBar,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import CardHome from './components/CardHome';
import SearchCategory from './components/SearchCategory';
import SearchResult from './components/SearchResult';
import SearchBar from './components/SearchBar';
import Title from './components/Title';
import Profile from './components/Profile';
import LottieView from 'lottie-react-native';


import { getMe } from '../../../../api/home';
import { getNotes } from '../../../../api/notes';
import stylesGlobal from '../../../css/style';
import { Book } from '../../components/Svg';

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    width: '100%',
    height: '100%',
    alignItems: 'flex-start'
  },
  containerMain: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    paddingLeft: 47,
    paddingRight: 47,
  },
  containerHeader: {
    width: '100%'
  },
  containerSearch: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: "100%",
    flexGrow: 1,
    paddingTop: 15,
    paddingBottom: 15
  },
  containerMenu: {
    width: '100%',
    paddingBottom: 35,
  }
});


export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState(null);

  const [isSearching, setIsSearching] = useState('');
  const [search, setSearch] = useState(undefined);

  const [notes, setNotes] = useState(undefined);

  useEffect(() => {
    getMe()
      .then(res => setUser(res.getMe))
      .catch(err => console.error(err));
    getNotes(0, 5)
      .then(res => {
        setNotes(res.getNotes)
      })
      .catch(err => console.error(err))
  }, []);

  useEffect(() => {
    if (user) {
      const favorites = user.favorites.notes.concat(user.favorites.locations);
      setFavorites(favorites.sort((a, b) => {
        if (a.title < b.title) return -1;
        else if (a.title > b.title) return 1;
        else return 0;
      }));
    }
  }, [user])

  const isDarkMode = true;
  if (user) {
    return (
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.page}>
          <LottieView
            style={{ position: 'absolute', height: "100%", width: "100%", bottom: 0 }}
            source={require('../../../../assets/animations/homeSpring.json')}
            autoPlay
            loop />
          <View style={styles.containerMain}>

            <View style={styles.containerHeader}>
              <Profile url={user.image} isDarkMode={isDarkMode} navigation={navigation} />
              <SearchBar value={isSearching} setValue={setIsSearching} setData={setSearch} isDarkMode={isDarkMode} />
            </View>

            {search ?
              <View style={styles.containerSearch}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ height: 0, width: '100%' }}>
                  {search.getNotesByTitle.length > 0 ?
                    <React.Fragment>
                      <View style={{ flexDirection: 'row' }}>
                        <SearchCategory title='Notes' isDarkMode={isDarkMode} />
                      </View>
                      {search.getNotesByTitle.map((note) =>
                        <View style={{ flexDirection: 'row' }}>
                          <SearchResult navigation={navigation} {...note} isDarkMode={isDarkMode} />
                        </View>
                      )}
                    </React.Fragment>
                    :
                    undefined}
                  {search.getLocationsByTitle.length > 0 ?
                    <React.Fragment>
                      <View style={{ flexDirection: 'row' }}>
                        <SearchCategory title='Locations' isDarkMode={isDarkMode} />
                      </View>
                      {search.getLocationsByTitle.map((location) =>
                        <View style={{ flexDirection: 'row' }}>
                          <SearchResult navigation={navigation} {...location} isDarkMode={isDarkMode} />
                        </View>
                      )}
                    </React.Fragment>
                    :
                    undefined}
                  {search.getUserChaptersByTitle.length > 0 ?
                    <React.Fragment>
                      <View style={{ flexDirection: 'row' }}>
                        <SearchCategory title='Chapters' isDarkMode={isDarkMode} />
                      </View>
                      {search.getUserChaptersByTitle.map((chapter) =>
                        <View style={{ flexDirection: 'row' }}>
                          <SearchResult navigation={navigation} {...chapter} isDarkMode={isDarkMode} />
                        </View>
                      )}
                    </React.Fragment>
                    :
                    undefined}
                </ScrollView>
              </View>
              :
              <View style={styles.containerSearch}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ height: 0, width: '100%' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <SearchCategory title='Favorite' isDarkMode={isDarkMode} />
                  </View>
                  {favorites ? favorites.map((favorite) => {
                    return (<View style={{ flexDirection: 'row' }}>
                      <SearchResult navigation={navigation} {...favorite} isDarkMode={isDarkMode} />
                    </View>);
                  }) : undefined}
                </ScrollView>
              </View>
            }

            <View style={styles.containerMenu}>
              <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                <Title title='Discover' isDarkMode={isDarkMode} />
              </View>
              <ScrollView style={{
                overflow: 'visible',
              }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <CardHome title="Manual" iconURL={""} isDarkMode={isDarkMode} onPress={() => {
                  navigation.navigate('Manual');
                }} ><Book color={stylesGlobal.color_w1} /></CardHome>
                {notes ? notes.map((note) =>
                  <CardHome title={note.title} isDarkMode={isDarkMode}>
                    <Text style={stylesGlobal.font_h1}>
                      {String.fromCodePoint(parseInt(`0x${note.icon.replace('U+', '')}`))}
                    </Text>
                  </CardHome>
                ) : undefined}
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    <View>
      <Text>lodding</Text>
    </View>
  }
}
