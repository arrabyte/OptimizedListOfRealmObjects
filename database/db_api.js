/**
 * A project by Alessandro Arrabito - May 2020
 * https://github.com/arrabyte
 * https://www.blogpressure.tech
 */

import Realm from 'realm';
import {RealmConfig} from './schemas';
const {uuid} = require('uuidv4');

const test_pattern = [
  {
    marketIndex: "NYSE",
    stock: "Coca Cola",
  },
  {
    marketIndex: "NYSE",
    stock: "J. C. Penney Company, Inc",
  },
  {
    marketIndex: "NASDAQ",
    stock: "Tesla, Inc.",
  },
  {
    marketIndex: "NASDAQ",
    stock: "Neovasc Inc.",
  },
  {
    marketIndex: "NASDAQ",
    stock: "comScore, Inc.",
  },
  {
    marketIndex: "FTSE 100",
    stock: "BAE Systems plc",
  },
];

export const DbApi = {
  initInstance: async (resetUser: Boolean = false) => {
    // populate the db the first time the app will be started
    let realm = new Realm(RealmConfig);
    let objs = realm.objects('Item');

/*    if (objs.length  > 0) {
      realm.write(() => {
        realm.delete(objs);
      });
    }
*/
    if (objs.length === 0) {
      realm.write(() =>
        test_pattern.map(el => {
          el.id = uuid();
          realm.create('Item', el);
        }),
      );
    }
    return realm;
  },
  getObjects: (realm) => {
    return realm.objects('Item').sorted('marketIndex');
  },
  addObject: (realm, obj) => {
    realm.write(() => {
      obj.id = uuid();
      console.log("ADD:" + JSON.stringify(obj));

      realm.create('Item', obj);
    });
  },
  delete: (realm, obj) => {
    realm.write(() => {
      realm.delete(obj);
    });
  },
  addListener: (realm, listenerCallback) => {
    realm.addListener('change', listenerCallback);
  },
  removeListener: (realm, listenerCallback) => {
    realm.removeListener('change', listenerCallback);
  },
};
