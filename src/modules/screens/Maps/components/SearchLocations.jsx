import { View, Text, Modal, TextInput, ScrollView, StyleSheet } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures';
import React from 'react'

import stylesGlobal from '../../../../css/style';
import { Search } from '../../../components/Svg'

import CardSearchLocation from './CardSearchLocation';


export default function SearchLocations({ locations, searchBar, setSearchBar, categories, showSearchModal, children, setShowSearchModal, setLocationInfo }) {
    if (showSearchModal) {
        return (
            <GestureRecognizer
                onSwipeDown={() => { setShowSearchModal(false) }}>
                <Modal animationType='slide' t>
                    <View style={[styles.containerLocations, stylesGlobal.bg_b3, { width: "100%", height: "100%" }]}>
                        <View style={[{ width: 106, height: 5, alignSelf: 'center', marginBottom: 13, borderRadius: 5 }, stylesGlobal.bg_b5]}></View>
                        {children}
                        <ScrollView>
                            <View style={styles.searchLocations}>
                                {locations.map(location => <CardSearchLocation {...location} setLocationInfo={() => { setShowSearchModal(false); setLocationInfo(parseInt(location.id)) }} />)}
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </GestureRecognizer>
        )
    } else {
        return (
            undefined
        )
    }
}

const styles = StyleSheet.create({
    searchContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: 27,
        width: 320,
    },
    searchBar: {
        borderStyle: "solid",
        borderWidth: 3,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 5,
        gap: 3,
    },
    searchBarInput: {
        padding: 0,
    },
    searchCategory: {
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 5,
        alignItems: "center",
    },
    containerLocations: {
        paddingTop: 10,
        height: 10
    },
    searchLocations: {
        marginTop: 25,
        alignItems: 'center',
    },
})