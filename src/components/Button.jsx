import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../constants/colors';
import {fontFamily} from '../constants/fonts';

const Button = ({text, buttonStyle, textStyle, onPress, isLoading}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.white} fontSize={20} /> // Show loader when isLoading is true
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    width: '70%',
    borderColor: colors.primary,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    fontFamily: fontFamily.Bold,
  },
});
