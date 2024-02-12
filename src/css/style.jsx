import { font, View, StyleSheet, Dimensions } from 'react-native'
import React, { Component } from 'react'

const windowDimensions = Dimensions.get('window');

const stylesGlobal = StyleSheet.create({
    bg_b1: {
        backgroundColor: '#000000',
    },
    bg_b2: {
        backgroundColor: '#1c1c1e',
    },
    bg_b3: {
        backgroundColor: '#1f1f21',
    },
    bg_b4: {
        backgroundColor: '#28282a',
    },
    bg_b5: {
        backgroundColor: '#333333',
    },
    bg_b6: {
        backgroundColor: '#3d3d3d',
    },
    bg_bg6: {
        backgroundColor: '#104c56',
    },
    bg_bg7: {
        backgroundColor: '#0d3d45',
    },
    bg_bg8: {
        backgroundColor: '#0a2e33',
    },
    bg_bg9: {
        backgroundColor: '#091d20',
    },
    bg_w1: {
        backgroundColor: '#ffffff',
    },
    bg_w2: {
        backgroundColor: '#d4d4d4',
    },
    bg_w3: {
        backgroundColor: '#c2c2c2',
    },
    bg_w4: {
        backgroundColor: '#5b5b5d',
    },
    bg_w5: {
        backgroundColor: '#474748',
    },
    bg_bl1: {
        backgroundColor: '#31c2d8',
    },
    bg_bl2: {
        backgroundColor: '#27b7ce',
    },
    bg_bl3: {
        backgroundColor: '#24a8bc',
    },
    bg_b2Transparent: {
        backgroundColor: 'rgba(29, 138, 154, 0.6)',
    },
    bg_bg1: {
        backgroundColor: '#2199ab',
    },
    bg_bg2: {
        backgroundColor: '#1d8a9a',
    },
    bg_bg3: {
        backgroundColor: '#1a7a89',
    },
    bg_bg4: {
        backgroundColor: '#15616d',
    },
    bg_bg5: {
        backgroundColor: '#145c67',
    },
    bg_bgTransparent: {
        backgroundColor: 'rgba(42, 42, 42, 0.8)',
    },
    bg_r1: {
        backgroundColor: '#bf0d40',
    },
    bg_r2: {
        backgroundColor: '#990b33',
    },
    bg_r3: {
        backgroundColor: '#731a34',
    },
    bg_bgTransparentLight: {
        backgroundColor: 'rgba(181, 177, 177, 0.9)',
    },
    border_b1: {
        borderColor: '#000000',
    },
    border_b2: {
        borderColor: '#1c1c1e',
    },
    border_b3: {
        borderColor: '#1f1f21',
    },
    border_b4: {
        borderColor: '#28282a',
    },
    border_b5: {
        borderColor: '#333333',
    },
    border_b6: {
        borderColor: '#3d3d3d',
    },
    border_bg6: {
        borderColor: '#104c56',
    },
    border_bg7: {
        borderColor: '#0d3d45',
    },
    border_bg8: {
        borderColor: '#0a2e33',
    },
    border_bg9: {
        borderColor: '#091d20',
    },
    border_w1: {
        borderColor: '#ffffff',
    },
    border_w2: {
        borderColor: '#d4d4d4',
    },
    border_w3: {
        borderColor: '#c2c2c2',
    },
    border_w4: {
        borderColor: '#5b5b5d',
    },
    border_w5: {
        borderColor: '#474748',
    },
    border_bl1: {
        borderColor: '#31c2d8',
    },
    border_bl2: {
        borderColor: '#27b7ce',
    },
    border_bl3: {
        borderColor: '#24a8bc',
    },
    border_bg1: {
        borderColor: '#2199ab',
    },
    border_bg2: {
        borderColor: '#1d8a9a',
    },
    border_bg3: {
        borderColor: '#1a7a89',
    },
    border_bg4: {
        borderColor: '#15616d',
    },
    border_bg5: {
        borderColor: '#145c67',
    },
    border_r1: {
        borderColor: '#bf0d40',
    },
    border_r2: {
        borderColor: '#990b33',
    },
    border_r3: {
        borderColor: '#731a34',
    },
    color_b1: {
        color: '#000000',
    },
    color_b2: {
        color: '#1c1c1e',
    },
    color_b3: {
        color: '#1f1f21',
    },
    color_b4: {
        color: '#28282a',
    },
    color_b5: {
        color: '#333333',
    },
    color_b6: {
        color: '#3d3d3d',
    },
    color_bg6: {
        color: '#104c56',
    },
    color_bg7: {
        color: '#0d3d45',
    },
    color_bg8: {
        color: '#0a2e33',
    },
    color_bg9: {
        color: '#091d20',
    },
    color_w1: {
        color: '#ffffff',
    },
    color_w2: {
        color: '#d4d4d4',
    },
    color_w3: {
        color: '#c2c2c2',
    },
    color_w4: {
        color: '#5b5b5d',
    },
    color_w5: {
        color: '#474748',
    },
    color_bl1: {
        color: '#31c2d8',
    },
    color_bl2: {
        color: '#27b7ce',
    },
    color_bl3: {
        color: '#24a8bc',
    },
    color_bg1: {
        color: '#2199ab',
    },
    color_bg2: {
        color: '#1d8a9a',
    },
    color_bg3: {
        color: '#1a7a89',
    },
    color_bg4: {
        color: '#15616d',
    },
    color_bg5: {
        color: '#145c67',
    },
    color_r1: {
        color: '#bf0d40',
    },
    color_r2: {
        color: '#990b33',
    },
    color_r3: {
        color: '#731a34',
    },
    font_titleHuge: {
        fontSize: (((100*64)/360) * windowDimensions.width) / 100,
        fontFamily: 'Heebo-Bold',
        includeFontPadding: false,
    },
    font_titleBig: {
        fontSize: (((100*40)/360) * windowDimensions.width) / 100,
        fontFamily: 'Heebo-Bold',
        includeFontPadding: false,
    },
    font_h1: {
        fontSize: (((100*24)/360) * windowDimensions.width) / 100,
        fontFamily: 'Heebo-Bold',
        includeFontPadding: false,
    },
    font_h2: {
        fontSize: (((100*22)/360) * windowDimensions.width) / 100,
        fontFamily: 'Heebo-Bold',
        includeFontPadding: false,
    },
    font_h3: {
        fontSize: (((100*20)/360) * windowDimensions.width) / 100,
        fontFamily: 'Heebo-Bold',
        includeFontPadding: false,
    },
    font_h4: {
        fontSize: (((100*16)/360) * windowDimensions.width) / 100,
        fontFamily: 'Heebo-Bold',
        includeFontPadding: false,
    },
    font_subtitle: {
        fontSize: (((100*12)/360) * windowDimensions.width) / 100,
        fontFamily: 'Heebo-Medium',
        includeFontPadding: false,
    },
    font_subtitle2: {
        fontSize: (((100*14)/360) * windowDimensions.width) / 100,
        fontFamily: 'Heebo-Regular',
        includeFontPadding: false,
    },
    font_bodyLarge: {
        fontSize: (((100*16)/360) * windowDimensions.width) / 100,
        fontFamily: 'NotoSans-Regular',
        includeFontPadding: false,
    },
    font_bodyBold: {
        fontSize: (((100*14)/360) * windowDimensions.width) / 100,
        fontFamily: 'NotoSans-Bold',
        includeFontPadding: false,
    },
    font_body: {
        fontSize: (((100*14)/360) * windowDimensions.width) / 100,
        fontFamily: 'NotoSans-Regular',
        includeFontPadding: false,
    },
    font_bodySmall: {
        fontSize: (((100*12)/360) * windowDimensions.width) / 100,
        fontFamily: 'NotoSans-Regular',
        includeFontPadding: false,
    },
    font_bodySmaller: {
        fontSize: (((100*10)/360) * windowDimensions.width) / 100,
        fontFamily: 'NotoSans-Regular',
        includeFontPadding: false,
    },
    font_detail: {
        fontSize: (((100*8)/360) * windowDimensions.width) / 100,
        fontFamily: 'NotoSans-Bold',
        includeFontPadding: false,
    },
    font_detailTyne: {
        fontSize: (((100*6)/360) * windowDimensions.width) / 100,
        fontFamily: 'NotoSans-Bold',
        includeFontPadding: false,
    },
    font_navBar: {
        fontSize: (((100*12)/360) * windowDimensions.width) / 100,
        fontFamily: 'Heebo-Bold',
    },
    tabCircle: {
        width: (((100*53)/360) * windowDimensions.width) / 100,
        height: (((100*53)/360) * windowDimensions.width) / 100,
        borderRadius: (((100*(53/2))/360) * windowDimensions.width) / 100,
    },
    centerChildren: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default stylesGlobal;