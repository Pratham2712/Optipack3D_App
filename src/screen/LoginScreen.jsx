import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback} from 'react';
import {colors} from '../constants/colors';
import {fontFamily} from '../constants/fonts';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {checkEmailThunk, sendOtpThunk} from '../redux/Slices/authSlice';
import Toast from 'react-native-toast-message';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  //useSelector ==================================================================================
  const loading = useSelector(state => state.rootReducer.authSlice.loading);
  const schema = yup.object({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
  });

  // react-hook-form setup
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  //function==================================================================================

  const onSubmit = async data => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    dispatch(checkEmailThunk(formData)).then(data => {
      if (data.payload['SUCCESS']) {
        dispatch(sendOtpThunk(formData)).then(data => {
          if (data.payload['ERROR']) {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: data.payload['ERROR'],
              visibilityTime: 2000,
            });
          }
          if (data.payload['SUCCESS']) {
            Toast.show({
              type: 'success',
              position: 'top',
              text1: `${data.payload['SUCCESS']}`,
              visibilityTime: 2000,
            });
            navigation.navigate('OTP');
          }
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: data.payload['ERROR'],
          visibilityTime: 2000,
        });
      }
    });
    // navigation.navigate('OTP');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <Text style={styles.subText}>Join our company</Text>
      <View style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[
                  styles.input,
                  errors.email && {borderColor: colors.error},
                ]}
                placeholder="Enter your email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
          <Button
            text={'Send OTP'}
            buttonStyle={{
              backgroundColor: colors.primary,
              color: colors.white,
              borderRadius: 10,
              borderWidth: 1,
              width: '50%',
              borderColor: colors.primary,
              marginTop: 70,
              alignSelf: 'center',
            }}
            textStyle={{
              fontWeight: '600',
              fontSize: 20,
              fontFamily: fontFamily.Bold,
              color: colors.white,
            }}
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    height: '100%',
    // padding: 20,
  },
  heading: {
    fontFamily: fontFamily.ExtraBold,
    color: colors.primary,
    fontSize: 30,
    marginTop: 20,
    paddingLeft: 20,
  },
  subText: {
    fontSize: 16,
    fontFamily: fontFamily.Bold,
    fontWeight: '600',
    color: colors.lightBlack,
    lineHeight: 30,
    paddingLeft: 20,
  },
  content: {
    height: '80%',
    backgroundColor: colors.white,
    marginTop: 100,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    padding: 20,
  },
  form: {
    marginTop: 50,
  },
  label: {
    fontSize: 16,
    fontFamily: fontFamily.Bold,
    color: colors.lightBlack,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    fontFamily: fontFamily.Regular,
    color: colors.darkGray,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fontFamily.Bold,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    fontFamily: fontFamily.Regular,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
