import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import stylesGlobal from '../../../../css/style';

import { Search } from '../../../components/Svg'


export default function SearchBar({ searchBar, setSearchBar, onSubmitEditing, categories, isChildren }) {
    return (
        <View style={[styles.searchContainer, isChildren ? { position: 'relative', top: 0 } : undefined]}>
            <View style={[styles.searchBar, stylesGlobal.bg_b2, stylesGlobal.border_b6]}>
                <Search color={stylesGlobal.color_w1} />
                <TextInput
                    style={[styles.searchBarInput, stylesGlobal.font_body]}
                    placeholder='Pesquisa'
                    placeholderTextColor={stylesGlobal.color_w1.color}
                    value={searchBar}
                    onChangeText={setSearchBar}
                    onSubmitEditing={onSubmitEditing} />
            </View>
            {<ScrollView style={{ flexDirection: 'row', marginTop: 3 }}>
                {categories.map(category => <Text key={`${category}`} style={[styles.searchCategory, stylesGlobal.font_bodySmall, stylesGlobal.bg_b4]}>{category}</Text>)}
            </ScrollView>}
        </View>
    )
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
})