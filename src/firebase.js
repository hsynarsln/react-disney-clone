import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBCrBMWHKytKQ_DJshhphA5c0mdndSVGpg',
  authDomain: 'disneyplus-clone-2e2f8.firebaseapp.com',
  projectId: 'disneyplus-clone-2e2f8',
  storageBucket: 'disneyplus-clone-2e2f8.appspot.com',
  messagingSenderId: '861445811654',
  appId: '1:861445811654:web:fefc4ca37d05d70a8996c7'
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);

export const provider = new GoogleAuthProvider();

export const storage = getStorage(firebaseApp);
