import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainMenuScreen from '../screens/MainMenuScreen';
import GameScreen from '../screens/GameScreen';


const AppNavigator = createStackNavigator({
  MainMenu: { screen: MainMenuScreen },
  Game: { screen: GameScreen },
});


export default createAppContainer(AppNavigator);
