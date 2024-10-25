import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllLoadplan, getOrderThunk} from '../redux/Slices/mainSlice';
import {checkLoginThunk} from '../redux/Slices/authSlice';
import {colors} from '../constants/colors';
import Material from 'react-native-vector-icons/MaterialIcons';
import {fontFamily} from '../constants/fonts';
import Toast from 'react-native-toast-message';

const AssignLoadplanScreen = ({navigation}) => {
  const [currentPlanid, setCurrentPlanid] = useState(null);
  const dispatch = useDispatch();
  //useSelector ===========================================================================
  const email = useSelector(
    state => state.rootReducer.authSlice.data.user.email,
  );
  const loadplanIds = useSelector(
    state => state.rootReducer.mainSlice.data.loadplans,
  );
  const loading = useSelector(state => state.rootReducer.mainSlice.loading);

  //function============================================================================
  function extractNameFromEmail(email) {
    if (typeof email === 'string' && email.includes('@')) {
      return email.split('@')[0]; // Split the email at "@" and return the first part
    }
    return null; // Return null if it's not a valid email
  }
  const formatDate = date => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      // second: "2-digit",
      hour12: true, // for 12-hour format, set to false for 24-hour format
    });
    return formattedDate;
  };
  const getOrder = id => {
    const data = {
      plan_id: id,
    };
    setCurrentPlanid(id);
    dispatch(getOrderThunk(data)).then(data => {
      setCurrentPlanid(null);
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
          text1: `${data.payload['SUCCESS']?.message}`,
          visibilityTime: 2000,
        });
        navigation.navigate('ORDERDETAILS', {plan_id: id});
      }
    });
  };
  const renderLoadplanItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.listItem}
      onPress={() => getOrder(item?.plan_id)}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Loadplan{' '}
          <Text style={{fontSize: 12}}>#{item?.plan_id?.substring(0, 8)}</Text>{' '}
        </Text>
        <Text style={styles.membersText}>
          {' '}
          Assigned at: {formatDate(item?.assigned_at)}
        </Text>
      </View>
      <View style={styles.arrow_bg}>
        {loading && currentPlanid == item?.plan_id ? (
          <ActivityIndicator
            size="small"
            color={colors.lightBlack}
            fontSize={26}
          />
        ) : (
          <Material name="keyboard-arrow-right" size={26} />
        )}
      </View>
    </TouchableOpacity>
  );
  //useEffect=====================================================================
  useEffect(() => {
    dispatch(getAllLoadplan());
    dispatch(checkLoginThunk());
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome{' '}
        <Text style={{color: colors.primary}}>
          {extractNameFromEmail(email)}
        </Text>
      </Text>
      {/* <Text style={styles.welcomeText}>Assigned load plan to you</Text> */}
      <FlatList
        data={loadplanIds}
        keyExtractor={item => item.plan_id.toString()}
        renderItem={renderLoadplanItem}
        ListEmptyComponent={<Text>No loadplans assign to you</Text>}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default AssignLoadplanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.lightBlack,
    fontFamily: fontFamily.Bold,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.lightBlack,
  },
  membersText: {
    fontSize: 14,
    color: '#666',
  },
  arrow: {
    fontSize: 18,
    color: '#999',
    fontWeight: '600',
  },
  separator: {
    height: 10,
  },
  arrow_bg: {
    backgroundColor: colors.secondary,
    padding: 7,
    borderRadius: 50,
  },
});
