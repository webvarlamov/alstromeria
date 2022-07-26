
export enum RequestType {
  DEFINE_OBJECT_PROPERTY_VALUE = 'DEFINE_OBJECT_PROPERTY_VALUE',
  DEFINE_ARRAY_ITEM_VALUE = 'DEFINE_ARRAY_ITEM_VALUE',

  DELETE_OBJECT_PROPERTY_VALUE = 'DELETE_OBJECT_PROPERTY_VALUE',
  DELETE_ARRAY_ITEM_VALUE = 'DELETE_ARRAY_ITEM_VALUE',

  CHANGE_OBJECT_PROPERTY_VALUE = 'CHANGE_OBJECT_PROPERTY_VALUE',
  CHANGE_ARRAY_ITEM_VALUE = 'CHANGE_ARRAY_ITEM_VALUE',

  ADD_ARRAY_ITEM = 'ADD_ARRAY_ITEM',
  MOVE_UP_ARRAY_ITEM = 'MOVE_UP_ARRAY_ITEM',
  MOVE_DOWN_ARRAY_ITEM = 'MOVE_DOWN_ARRAY_ITEM',
  DELETE_ALL_ARRAY_ITEMS = 'DELETE_ALL_ARRAY_ITEMS'
}
