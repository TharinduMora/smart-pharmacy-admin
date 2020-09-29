export class StaticConfig {

  public static APP_NAME = "Admin";

  public static  SHOP_TYPES = [
    {
      "id":1,
      "key":"product",
      "value":"PRODUCT"
    },
    {
      "id":2,
      "key":"service",
      "value":"SERVICE"
    }
  ];

  public static SHOP_DATA_TYPES = [
    {
      "id":1,
      "key":"list",
      "value":"List"
    },
    {
      "id":2,
      "key":"free_text",
      "value":"Free Text"
    }
  ];

  public static CATEGORY_LEVEL = [
    {
      "id": 1,
      "key": "parent_category",
      "value": "Parent Category"
    },
    {
      "id": 2,
      "key": "child_category",
      "value": "Child Category"
    }
  ];

  public static STATUS_LIST = {
    "CREATED": {
      ID: 0,
      NAME: "Create",
      COLOR: "#000000"
    },
    "PENDING": {
      ID: 1,
      NAME: "Pending",
      COLOR: "#0095ff"
    },
    "APPROVED": {
      ID: 2,
      NAME: "Approved",
      COLOR: "#11c14b"
    },
    "CANCELED": {
      ID: 3,
      NAME: "Cancel",
      COLOR: "#8B4513"
    },
    "REVERTED": {
      ID: 4,
      NAME: "Reverted",
      COLOR: "#000000"
    },
    "REJECTED": {
      ID: 5,
      NAME: "Rejected",
      COLOR: "#dc3545"
    },
    "SUSPENDED": {
      ID: 6,
      NAME: "Hold",
      COLOR: "#f5a718"
    },
    "BLACKLISTED": {
      ID: 7,
      NAME: "Blacklisted",
      COLOR: "#000000"
    },
    "DELETED": {
      ID: 8,
      NAME: "Deleted",
      COLOR: "#ea1212"
    },
    "AMENDED": {
      ID: 9,
      NAME: "Amended",
      COLOR: "#000000"
    },
    "ACCEPTED": {
      ID: 10,
      NAME: "Accepted",
      COLOR: "#11c110"
    },
    "RELEASED": {
      ID: 11,
      NAME: "Prepared",
      COLOR: "#000000"
    },
    "DISPATCHED": {
      ID: 12,
      NAME: "Dispatched",
      COLOR: "#000000"
    },
    "DELIVERED": {
      ID: 13,
      NAME: "Delivered",
      COLOR: "#000000"
    },
    "DELIVERY_ACCEPTED": {
      ID: 14,
      NAME: "Delivery Accepted",
      COLOR: "#000000"
    },
    "DELIVERY_REJECTED": {
      ID: 15,
      NAME: "Delivery Rejected",
      COLOR: "#000000"
    }
  };

  public static daysOfWeek = [
    {name: "Sunday" , shortName : "SU", nameChar : "S", javaDayValue: 1, jsDayValue: 0},
    {name: "Monday", shortName : "MO", nameChar: "M", javaDayValue: 2, jsDayValue: 1},
    {name: "Tuesday", shortName : "TU", nameChar: "T", javaDayValue: 3, jsDayValue: 2},
    {name: "Wednesday", shortName : "WE", nameChar: "W", javaDayValue: 4, jsDayValue: 3},
    {name: "Thursday", shortName : "TH", nameChar: "T",  javaDayValue: 5, jsDayValue: 4},
    {name: "Friday", shortName : "FR", nameChar: "F", javaDayValue: 6, jsDayValue: 5},
    {name: "Saturday", shortName : "SA", nameChar: "S", javaDayValue: 7, jsDayValue: 6}
  ];

}
