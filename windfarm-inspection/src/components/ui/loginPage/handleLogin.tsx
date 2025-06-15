import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../../firebase';
import { saveUserToFirestore } from '../../../utils/saveUser';

const provider = new GoogleAuthProvider();

async function handleLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await saveUserToFirestore({
      name: user.displayName || 'Sem nome',
      email: user.email || ''
    });
  } catch (err) {
    console.error('Erro no login:', err);
  }
}
