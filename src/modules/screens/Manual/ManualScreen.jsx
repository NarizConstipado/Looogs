import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

import ItemRectangle from './components/ItemRectangle';
import ItemSquare from './components/ItemSquare';
import stylesGlobal from '../../../css/style';
import { Grid, List , Select_Option } from '../../components/Svg';
import { DarkModeContext } from '../../../App';

import { getLessons, getProgress } from '../../../../api/lessons';

export default function Manual({navigation}) {
  // test data
  const [items, setItems] = useState([
    {
      title: 'How to start a campfire',
      progress: 75,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/0/0f/Campfire_Pinecone.png',
    },
    {
      title: 'How to cook marshmallows',
      progress: 25,
      image:
        'https://d384u2mq2suvbq.cloudfront.net/public/spree/products/3823/large/campfire-marshmallow-fragrance-oil-web.jpg?1654514684',
    },
    {
      title: 'Proper use of a tent',
      progress: 100,
      image:
        'https://www.tripsavvy.com/thmb/-DkDDUjTS3nqisOa1XEd2cTf8l4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/campsite5-bde7fa2945cd45ef994556195fc43e7f.jpg',
    },
  ]);
  const [lineFormation, setLineFormation] = useState(false);
  const {darkMode, setDarkMode} = useContext(DarkModeContext);
  const [isLoading, setIsLoading] = useState(true)
  const [lessons, setLessons] = useState([])
  const [progress, setProgress] = useState([])

  const loadUserData = async () => {
    try {
      const res = await getLessons(0, 10, 0, 10);
      console.log(res.getCourses);
      const lel = res.getCourses

      setLessons([])

      res.getCourses.forEach((lesson) => {
        title: lesson.title
      })

      res.getCourses.forEach(async (lesson) => {
        const data = await getProgress(lesson.id)
        console.log(data);
      })

    } catch (err) {
        console.log(err);
    } finally {
        setIsLoading(false); // Set loading to false when the data is loaded or an error occurs
    }
  }

  useEffect(() => {

    loadUserData()

  }, [])

  const handleFormation = () => {
    setLineFormation(lineFormation ? false : true)
    console.log('yau');
  }

  const handleBack = () => {
    navigation.goBack();
  }

  const styles = StyleSheet.create({
    containerSquare: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 15,
    },
    h1: {
      color: darkMode ? 'white' : 'black',
      marginTop: 12,
      marginLeft: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10
    },
    backAndTitle: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginLeft: 10
    },
    formation: {
      marginRight: 20
    }
  });
  if(!isLoading){
      if (lineFormation) {
        return (
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={ darkMode ? stylesGlobal.bg_b2 : stylesGlobal.bg_w1 }>
            <View style={styles.headerContainer}>
              <View style={styles.backAndTitle}>
                <View style={{transform: [{scaleX: -1}]}}>
                  <TouchableOpacity onPress={handleFormation}>
                    <Select_Option color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.h1, stylesGlobal.font_h2]}>Manual</Text>
              </View>
              <TouchableWithoutFeedback onPress={handleFormation}>
                <View style={styles.formation}>
                    <List color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.containerSquare}>
              {items.map((item, index) => (
                <ItemRectangle item={item} navigation={navigation} key={index} />
              ))}
            </View>
          </ScrollView>
        );
      } else {
        return (
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={ darkMode ? stylesGlobal.bg_b2 : stylesGlobal.bg_w1 }>
            <View style={styles.headerContainer}>
              <View style={styles.backAndTitle}>
                <View style={{transform: [{scaleX: -1}]}}>
                  <TouchableOpacity onPress={handleBack}>
                    <Select_Option color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.h1, stylesGlobal.font_h2]}>Manual</Text>
              </View>
              <TouchableWithoutFeedback onPress={handleFormation}>
                <View style={styles.formation}>
                    <Grid color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.containerSquare}>
              {items.map((item, index) => (
                <ItemSquare item={item} navigation={navigation} key={index} />
              ))}
            </View>
          </ScrollView>
        );
      }
    }
  }

