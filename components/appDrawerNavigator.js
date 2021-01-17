import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './appTabNavigator';
import CustomSideBarMenu from './customSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyBartersScreen from '../screens/myBartersScreen';
import NotificationScreen from '../screens/notificationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Home: { screen: AppTabNavigator },
  MyBarters: { screen: MyBartersScreen },
  Notifications: { screen: NotificationScreen },
  Settings : { screen : SettingScreen },
},
  {contentComponent: CustomSideBarMenu},
  {initialRouteName: 'Home'}
)