import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  useColorScheme,
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
  ScrollView
} from 'react-native';
import LocationView from './components/LocationView';
import SearchLocations from './components/SearchLocations';
import SearchBar from './components/SearchBar';

import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

import { Person, Aim } from '../../components/Svg'


import { getLocations, getLocationsByTitle } from '../../../../api/maps';
import stylesGlobal from '../../../css/style';

export default function MapsScreen({ navigation, route }) {
  const isDarkMode = useColorScheme() === 'dark';

  const [region, setRegion] = useState(undefined);


  const [currentPosition, setCurrentPosition] = useState(undefined);

  const [locations, setLocations] = useState([]);
  const [locationInfo, setLocationInfo] = useState(route.params ? route.params.location : undefined);

  const [destination, setDestination] = useState(undefined);
  const [directionInfo, setDirectionInfo] = useState(undefined)

  const [lastPosition, setLastPosition] = useState(undefined)

  const [searchBar, setSearchBar] = useState('');
  const [categories, setCategories] = useState([])
  const [searchLocations, setSearchLocations] = useState([]);

  const [showSearchModal, setShowSearchModal] = useState(false)

  const refUserLocation = useRef(null)

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        if (region == undefined) setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
        setCurrentPosition(position)
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true },
    )
  }

  const getLastPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLastPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true },
    )
  }

  useEffect(() => {
    getLocations()
      .then(res => { setLocations(res.getLocations), setCategories(res.getLocations.map(location => location.category)) })
      .catch(err => console.error(err));
    getCurrentPosition();
  }, [])

  useEffect(() => {
    if (typeof (locationInfo) === 'number') {
      setLocationInfo(() => locations.find((location) => location.id == locationInfo))
    }
  }, [locationInfo])

  const onRegionChange = (region) => {
    setRegion(region);
  }

  const handleBackToUser = () => {
    let r = {
      latitude: currentPosition.coords.latitude,
      longitude: currentPosition.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    refUserLocation.current.animateToRegion(r)
  }

  const handleSearchLocation = () => {
    if (searchBar) {
      getLocationsByTitle(searchBar, 0, 5).then(res => setSearchLocations(res.getLocationsByTitle))
      setShowSearchModal(true)
    } else {
      setShowSearchModal(false)
    }
  }

  return (
    <View style={styles.container}>
      {region ?
        <MapView
          ref={refUserLocation}
          style={styles.map}
          initialRegion={region}
          toolbarEnabled={false}
          loadingEnabled={true}
          loadingIndicatorColor={stylesGlobal.color_bg1.color}
          loadingBackgroundColor={stylesGlobal.color_b3.color}
          // region={region}
          onRegionChange={onRegionChange}
          provider={PROVIDER_GOOGLE}
        >
          {destination ?
            <MapViewDirections
              origin={{ latitude: currentPosition.coords.latitude, longitude: currentPosition.coords.longitude }}
              destination={destination}
              apikey='AIzaSyC6SR61BpLKZuM4jqOVJr-I-ZIl1lprqio'
              strokeWidth={3}
              strokeColor={stylesGlobal.color_bg1.color}
              onReady={(log) => setDirectionInfo(log.legs[0])}
            />
            : undefined
          }


          {currentPosition ? <Marker // User Current Position
            coordinate={{ latitude: currentPosition.coords.latitude, longitude: currentPosition.coords.longitude }}
            icon={require('../../../../assets/icons/currentLocation.png')}
            anchor={{ x: 0.5, y: 0.5 }}
          /> : undefined}
          {
            locations ? locations.map((location) => (
              <Marker
                icon={require('../../../../assets/icons/marker.png')}
                key={`location${location.id}`}
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title={location.title}
                description={location.address}
                onPress={() => setLocationInfo(location)}
              />
            )) : undefined
          }
          {
            lastPosition ?
              <Marker
                icon={require('../../../../assets/icons/person.png')}
                coordinate={{ latitude: lastPosition.latitude, longitude: lastPosition.longitude }}
                title={"last position saved"}
              />
              : undefined
          }
        </MapView>
        : undefined
      }
      {
        locationInfo && typeof (locationInfo) != 'number' ?
          <LocationView
            location={locationInfo}
            setLocation={setLocationInfo}
            setDestination={setDestination}
            directionInfo={directionInfo}
          />
          : undefined
      }
      {
        lastPosition ?
          <TouchableWithoutFeedback onPress={() => setLastPosition(undefined)}>
            <View style={[styles.btnCurrentPosition, stylesGlobal.bg_bg1, stylesGlobal.border_bg3]}><Person color={stylesGlobal.color_bg5} /></View>
          </TouchableWithoutFeedback>
          : <TouchableWithoutFeedback onPress={getLastPosition}>
            <View style={[styles.btnCurrentPosition, stylesGlobal.bg_bg5, stylesGlobal.border_bg3]}><Person color={stylesGlobal.color_bg1} /></View>
          </TouchableWithoutFeedback>
      }
      <TouchableWithoutFeedback onPress={handleBackToUser}>
        <View style={[styles.btnBackToCurrentLocation, stylesGlobal.bg_bg1, stylesGlobal.border_bg3]}><Aim color={stylesGlobal.color_bg5} /></View>
      </TouchableWithoutFeedback>

      <SearchBar searchBar={searchBar} setSearchBar={setSearchBar} onSubmitEditing={handleSearchLocation} categories={categories} />


      <SearchLocations
        locations={searchLocations}
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        categories={categories}
        showSearchModal={showSearchModal}
        setShowSearchModal={setShowSearchModal}
        setLocationInfo={setLocationInfo}>
        <SearchBar searchBar={searchBar} setSearchBar={setSearchBar} onSubmitEditing={handleSearchLocation} categories={categories} isChildren={true} />
      </SearchLocations>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  btnCurrentPosition: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  btnBackToCurrentLocation: {
    position: 'absolute',
    right: 10,
    bottom: 80,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: 'solid',
  },
});