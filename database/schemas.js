/**
 * A project by Alessandro Arrabito - May 2020
 * https://github.com/arrabyte
 * https://www.blogpressure.tech
 */

export const ItemSchema = {
  name: 'Item',
  primaryKey: 'id',
  properties: {
    id: {type: 'string'},
    marketIndex: {type: 'string'},
    stock: {type: 'string'},
  },
};

export const RealmConfig = {
  schema: [ItemSchema],
  schemaVersion: 1,
};
