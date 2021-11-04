import { DefaultStorageVaues } from './contants';

export default {
  get(key) {
    const item = localStorage.getItem(key);

    if (item == null || item === 'undefined') {
      const defaultValue = JSON.stringify(DefaultStorageVaues[key]);
      localStorage.setItem(key, defaultValue);
      return defaultValue;
    }

    return JSON.parse(item);
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));

    return value;
  },

  delete(key) {
    localStorage.removeItem(key);
  },
};
