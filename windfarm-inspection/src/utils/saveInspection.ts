import { collection, doc, setDoc, Timestamp, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';

interface InspectionData {
  [key: string]: any;
  createdAt?: Timestamp;
  nome?: string;

}

export async function saveInspection(inspection: InspectionData) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error('Usuário não autenticado');
  }

  const inspectionsRef = collection(db, 'users', user.email, 'inspections');

  // Conta quantas inspeções já existem
  const snapshot = await getDocs(inspectionsRef);
  const inspectionCount = snapshot.size;
  const inspectionName = `Inspeção ${inspectionCount + 1}`;

  const newDocRef = doc(inspectionsRef);
  await setDoc(newDocRef, {
    ...inspection,
    nome: inspectionName,
    createdAt: Timestamp.now(),
  });

  console.log(`Inspeção salva como: ${inspectionName} (ID: ${newDocRef.id})`);
}