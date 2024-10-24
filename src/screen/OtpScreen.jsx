import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useRef, useState} from 'react';
import {colors} from '../constants/colors';
import {fontFamily} from '../constants/fonts';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {verifyLoginThunk} from '../redux/Slices/authSlice';

const otpSchema = yup.object().shape({
  otp: yup
    .array()
    .of(
      yup
        .string()
        .required('OTP is required')
        .length(1, 'Only 1 digit allowed'),
    )
    .min(6)
    .max(6),
});

const OtpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  //useSelector=======================================================================================
  const email = useSelector(
    state => state.rootReducer.authSlice.data.user.email,
  );
  const company = useSelector(
    state => state.rootReducer.authSlice.data.user.company,
  );
  const loading = useSelector(state => state.rootReducer.authSlice.loading);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: {otp: ['', '', '', '', '', '']},
  });
  //function=================================================================================
  const onSubmit = data => {
    const otpCode = data.otp.join('');
    const info = {
      otp: otpCode,
      email: email,
      company: company,
    };
    const formData = new FormData();
    Object.keys(info).forEach(key => {
      formData.append(key, info[key]);
    });

    dispatch(verifyLoginThunk(formData)).then(data => {
      console.log(data);

      if (data.payload['SUCCESS']) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: data.payload['SUCCESS']?.message,
          visibilityTime: 2000,
        });
        navigation.navigate('ASSIGNLOADPLAN');
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: data.payload['ERROR'],
          visibilityTime: 2000,
        });
      }
    });
  };
  const handleChange = (value, index) => {
    const numericValue = value.replace(/\D/g, '').slice(-1);
    if (numericValue) {
      const currentValues = getValues('otp');
      const newValues = [...currentValues];
      newValues[index] = numericValue;
      setValue('otp', newValues);
      setOtp(newValues);

      if (numericValue && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0) {
      const currentValues = getValues('otp');
      const newValues = [...currentValues];

      if (currentValues[index] === '') {
        newValues[index - 1] = ''; // Clear previous input if current is already empty
        setValue('otp', newValues);
        inputsRef.current[index - 1].focus(); // Move focus to the previous input
      } else {
        newValues[index] = ''; // Clear current input
        setValue('otp', newValues);
      }
      setOtp(newValues);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <Text style={styles.subText}>Join our company</Text>
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.otpContainer}>
            {otp.map((ele, index) => (
              <Controller
                key={index}
                control={control}
                name={`otp[${index}]`}
                render={({field: {onChangeText, value}}) => (
                  <TextInput
                    ref={el => (inputsRef.current[index] = el)} // Save input refs
                    style={[styles.otpInput]}
                    value={ele}
                    onChangeText={val => handleChange(val, index)} // Handle forward movement
                    onKeyPress={e => handleBackspace(e, index)} // Handle backspace
                    keyboardType="number-pad"
                    maxLength={1}
                    autoFocus={index === 0} // Auto-focus on the first input
                  />
                )}
              />
            ))}
          </View>
          {errors.otp && <Text style={styles.errorText}>Enter valid OTP</Text>}
          <Button
            text={'Verify'}
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
          <TouchableOpacity onPress={() => navigation.navigate('REGISTER')}>
            <Text style={styles.editEmailText}>Edit Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OtpScreen;

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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    borderWidth: 1,
    borderColor: colors.lightBlack,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fontFamily.Bold,
    width: 45,
    height: 55,
    backgroundColor: colors.lightGray,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    marginTop: 10,
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: colors.primary,
    color: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    width: '50%',
    borderColor: colors.primary,
    marginTop: 30,
    alignSelf: 'center',
  },
  verifyButtonText: {
    fontWeight: '600',
    fontSize: 20,
    fontFamily: fontFamily.Bold,
    color: colors.white,
  },
  editEmailText: {
    marginTop: 20,
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
  },
});
