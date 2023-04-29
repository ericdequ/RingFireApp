import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainMenuScreen from '../screens/MainMenuScreen';
import GameScreen from '../screens/GameScreen';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const AppNavigator = createStackNavigator(
  {
    MainMenu: { screen: MainMenuScreen },
    Game: { screen: GameScreen },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTitle: () => (
        <Text style={styles.fireText}>Ring of Fire</Text>
      ),
    },
  }
);

const styles = StyleSheet.create({
  fireText: {
    fontFamily: 'Open Sans',
    color: '#f5f5f5',
    textShadowColor: 'rgba(255, 99, 71, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default createAppContainer(AppNavigator);
