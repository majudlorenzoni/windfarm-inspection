import React, { useEffect, useState } from 'react';
import { auth } from '../../../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { LoginButton } from './loginButton';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser?.email) {
        setUser({
          name: firebaseUser.displayName || 'Usuário',
          email: firebaseUser.email,
        });
        setLoginSuccess(true);
        // Redireciona para /home após 2 segundos
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        setUser(null);
        setLoginSuccess(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setLoginSuccess(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>WindVision</h1>
      {user ? (
        <div>
          <p>Bem-vindo(a), {user.name}!</p>
          <p>Email: {user.email}</p>
          {loginSuccess && <p style={{ color: 'green' }}>Login bem-sucedido! Redirecionando...</p>}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};
