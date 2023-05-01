import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenuScreen from '../screens/MainMenuScreen';
import GameScreen from '../screens/GameScreen';
import { StyleSheet, View, Animated } from 'react-native';
import { Text } from 'react-native-paper';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  fireText: {
    fontSize: 36,
    fontWeight: 'bold',
    textShadowRadius: 3,
  },
});

const FireText = ({ children }) => {
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [animation]);

  const colorInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f5f5f5', 'orange'],
  });

  const shadowColorInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 99, 71, 0.8)', 'rgba(255, 165, 0, 0.8)'],
  });

  const animatedStyle = {
    color: colorInterpolation,
    textShadowColor: shadowColorInterpolation,
    textShadowOffset: { width: 1, height: 1 },
  };

  return <Animated.Text style={[styles.fireText, animatedStyle]}>{children}</Animated.Text>;
};

function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MainMenu"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitle: () => <FireText>RING OF FIRE</FireText>,
      }}
    >
      <Stack.Screen name="MainMenu" component={MainMenuScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
