/**
 * A project by Alessandro Arrabito - May 2020
 * https://github.com/arrabyte
 * https://www.blogpressure.tech
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const renderSectionHeader = ({section: info}) => (
  <View style={styles.section}>
    <Text>{info}</Text>
  </View>
);

const ListMarketItem = props => {
  let item = props.item;
  return (
    <View>
      {item.section !== '' && renderSectionHeader(item)}
      <View style={styles.item_container}>
        <View style={{width:'80%'}}>
          <Text>{item.data.stock}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => DbApi.delete(props.realm, item.data)}>
          <Text style={{fontSize: 10}}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 0,
    borderRadius: 4,
    padding: 2,
    margin: 1,
    backgroundColor: 'pink',
  },
  section: {backgroundColor: 'lavender', marginVertical: 2},
  item_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'whitesmoke',
  },
});

export default ListMarketItem;
