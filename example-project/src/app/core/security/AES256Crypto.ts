// const crypto = require('crypto');
// import * as crypto from 'crypto';
// import * as crypto from 'crypto';
// const crypto = require('crypto');
import {environment} from '../../../environments/environment';
// declare var crypto: any;
import * as CryptoJS from 'crypto-js';
import {CipherOption} from 'crypto-js';
// import * as crypto from 'crypto';
// import { AES } from 'crypto-ts';
export class AES256Crypto {

    public encode(data: string) {
        // console.log(crypto);
        // console.log(crypto.createCipheriv);

        // const iv = String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) +
        //     String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) +
        //     String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) +
        //     String.fromCharCode(0);
        // const clearEncoding = 'utf8';
        // const cipherEncoding = 'base64';
        // const cipherChunks = [];
        // const cipher = crypto.createCipheriv('aes-256-cbc', <any>environment.securityPrivacyKey, iv);
        // cipher.setAutoPadding(true);
        // cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
        // cipherChunks.push(cipher.final(cipherEncoding));
        // return cipherChunks.join('');


        // return AES.encrypt('message', environment.securityPrivacyKey).toString();
        //
        // const cryptr = new Cryptr('myTotalySecretKey');
        //
        // const encryptedString = cryptr.encrypt('bacon');
        // const decryptedString = cryptr.decrypt(encryptedString);
        // return encryptedString;

        // return '';


        // console.log(environment.securityPrivacyKey)


        // https://www.code-sample.com/2018/12/angular-7-cryptojs-encrypt-decrypt.html
        const key = CryptoJS.enc.Utf8.parse(environment.securityPrivacyKey);
        const iv = CryptoJS.enc.Utf8.parse('');
        // var iv = CryptoJS.enc.Utf8.parse(environment.securityPrivacyKey);
        // var iv = String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) +
        //     String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) +
        //     String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) +
        //     String.fromCharCode(0);

        const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data.toString()), key,
            {
                keySize: 256 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            } as CipherOption);








        return encrypted.toString();



    }

    public decode(data: string): string {
        // const iv = String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) +
        //     String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) +
        //     String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) +
        //     String.fromCharCode(0);
        // const clearEncoding = 'utf8';
        // const cipherEncoding = 'base64';
        // const cipherChunks = [];
        // const decipher = crypto.createDecipheriv('aes-256-cbc', <any>environment.securityPrivacyKey, iv);
        // decipher.setAutoPadding(true);
        // cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
        // cipherChunks.push(decipher.final(clearEncoding));
        // return cipherChunks.join('');

        const key = CryptoJS.enc.Utf8.parse(environment.securityPrivacyKey);
        const iv = CryptoJS.enc.Utf8.parse('');
        const decrypted = CryptoJS.AES.decrypt(data, key, {
            keySize: 256 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        } as CipherOption);

        // return decrypted.toString();
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

}
