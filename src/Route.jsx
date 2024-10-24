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

const Route = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(checkLoginThunk());
  }, []);

  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HOME" component={HomeScreen} />
          <Stack.Screen name="REGISTER" component={LoginScreen} />
          <Stack.Screen name="OTP" component={OtpScreen} />
          <Stack.Screen
            name="ASSIGNLOADPLAN"
            component={AssignLoadplanScreen}
          />
          <Stack.Screen name="ORDERDETAILS" component={OrderScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default Route;
