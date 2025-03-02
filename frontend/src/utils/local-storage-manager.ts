export interface LocalStorageSchema {
  token: string;
}

export const LocalStorageManager = {
  set(key: keyof LocalStorageSchema, value: string) {
    localStorage.setItem(key, value);
  },
  get(key: keyof LocalStorageSchema) {
    return localStorage.getItem(key);
  },
  remove(key: keyof LocalStorageSchema) {
    localStorage.removeItem(key);
  },
};
