import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import {colors} from '../constants/colors';
import {get3dDataThunk, getContainerThunk} from '../redux/Slices/mainSlice';
import Toast from 'react-native-toast-message';

const OrderScreen = ({route, navigation}) => {
  const {plan_id} = route.params;
  const [final, setFinal] = useState();
  const dispatch = useDispatch();

  const [col, setCol] = useState([
    'rgba(244, 67, 54, 1)', // Color 1
    'rgba(76, 175, 80, 1)', // Color 2
    'rgba(33, 150, 243, 1)', // Color 3
    'rgba(255, 181, 181,1)',
    'rgba(255, 111, 60,1)',
    'rgba(247, 7, 118,1)',
    'rgba(239, 213, 16,1)',
  ]);

  //useSeclector==========================================================================
  const orderData = useSelector(
    state => state.rootReducer.mainSlice.data.orderData,
  );

  //function ================================================================================
  const get3dData = () => {
    // const formData = new FormData();
    // Object.keys(final)?.forEach(key => {
    //   formData.append(key, final[key]);
    // });
    navigation.navigate('VISUALIZE', {params: final});
    // dispatch(get3dDataThunk(formData)).then(data => {
    //   if (data) {
    //     Toast.show({
    //       type: 'success',
    //       position: 'top',
    //       text1: `Data fetched`,
    //       visibilityTime: 2000,
    //     });
    //   }
    // });
  };
  const finalObject = (input, containerData) => {
    // Initialize the output objectr
    const output = {
      numTypes: input.length,
      totalContainers: 0,
      sumContainers: 0,
    };

    // Loop through each SKU and populate the output object
    input.forEach((sku, index) => {
      // Add SKU name and related properties to the output
      output[`sku${index}`] = sku.sku_name; // SKU name
      output[`grossWeight${index}`] = sku.gross_weight; // Gross weight
      output[`length${index}`] = sku.length; // Length
      output[`width${index}`] = sku.width; // Width
      output[`height${index}`] = sku.height; // Height
      output[`numberOfCases${index}`] = sku.quantity; // Quantity
      output[`volume${index}`] = sku.volume; // Volume
      output[`netWeight${index}`] = sku.netWeight; // Net weight
      output[`rotationAllowed${index}`] = sku.rotationAllowed ? 'on' : 'off'; // Rotation allowed

      // Add color if available
      if (col[index]) {
        output[`color${index}`] = col[index]; // Color
      }
    });

    Object.keys(containerData).forEach((ele, ind) => {
      output['totalContainers']++;
      output[`containerType${ind}`] = ele;
      output[`numContainers${ind}`] = containerData[ele];
      output['sumContainers'] += parseInt(containerData[ele]);
    });

    return output;
  };

  //useEffect=================================================================================
  useEffect(() => {
    const data = {
      plan_id: plan_id,
    };
    dispatch(getContainerThunk(data)).then(data => {
      if (data.payload['SUCCESS']) {
        const result = data.payload['SUCCESS']?.result;
        let skuArray = [];
        skuArray = Object.values(orderData).flat();
        const final = finalObject(skuArray, result);
        setFinal(final);
      }
    });
  }, []);

  const renderSkuItem = ({item}) => (
    <View style={styles.tableRow}>
      {/* <Text style={styles.cell}>{item.sku_code}</Text> */}
      <Text style={styles.cell}>{item.sku_name}</Text>
      <Text style={styles.cell}>{item.quantity}</Text>
      {/* <Text style={styles.cell}>{item.gross_weight}</Text> */}
      <Text style={styles.cell}>{item.length}</Text>
      <Text style={styles.cell}>{item.width}</Text>
      <Text style={styles.cell}>{item.height}</Text>
      <Text style={styles.cell}>{item.rotationAllowed ? 'Yes' : 'No'}</Text>
    </View>
  );

  const renderOrder = (orderNumber, skuList) => (
    <View key={orderNumber} style={styles.orderBlock}>
      <Text style={styles.orderHeading}>Order Number: #{orderNumber}</Text>
      <View style={styles.tableHeader}>
        {/* <Text style={styles.headerCell}>SKU Code</Text> */}
        <Text style={styles.headerCell}>SKU Name</Text>
        <Text style={styles.headerCell}>Quantity</Text>
        {/* <Text style={styles.headerCell}>Gross Weight</Text> */}
        <Text style={styles.headerCell}>Length</Text>
        <Text style={styles.headerCell}>Width</Text>
        <Text style={styles.headerCell}>Height</Text>
        <Text style={styles.headerCell}>Tilt Allowed</Text>
      </View>
      <FlatList
        data={skuList}
        renderItem={renderSkuItem}
        keyExtractor={item => item.sku_code.toString()}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Order List</Text>
      {Object.keys(orderData).map(orderNumber =>
        renderOrder(orderNumber, orderData[orderNumber]),
      )}
      <Button
        text={'visualize'}
        buttonStyle={{width: '40%', alignSelf: 'center'}}
        textStyle={{color: colors.white}}
        onPress={get3dData}
      />
    </View>
  );
};

export default OrderScreen;
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    paddingTop: 30,
    height: '100%',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderBlock: {
    marginBottom: 30,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  orderHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  headerCell: {
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
  },
  cell: {
    fontSize: 12,
    flex: 1,
  },
});
