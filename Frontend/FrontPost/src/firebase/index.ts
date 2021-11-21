import * as firebase from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAWrW2xeBGe4ezb1TXbDr35s0OzpamTyeU',
    authDomain: 'bita-booking-service.firebaseapp.com',
    projectId: 'bita-booking-service',
    storageBucket: 'bita-booking-service.appspot.com',
    messagingSenderId: '862779216559',
    appId: '1:862779216559:web:2f13ab5798ebc3fabb7a5a',
    measurementId: 'G-PS1E8ZTVYC',
};

const app = firebase.initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;
