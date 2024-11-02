import CryptoJS from 'crypto-js';

const SECRET_KEY = CryptoJS.enc.Base64.parse('sEPT/XZ12Jj+uRyZWfJuZA==');
const IV_LENGTH = 16;

export const encryptData = (data) => {
    const stringifiedData = JSON.stringify(data);

    const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);

    // Encrypt the data
    const encrypted = CryptoJS.AES.encrypt(stringifiedData, SECRET_KEY, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    // Return both IV and ciphertext as Base64 strings
    return `${iv.toString(CryptoJS.enc.Base64)}:${encrypted.ciphertext.toString(CryptoJS.enc.Base64)}`;
};

export const decryptData = (ciphertext) => {
    const [ivPart, encryptedData] = ciphertext.split(':');
    const iv = CryptoJS.enc.Base64.parse(ivPart);
    const encryptedWordArray = CryptoJS.enc.Base64.parse(encryptedData);

    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: encryptedWordArray },
        SECRET_KEY,
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};
