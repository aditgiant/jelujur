import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBoIG9Oato91Edl3xQ0x01T_bTQsT5gCoo",
    authDomain: "jelujur-website.firebaseapp.com",
    databaseURL: "https://jelujur-website.firebaseio.com",
    projectId: "jelujur-website",
    storageBucket: "jelujur-website.appspot.com",
    messagingSenderId: "1002414415601",
    appId: "1:1002414415601:web:b8346db335287829ebd350",
    measurementId: "G-4ZPBFF8F09"
  };

const fire = firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage()

export {
    fire as default
};