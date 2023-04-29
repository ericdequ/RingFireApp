import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const FireIcon = () => {
  const flameOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopAnimation = () => {
      Animated.sequence([
        Animated.timing(flameOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(flameOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(loopAnimation);
    };

    loopAnimation();
  }, []);

  return (
    <View style={styles.moFire}>
      <Svg width="30" height="30" viewBox="0 0 24 24">
        <Path
          d="M12 2c-1.1 0-2 .9-2 2 0 1.66-1.34 3-3 3 .63 2.3 3.13 3.98 3 7 1.1 0 2-.9 2-2 0-1.66 1.34-3 3-3-.63-2.3-3.13-3.98-3-7z"
          fill="orange"
        />
        <Animated.Path
          d="M12 2c-1.1 0-2 .9-2 2 0 1.66-1.34 3-3 3 .63 2.3 3.13 3.98 3 7 1.1 0 2-.9 2-2 0-1.66 1.34-3 3-3-.63-2.3-3.13-3.98-3-7z"
          fill="yellow"
          style={{ opacity: flameOpacity }}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  moFire: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default FireIcon;
