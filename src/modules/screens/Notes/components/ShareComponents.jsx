import React, {useContext} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {DarkModeContext} from '../../../../App';
import {Search} from '../../../components/Svg';
import stylesGlobal from '../../../../css/style';

export const ShareButton = () => {
  return (
    <View style={[stylesGlobal.bg_bl2, {borderRadius: 8}]}>
      <View style={[styles.shareButton]}>
        <TouchableOpacity>
          <Text style={[stylesGlobal.color_bg8, stylesGlobal.font_h3]}>
            Share Note
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const SearchBar = () => {
  const isDark = useContext(DarkModeContext);
  value = false;
  const handleSearch = () => {};

  return (
    <View
      style={[
        styles.searchContainer,
        stylesGlobal.bg_bg9,
        stylesGlobal.border_bg7,
      ]}>
      <Search color={stylesGlobal.color_w1} />
      <TextInput
        value={value}
        onSubmitEditing={handleSearch}
        onChange={e => setValue(e.nativeEvent.text)}
        style={[{height: 40}, stylesGlobal.font_bodyLarge, stylesGlobal.bg_bg9]}
        placeholder="Search"
        placeholderTextColor={stylesGlobal.color_bg1.color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    borderRadius: 25,
    height: 50,
    width: 260,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 18,
    borderWidth: 2,
  },
  outlineStyle: {
    borderRadius: 7,
    padding: 3,
    width: '100%',
  },
  shareButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: 'rgba(0,0,0,0.5)',
  },
});
