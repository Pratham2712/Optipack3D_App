import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/screen/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screen/LoginScreen';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import OtpScreen from './src/screen/OtpScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HOME" component={HomeScreen} />
            <Stack.Screen name="REGISTER" component={LoginScreen} />
            <Stack.Screen name="OTP" component={OtpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
