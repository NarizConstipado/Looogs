import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableLatestRenderer} from 'react-native-maps';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';

enableLatestRenderer();

import HomeScreen from './modules/screens/Home/HomeScreen.jsx';
import MapsScreen from './modules/screens/Maps/MapsScreen.jsx';
import NotesScreen from './modules/screens/Notes/NotesScreen.jsx';
import ToolsScreen from './modules/screens/Tools/ToolsScreen.jsx';
import NoteDetails from './modules/screens/Notes/NoteDetails.jsx';
import Page from './modules/screens/Pages/PageScreen.jsx';
import Manual from './modules/screens/Manual/ManualScreen.jsx';
import ShareNote from './modules/screens/Notes/NoteShare.jsx';
import Profile from './modules/screens/Profile/ProfileScreen.jsx';
import Login from './modules/screens/Login/LoginScreen.jsx';
import Register from './modules/screens/Register/RegisterScreen.jsx';

import {getData, storeData, checkForUpdates} from './utilities/utilities.jsx';

import stylesGlobal from './css/style.jsx';
import {
  Home_Selected,
  Home,
  Maps_Selected,
  Maps,
  Tools_Selected,
  Tools,
  Notes_Selected,
  Notes,
} from './modules/components/Svg.jsx';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {};
const MapsStack = () => {};
const ToolsStack = () => {};

export const DarkModeContext = React.createContext();

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isOnline, setConnection] = useState(false);

  const [notes, setNotes] = useState([]);
  const [favoriteNotes, setFavoriteNotes] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [tags, setTags] = useState([]);

  const NavBar = () => {
    const tabBarOptions = route => {
      return {
        tabBarStyle: [
          darkMode ? stylesGlobal.bg_b2 : stylesGlobal.bg_w3,
          {height: 60, borderTopWidth: 0},
        ],
        tabBarIcon: ({focused}) => {
          let icon;
          if (route.name === 'Home') {
            icon = focused ? (
              <View
                style={[
                  stylesGlobal.tabCircle,
                  stylesGlobal.centerChildren,
                  darkMode ? stylesGlobal.bg_w1 : stylesGlobal.bg_w4,
                ]}>
                <Home_Selected />
                <Text
                  style={[
                    stylesGlobal.font_navBar,
                    darkMode ? stylesGlobal.color_b1 : stylesGlobal.color_b1,
                  ]}>
                  Home
                </Text>
              </View>
            ) : (
              <View style={stylesGlobal.centerChildren}>
                <Home
                  color={
                    darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1
                  }
                />
                <Text
                  style={[
                    stylesGlobal.font_navBar,
                    darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
                  ]}>
                  Home
                </Text>
              </View>
            );
          } else if (route.name === 'Maps') {
            icon = focused ? (
              <View
                style={[
                  stylesGlobal.tabCircle,
                  stylesGlobal.centerChildren,
                  darkMode ? stylesGlobal.bg_w1 : stylesGlobal.bg_w4,
                ]}>
                <Maps_Selected />
                <Text
                  style={[
                    stylesGlobal.font_navBar,
                    darkMode ? stylesGlobal.color_b1 : stylesGlobal.color_w1,
                  ]}>
                  Maps
                </Text>
              </View>
            ) : (
              <View style={stylesGlobal.centerChildren}>
                <Maps
                  color={
                    darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1
                  }
                />
                <Text
                  style={[
                    stylesGlobal.font_navBar,
                    darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
                  ]}>
                  Maps
                </Text>
              </View>
            );
          } else if (route.name === 'Notes') {
            icon = focused ? (
              <View
                style={[
                  stylesGlobal.tabCircle,
                  stylesGlobal.centerChildren,
                  darkMode ? stylesGlobal.bg_w1 : stylesGlobal.bg_w4,
                ]}>
                <Notes_Selected />
                <Text
                  style={[
                    stylesGlobal.font_navBar,
                    darkMode ? stylesGlobal.color_b1 : stylesGlobal.color_w1,
                  ]}>
                  Notes
                </Text>
              </View>
            ) : (
              <View style={stylesGlobal.centerChildren}>
                <Notes
                  color={
                    darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1
                  }
                />
                <Text
                  style={[
                    stylesGlobal.font_navBar,
                    darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
                  ]}>
                  Notes
                </Text>
              </View>
            );
          } else if (route.name === 'Tools') {
            icon = focused ? (
              <View
                style={[
                  stylesGlobal.tabCircle,
                  stylesGlobal.centerChildren,
                  darkMode ? stylesGlobal.bg_w1 : stylesGlobal.bg_w4,
                ]}>
                <Tools_Selected />
                <Text
                  style={[
                    stylesGlobal.font_navBar,
                    darkMode ? stylesGlobal.color_b1 : stylesGlobal.color_w1,
                  ]}>
                  Tools
                </Text>
              </View>
            ) : (
              <View style={stylesGlobal.centerChildren}>
                <Tools
                  color={
                    darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1
                  }
                />
                <Text
                  style={[
                    stylesGlobal.font_navBar,
                    darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1,
                  ]}>
                  Tools
                </Text>
              </View>
            );
          }
          return icon;
        },
        headerShown: false,
        tabBarShowLabel: false,
      };
    };

    return (
      <Tab.Navigator screenOptions={({route}) => tabBarOptions(route)}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Notes" component={NotesScreen} />
        <Tab.Screen name="Maps" component={MapsScreen} />
        <Tab.Screen name="Tools" component={ToolsScreen} />
      </Tab.Navigator>
    );
  };

  const validConnection = async () => {
    const storedUser = await getData('token');
    if (storedUser === 'no data' && !isOnline)
      return navigation.navigate('Login');
    else {
      const storedNotes = await getData('notes');
      if (storedNotes === 'no data') setNotes([]);
      else setNotes(storedNotes);
      const storedFavoriteNotes = await getData('favoriteNotes');
      if (storedFavoriteNotes === 'no data') setFavoriteNotes([]);
      else setFavoriteNotes(storedFavoriteNotes);
      const storedChapters = await getData('userChapters');
      if (storedChapters === 'no data') setChapters([]);
      else setChapters(storedChapters);
      const storedTags = await getData('userTags');
      if (storedTags === 'no data') setTags([]);
      else setTags(storedTags);
      if (isOnline) {
        checkForUpdates(setChapters, setTags, setFavoriteNotes, setNotes);
      }
    }
  };

  useEffect(() => {
    validConnection();
  }, [isOnline]);

  useEffect(() => {
    const netInfoSubscription = NetInfo.addEventListener(state =>
      setConnection(state.isConnected),
    );
    return () => netInfoSubscription();
  }, []);

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        notes,
        setNotes,
        favoriteNotes,
        setFavoriteNotes,
        chapters,
        setChapters,
        tags,
        setTags,
      }}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="NavBar">
            <Stack.Screen
              name="NavBar"
              component={NavBar}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NoteDetails"
              component={NoteDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ShareNote"
              component={ShareNote}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Page"
              component={Page}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Manual"
              component={Manual}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </DarkModeContext.Provider>
  );
}
