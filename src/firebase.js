import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, limit } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJbetc_KaFZPTQ3gcHdS3LW67x4kwiYNk",
  authDomain: "pray-for-2025.firebaseapp.com",
  projectId: "pray-for-2025",
  storageBucket: "pray-for-2025.firebasestorage.app",
  messagingSenderId: "701847639863",
  appId: "1:701847639863:web:8a2861c9c8d09089c9acb2",
  measurementId: "G-RCZJT2XQ33"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const prayersRef = collection(db, "prayers");

export { db };

export async function addPrayer(name, message) {
  await addDoc(prayersRef, {
    name,
    message,
    createdAt: Date.now()
  });
}

export async function getRandomPrayer(currentName, currentMessage) {
  const snapshot = await getDocs(query(prayersRef, limit(30)));
  const prayers = snapshot.docs.map((doc) => doc.data())
    .filter(p => !(p.name === currentName && p.message === currentMessage));

  return prayers.length > 0
    ? prayers[Math.floor(Math.random() * prayers.length)]
    : null;
}
