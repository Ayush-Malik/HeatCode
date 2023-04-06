import CryptoJS from 'crypto-js';

const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_SECRET_KEY).toString();
}

const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export { encryptData, decryptData };