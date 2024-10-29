import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import logo from '../assests/images/logo-removebg-preview.png';
import {colors} from '../constants/colors';
import {fontFamily} from '../constants/fonts';
import Button from '../components/Button';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.smallTag}>For loaders users</Text>
        <Text style={styles.subText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          officia dolorum unde, excepturi saepe ipsum
        </Text>
        <Button
          text={'Get Started'}
          buttonStyle={{
            backgroundColor: colors.primary,
            color: colors.white,
            borderRadius: 10,
            borderWidth: 1,
            width: '70%',
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
          onPress={() => {
            navigation.navigate('MainTabs', {
              screen: 'MAINSTACK',
              params: {
                screen: 'ASSIGNLOADPLAN',
              },
            });
            // navigation.navigate('REGISTER');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    // width:"90%",
    // marginHorizontal:"auto",
    backgroundColor: colors.white,
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  heading: {
    fontFamily: fontFamily.ExtraBold,
    color: colors.primary,
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 20,
  },
  logo: {
    alignSelf: 'center',
    marginTop: 150,
  },
  smallTag: {
    fontSize: 14,
    fontFamily: fontFamily.Bold,
    alignSelf: 'center',
    marginTop: -2,
  },
  subText: {
    fontSize: 16,
    fontFamily: fontFamily.Regular,
    fontWeight: '500',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 30,
    color: colors.lightBlack,
    lineHeight: 30,
  },
});
