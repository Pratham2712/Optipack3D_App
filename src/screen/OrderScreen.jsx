import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Button from '../components/Button';
import {colors} from '../constants/colors';

const OrderScreen = () => {
  const orderData = useSelector(
    state => state.rootReducer.mainSlice.data.orderData,
  );

  const renderSkuItem = ({item}) => (
    <View style={styles.tableRow}>
      {/* <Text style={styles.cell}>{item.sku_code}</Text> */}
      <Text style={styles.cell}>{item.sku_name}</Text>
      <Text style={styles.cell}>{item.quantity}</Text>
      {/* <Text style={styles.cell}>{item.gross_weight}</Text> */}
      <Text style={styles.cell}>{item.length}</Text>
      <Text style={styles.cell}>{item.width}</Text>
      <Text style={styles.cell}>{item.height}</Text>
      <Text style={styles.cell}>{item.tilt_allowed ? 'Yes' : 'No'}</Text>
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
        text={'Visulize'}
        buttonStyle={{width: '40%', alignSelf: 'center'}}
        textStyle={{color: colors.white}}
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
