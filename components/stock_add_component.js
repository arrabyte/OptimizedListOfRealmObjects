/**
 * A project by Alessandro Arrabito - May 2020
 * https://github.com/arrabyte
 * https://www.blogpressure.tech
 */

import React, {useState} from 'react';
import {Picker} from '@react-native-community/picker';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import {DbApi} from '../database/db_api';

const StockAddComponent = props => {
  const [marketIndex, setMarketIndex] = useState('NASDAQ');
  const [stock, setStock] = useState('');

  const addNewStock = () => {
    if (stock === '') {
      Alert.alert('Warning', 'Stock field is empty');
    } else {
      DbApi.addObject(props.realm, {marketIndex: marketIndex, stock: stock});
      setStock('');
    }
  };

  return (
    <View style={styles.header}>
      <Picker
        selectedValue={marketIndex}
        style={{width: '40%'}}
        onValueChange={(itemValue, itemIndex) => setMarketIndex(itemValue)}>
        <Picker.Item label="FTSE 100" value="FTSE 100" />
        <Picker.Item label="NASDAQ" value="NASDAQ" />
        <Picker.Item label="NYSE" value="NYSE" />
      </Picker>
      <TextInput
        value={stock}
        placeholder="stock name"
        style={styles.input}
        onChangeText={txt => setStock(txt)}
      />
      <TouchableOpacity style={styles.button} onPress={() => addNewStock()}>
        <Text style={{fontSize: 10}}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 2,
  },
  button: {
    borderWidth: 0,
    borderRadius: 4,
    padding: 2,
    margin: 1,
    backgroundColor: 'pink',
  },
});

export default StockAddComponent;
