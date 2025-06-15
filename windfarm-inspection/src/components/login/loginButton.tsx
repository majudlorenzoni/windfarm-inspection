// src/components/LoginButton.tsx
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase';

export function LoginButton() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Usuário logado:', user);
      // Aqui você pode salvar no contexto ou exibir a interface logada
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <button onClick={handleLogin}>
      Entrar com Google
    </button>
  );
}
