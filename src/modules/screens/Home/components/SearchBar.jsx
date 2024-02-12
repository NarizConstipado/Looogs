import { TextInput, View, StyleSheet } from 'react-native'
import React from 'react'
import stylesGlobal from '../../../../css/style'
import { Search } from '../../../components/Svg'
import { getSearching } from '../../../../../api/home'

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 11,
        paddingBottom: 11,
        paddingRight: 25,
        paddingLeft: 25,
    },
    outlineStyle: {
        borderRadius: 7,
        padding: 3,
        width: "100%",
    }
});

export default function SearchBar({ value, setValue, setData, isDarkMode, api }) {

    function handleSearch() {
        if (value.length > 0) {
            getSearching(value)
                .then(res =>
                    setData(res))
                .catch(error => {
                    console.error(error);
                })
        } else {
            setData(undefined)
        }
    }

    if (isDarkMode) {
        return (
            <View style={[
                styles.outlineStyle,
                stylesGlobal.bg_b4
            ]}>
                <View style={[
                    styles.container,
                    stylesGlobal.bg_b2
                ]}>
                    <Search color={
                        value ?
                            { color: '#D4D4D4' } : { color: '#5B5B5D' }}
                    />
                    <TextInput value={value}
                        onSubmitEditing={handleSearch}
                        onChange={(e) => setValue(e.nativeEvent.text)}
                        style={[
                            { height: 40 },
                            stylesGlobal.font_body,
                            stylesGlobal.color_w2
                        ]}
                        placeholder='Search'
                        placeholderTextColor={'#5B5B5D'}
                    />
                </View>
            </View>
        )
    } else {
        return (
            <View style={[
                styles.outlineStyle,
                stylesGlobal.bg_w1
            ]}>
                <View style={[
                    styles.container,
                    stylesGlobal.bg_w2
                ]}>
                    <Search color={
                        value ?
                            { color: '#1C1C1E' } : { color: '#5B5B5D' }
                    } />
                    <TextInput value={value}
                        onSubmitEditing={handleSearch}
                        onChange={(e) => setValue(e.nativeEvent.text)}
                        style={[
                            { height: 40 },
                            stylesGlobal.font_body,
                            stylesGlobal.color_b2
                        ]}
                        placeholder='Search'
                        placeholderTextColor={'#5B5B5D'}
                    />
                </View>
            </View>
        )
    }
}
