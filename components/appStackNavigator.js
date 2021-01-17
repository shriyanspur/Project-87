import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/homeScreen';
import ReceiverDetailsScreen from '../screens/receiverDetailsScreen';
import NotificationScreen from '../screens/notificationScreen'


export const AppStackNavigator = createStackNavigator({
  donateList: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  receiverDetails: {
    screen: ReceiverDetailsScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  notification : {
    screen : NotificationScreen,
    navigationOptions: {
      headerShown: false
    }
  }
},
  {initialRouteName: 'donateList'}
)