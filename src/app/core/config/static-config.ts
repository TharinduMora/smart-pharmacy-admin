export class StaticConfig {

  public static APP_NAME = 'Admin';

  public static SHOP_TYPES = [
    {
      'id': 1,
      'key': 'product',
      'value': 'PRODUCT'
    },
    {
      'id': 2,
      'key': 'service',
      'value': 'SERVICE'
    }
  ];

  public static SHOP_DATA_TYPES = [
    {
      'id': 1,
      'key': 'list',
      'value': 'List'
    },
    {
      'id': 2,
      'key': 'free_text',
      'value': 'Free Text'
    }
  ];

  public static CATEGORY_LEVEL = [
    {
      'id': 1,
      'key': 'parent_category',
      'value': 'Parent Category'
    },
    {
      'id': 2,
      'key': 'child_category',
      'value': 'Child Category'
    }
  ];

  public static STATUS_LIST = {
    'CREATED': {
      ID: 0,
      NAME: 'Create',
      COLOR: '#000000'
    },
    'PENDING': {
      ID: 1,
      NAME: 'Pending',
      COLOR: '#0095ff'
    },
    'APPROVED': {
      ID: 2,
      NAME: 'Approved',
      COLOR: '#0bd54e'
    },
    'HOLD': {
      ID: 3,
      NAME: 'Hold',
      COLOR: '#db9110'
    },
    'DELETED': {
      ID: 4,
      NAME: 'Deleted',
      COLOR: '#db0909'
    }
  };

  public static daysOfWeek = [
    {name: 'Sunday', shortName: 'SU', nameChar: 'S', javaDayValue: 1, jsDayValue: 0},
    {name: 'Monday', shortName: 'MO', nameChar: 'M', javaDayValue: 2, jsDayValue: 1},
    {name: 'Tuesday', shortName: 'TU', nameChar: 'T', javaDayValue: 3, jsDayValue: 2},
    {name: 'Wednesday', shortName: 'WE', nameChar: 'W', javaDayValue: 4, jsDayValue: 3},
    {name: 'Thursday', shortName: 'TH', nameChar: 'T', javaDayValue: 5, jsDayValue: 4},
    {name: 'Friday', shortName: 'FR', nameChar: 'F', javaDayValue: 6, jsDayValue: 5},
    {name: 'Saturday', shortName: 'SA', nameChar: 'S', javaDayValue: 7, jsDayValue: 6}
  ];

}
