import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import stylesGlobal from '../../../../css/style'
import { Maps, Heart, Trash, Badge } from '../../../components/Svg';
import { DarkModeContext } from '../../../../App.jsx'

export default function Information(props) {

    const [info, setInfo] = useState([])
    const {darkMode, setDarkMode} = useContext(DarkModeContext)

    useEffect(() => {
    
        switch (props.dataType) {
          case 0:
            if (props.moreInfo) {
              setInfo(props.info);
            } else {
              setInfo([
                props.info[0],
                props.info[1]
              ]);
            }
            break;
            case 1:
                setInfo([])
                break;
            case 2:
                setInfo([])
                break;
            case 3:
                setInfo([])
                break;
          // Add cases for other dataTypes if needed
          default:
            break;
        }
      }, [props.dataType]);

    const styles = StyleSheet.create({
        text: {
            color: darkMode ? stylesGlobal.color_w1.color : stylesGlobal.color_b1.color,
            margin: 7,
            width: '72.5%',
        },
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }
    })

    if(info) { 
        switch (props.dataType) {
            case 0:
                return (
                    <View>
                        {info.map((info, i) => (
                            <View key={i} style={styles.container}>
                                <Maps color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, stylesGlobal.font_body]}>{info}</Text>
                            </View>
                        ))}
                    </View>
                )
            case 1:
                return (
                    <View>
                        {info.map((info, i) => (
                        <View key={i} style={styles.container}>
                            <Heart color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, stylesGlobal.font_body]}>{info}</Text>
                        </View>
                        ))}
                    </View>
                )
            case 2:
                return (
                    <View>
                        {info.map((info, i) => (
                            <View key={i} style={styles.container}>
                                <Trash color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, stylesGlobal.font_body]}>{info}</Text>
                            </View>
                        ))}
                    </View>
                )
            case 3:
                return (
                    <View>
                        {info.map((info, i) => (
                            <View key={i} style={styles.container}>
                                <Badge color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, stylesGlobal.font_body]}>{info}</Text>
                            </View>
                        ))}
                    </View>
                )
            default:
                break;
        }
    }

}
