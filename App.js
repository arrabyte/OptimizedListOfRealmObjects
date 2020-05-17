/**
 * A project by Alessandro Arrabito - May 2020
 * https://github.com/arrabyte
 * https://www.blogpressure.tech
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, VirtualizedList} from 'react-native';
import {DbApi} from './database/db_api';
import StockAddComponent from './components/stock_add_component';
import ListMarketItem from './components/list_market_item';

const App: () => React$Node = () => {
  const [realmInstance, setRealmInstance] = useState(null);
  // data source for the list view
  const [resultSet, setResultSet] = useState([]);

  // trigger to update rendering of list view as FlatList and VirtualizedList
  // implements PureComponent https://reactnative.dev/docs/flatlist#extradata
  const [updateTimestamp, setUpdateTimestamp] = useState([]);

  // initialize db instance
  useEffect(() => {
    DbApi.initInstance().then(realm => {
      setRealmInstance(realm);
      DbApi.addListener(realm, onRealmUpdate);
      setResultSet(DbApi.getObjects(realm));
    });

    return () => {
      if (realmInstance) {
        DbApi.removeListener(realmInstance, onRealmUpdate);
      }
    };
  }, []);

  // callback to handle update of realm db Items
  const onRealmUpdate = () => {
    setUpdateTimestamp(Date.now());
  };

  const getItem = (data, index) => {
    const current_marketIndex = data[index].marketIndex;
    const previous_marketIndex =
      index > 0 ? data[index - 1].marketIndex : undefined;

    if (current_marketIndex && current_marketIndex !== previous_marketIndex) {
      return {
        data: data[index],
        section: current_marketIndex,
      };
    } else {
      return {
        data: data[index],
        section: '',
      };
    }
  };

  return (
    <View style={styles.container}>
      <StockAddComponent realm={realmInstance} />
      <VirtualizedList
        data={resultSet}
        renderItem={({item}) => <ListMarketItem item={item} realm={realmInstance} />}
        getItemCount={data => data.length}
        keyExtractor={item => item.data.id}
        getItem={getItem}
        extraData={updateTimestamp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  input: {
    padding: 0,
    width: '40%',
    borderWidth: 1,
    borderColor: 'grey',
    textAlign: 'center',
  },
});

export default App;
