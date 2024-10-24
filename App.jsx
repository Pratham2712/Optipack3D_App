import {StyleSheet} from 'react-native';
import React from 'react';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import Route from './src/Route';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Route />
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
