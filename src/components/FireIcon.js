import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const FireIcon = () => {
  const flameOpacity = useRef(new Animated.Value(0)).current;
  const flameScale = useRef(new Animated.Value(1)).current;
  const flameRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopAnimation = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(flameOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(flameOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(flameScale, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(flameScale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(flameRotation, {
            toValue: -10,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(flameRotation, {
            toValue: 10,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(flameRotation, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]),
      ]).start(loopAnimation);
    };

    loopAnimation();
  }, []);

  const flameAnimatedStyle = {
    opacity: flameOpacity,
    transform: [
      { scale: flameScale },
      { rotate: flameRotation.interpolate({
          inputRange: [-10, 10],
          outputRange: ['-10deg', '10deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.moFire}>
      <Svg width="30" height="30" viewBox="0 0 24 24">
        <Path d="M12 2c-1.1 0-2 .9-2 2 0 1.66-1.34 3-3 3 .63 2.3 3.13 3.98 3 7 1.1 0 2-.9 2-2 0-1.66 1.34-3 3-3-.63-2.3-3.13-3.98-3-7z" fill="orange" />
        <Animated.Path
          d="M12 2c-1.1 0-2 .9-2 2 0 1.66-1.34 3-3 3 .63 2.3 3.13 3.98 3 7 1.1 0 2-.9 2-2 0-1.66 1.34-3 3-3-.63-2.3-3.13-3.98-3-7z"
          fill="yellow"
          style={flameAnimatedStyle}
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