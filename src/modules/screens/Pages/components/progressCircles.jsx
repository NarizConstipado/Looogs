import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import stylesGlobal from '../../../../css/style';
import { DarkModeContext } from '../../../../App';

export default function ProgressCircles(props) {
  const [circles, setCircles] = useState(0);
  const {darkMode, setDarkMode} = useContext(DarkModeContext)

  useEffect(() => {
    if (props.circles > 3) {
      setCircles(3);
    } else {
      setCircles(props.circles);
    }
  }, [props.circles]);

  const getProgressStyles = (i) => {

    if( (props.order == 0 && i == 0) ||
        (props.order == props.circles - 1 && i == 2)) {
      return(
        [
          styles.circles,
          { width: 20 }, // Highlight the current page
        ]
      )
    } else if (props.order > 0 && props.order < props.circles - 1 && i == 1) {
      return(
        [
          styles.circles,
          { width: 20 }, // Highlight the current page
        ]
      )
    } else {
      return(
        [
          styles.circles,
          { width: 10 }, // Highlight the current page
        ]
      )
    }

  }

  const loadCircles = () => {
    const circleArray = [];
    
    for (let i = 0; i < 3; i++) {

      console.log('order -', props.order);
      console.log('circles -', props.circles);
      const circleStyle = getProgressStyles(i)

      circleArray.push(
        <TouchableOpacity key={i} onPress={() => handlePagePress(i)}>
          <View style={circleStyle} />
        </TouchableOpacity>
      );
    }
    return circleArray;
  };

  const handlePagePress = (pageIndex) => {
    // Handle page press, you can navigate to the selected page or update the state accordingly
    console.log('Selected page:', pageIndex);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: 117,
    },
    circles: {
      backgroundColor: darkMode ? stylesGlobal.border_w1.borderColor : stylesGlobal.border_b1.borderColor,
      height: 10,
      borderRadius: 100,
    },
  });

  return (
    <View>
      {/* Circles */}
      <View style={styles.container}>{loadCircles()}</View>
    </View>
  );
}
