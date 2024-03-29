import { NextResponse } from 'next/server';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
export async function GET(request: Request) {
  const firebaseConfig = {
    apiKey: 'AIzaSyAEK9J_ziufDjZwX9M1BTHfYsfszPkT92Y',
    authDomain: 'operating-ally-304222.firebaseapp.com',
    projectId: 'operating-ally-304222',
    storageBucket: 'operating-ally-304222.appspot.com',
    messagingSenderId: '163123713874',
    appId: '1:163123713874:web:58f2df16ad5e5a62b50c8b',
    measurementId: 'G-S3EJM911CC'
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const snapshot = await getDocs(collection(db, 'gc_ebay_list'));
  if (snapshot.empty) {
    console.log('Not Found');
    return;
  } else {
    const data = snapshot.docs.map((doc: { data: () => any }) => doc.data());
    return NextResponse.json({ data });
  }
}
