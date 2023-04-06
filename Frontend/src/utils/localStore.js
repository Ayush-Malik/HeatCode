import { encryptData, decryptData } from "./encrypt.js";

const createStorage = (key, data) => {
    localStorage.setItem(key, encryptData(data));
};

const getStorage = (key) => {
    if(localStorage.getItem(key) === null)
        return null;
    return decryptData(localStorage.getItem(key));
};

const removeStorage = (key) => {
    localStorage.removeItem(key);
};

export { createStorage, getStorage, removeStorage };