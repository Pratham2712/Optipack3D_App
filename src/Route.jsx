import React, {useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {checkLoginThunk} from './redux/Slices/authSlice';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import OtpScreen from './screen/OtpScreen';
import AssignLoadplanScreen from './screen/AssignLoadplanScreen';
import OrderScreen from './screen/OrderScreen';
import VisualizeScreen from './screen/VisualizeScreen';
import ProfileScreen from './screen/ProfileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from './constants/colors';

const Route = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(checkLoginThunk());
  }, []);

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const MainStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ASSIGNLOADPLAN" component={AssignLoadplanScreen} />
      <Stack.Screen name="ORDERDETAILS" component={OrderScreen} />
      <Stack.Screen name="VISUALIZE" component={VisualizeScreen} />
    </Stack.Navigator>
  );
  const MainTabNavigator = () => (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HOME') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="HOME" component={MainStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );

  const RootStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HOME" component={HomeScreen} />
      <Stack.Screen name="REGISTER" component={LoginScreen} />
      <Stack.Screen name="OTP" component={OtpScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
    </Stack.Navigator>
  );
  return (
    <>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default Route;
// <Stack.Navigator screenOptions={{headerShown: false}}>
//   <Stack.Screen name="HOME" component={HomeScreen} />
//   <Stack.Screen name="REGISTER" component={LoginScreen} />
//   <Stack.Screen name="OTP" component={OtpScreen} />
//   {/* <Stack.Screen
//     name="ASSIGNLOADPLAN"
//     component={AssignLoadplanScreen}
//   />
//   <Stack.Screen name="ORDERDETAILS" component={OrderScreen} />
//   <Stack.Screen name="VISUALIZE" component={VisualizeScreen} /> */}
//   {/* <Stack.Screen name="PROFILE" component={ProfileScreen} /> */}
//   <Stack.Screen name="MainTabs" component={MainTabNavigator} />
// </Stack.Navigator>

// <NavigationContainer>
//   <Tab.Navigator
//     screenOptions={({route}) => ({
//       tabBarIcon: ({focused, color, size}) => {
//         // let iconName;
//         // if (route.name === 'Home') {
//         //   iconName = focused ? 'home' : 'home-outline';
//         // } else if (route.name === 'Profile') {
//         //   iconName = focused ? 'person' : 'person-outline';
//         // }
//         // return <Ionicons name={iconName} size={size} color={color} />;
//       },
//       tabBarActiveTintColor: 'tomato',
//       tabBarInactiveTintColor: 'gray',
//     })}>
//     {/* <Tab.Screen name="HOE" component={HomeScreen} /> */}
//     {/* <Tab.Screen name="Prof" component={ProfileScreen} /> */}
//   </Tab.Navigator>
// </NavigationContainer>
