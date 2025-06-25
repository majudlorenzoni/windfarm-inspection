import React, { useEffect, useState } from 'react';
import { auth } from '../../../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { LoginButton } from './loginButton';
import { useNavigate } from 'react-router-dom';
import { LoginPageContainer } from './styles';

export const LoginPage: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );
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
    <LoginPageContainer>
      <div className="homepage-left">
        <img
          src="/img/image1.png"
          alt="Turbina eólica"
          className="wind-image"
        />
      </div>
      <div className="homepage-right">
        <h1 className="title">Wind Vision</h1>
        {user ? (
          <div className='success'>
            <p>Bem-vindo(a), {user.name}!</p>
            {loginSuccess && (
              <p>
                Login bem-sucedido! Redirecionando...
              </p>
            )}
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </LoginPageContainer>
  );
};
