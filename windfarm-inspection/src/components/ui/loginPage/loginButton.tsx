import React from 'react';
import { auth } from '../../../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { saveUserToFirestore } from '../../../utils/saveUser';

export const LoginButton: React.FC = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email) {
        await saveUserToFirestore({
          name: user.displayName || 'Sem nome',
          email: user.email,
        });
      }
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return <button onClick={handleLogin}>Login com Google</button>;
};
