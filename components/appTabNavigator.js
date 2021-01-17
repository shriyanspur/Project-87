import * as React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './appStackNavigator';
import ExchangeScreen from '../screens/exchangeScreen';

export const AppTabNavigator = createBottomTabNavigator(
  {
    Home: { 
      screen: AppStackNavigator, 
      navigationOptions: {
        tabBarIcon: <Image source={require('../assets/request-list.png')} style={{width: 30, height: 30, marginBottom: -5}}/>,
        tabBarLabel: 'Home'
      } 
    },
    Exchange: { 
      screen: ExchangeScreen,
      navigationOptions: {
        tabBarIcon: <Image source={require('../assets/request-book.png')} style={{width: 33, height: 33, marginBottom: -5}}/>,
        tabBarLabel: 'Exchange Items'
      }
    },
  },
);