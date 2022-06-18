import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage,

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

export const getData = (fn) => {
  storage
    .load({
      key: "loginState",
      // autoSync (default: true) means if data is not found or has expired,
      // then invoke the corresponding sync method
      autoSync: true,

      // syncInBackground (default: true) means if data expired,
      // return the outdated data first while invoking the sync method.
      // If syncInBackground is set to false, and there is expired data,
      // it will wait for the new data and return only after the sync completed.
      // (This, of course, is slower)
      syncInBackground: true,

      // you can pass extra params to the sync method
      // see sync example below
      syncParams: {
        extraFetchOptions: {},
        someFlag: true,
      },
    })
    .then((ret) => {
      // found data go to then()
      console.log("storage check", ret);
      fn(ret);
    })
    .catch((err) => {
      // any exception including data not found
      // goes to catch()
      console.warn(err.message);
    });
};

export const saveData = (response) => {
  storage.save({
    key: "loginState", // Note: Do not use underscore("_") in key!
    data: response,
    expires: 1000 * 3600,
  });
};

export const removeData = () => {
  storage.remove({ key: "loginState" });
};
