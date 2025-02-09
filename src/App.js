import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  SignupScreen,
  SplashScreen,
  LoginScreen,
  AddStyleScreen,
  AddFavFoodScreen,
  AddFriendsScreen,
  SignupCompleteScreen,
} from '@/onBoarding';
import { FeedScreen } from '@/feed';

// import test from './shared/hooks/test';

// 아이콘 사용 시
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabBarIcon = (focused, name) => {
  let iconImagePath;
  if (name === 'Feed') {
    iconImagePath = focused
      ? require('./assets/icons/home_black.png')
      : require('./assets/icons/home_white.png');
  } else if (name === 'Search') {
    iconImagePath = require('./assets/icons/search.png');
  } else if (name === 'MyPage') {
    iconImagePath = focused
      ? require('./assets/icons/profile_black.png')
      : require('./assets/icons/profile_whtie.png');
  }
  return <Image source={iconImagePath} style={{ width: 22, height: 22 }} />;
};

const SignupContainer = () => {
  return (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="AddStyle" component={AddStyleScreen} />
      <Stack.Screen name="AddFavFood" component={AddFavFoodScreen} />
      <Stack.Screen name="AddFriends" component={AddFriendsScreen} />
      <Stack.Screen name="SignupComplete" component={SignupCompleteScreen} />
    </Stack.Navigator>
  );
};

const BottomTap = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        style: { height: 85, paddingTop: 25 },
      }}
      screenOptions={({ route }) => ({
        tabBarLabel: '',
        tabBarIcon: ({ focused }) => TabBarIcon(focused, route.name),
      })}>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Search" component={FeedScreen} />
      <Tab.Screen name="MyPage" component={FeedScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  // const [loding, setLoding] = useState(false);
  // const isTrue = () => {
  //   setLoding(true);
  // };
  // const loding = test();
  // setTimeout(isTrue, 3000);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        headerMode="screen"
        // initialRouteName={loding ? 'Login' : 'Splash'}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Signup" component={SignupContainer} />

        <Stack.Screen name="Feed" component={BottomTap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
