import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export async function saveUserToFirestore(user: { email: string; name: string }) {
  const userRef = doc(db, 'users', user.email);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      name: user.name,
      email: user.email,
      createdAt: new Date().toISOString(),
    });
    console.log('Usuário salvo no Firestore.');
  } else {
    console.log('Usuário já existe.');
  }
}
