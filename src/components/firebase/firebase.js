import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBGWH44UNmMPDe9GRfU9iM700jcuCseCSY',
  authDomain: 'snapchat-clone-54c9d.firebaseapp.com',
  projectId: 'snapchat-clone-54c9d',
  storageBucket: 'snapchat-clone-54c9d.appspot.com',
  messagingSenderId: '238484827763',
  appId: '1:238484827763:web:2112b150ee75a346f5c406',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
