import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAkldmCP-PJE1Bh9rgXmiBSmky-lLVuZkY',
  authDomain: 'english-dictionary-8de40.firebaseapp.com',
  projectId: 'english-dictionary-8de40',
  storageBucket: 'english-dictionary-8de40.appspot.com',
  messagingSenderId: '485553085928',
  appId: '1:485553085928:web:8bacbcde113d15da70d85d',
  measurementId: 'G-HWN76CX677',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const wordsCollectionRef = collection(db, 'words');

export { auth, db, wordsCollectionRef };
