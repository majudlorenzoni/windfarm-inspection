// src/main.tsx ou src/index.tsx
import { useState } from 'react';
import { HomePageContainer } from './styles';
import { LoadPage } from '../loadPage';
import { useNavigate } from 'react-router-dom';

import { ExitModal } from '../exitModal';
export const HomePage = () => {
  const navigate = useNavigate();
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <HomePageContainer>
      <div className="homepage-left">
        <img
          src="/img/image1.png"
          alt="Turbina eólica"
          className="wind-image"
        />
      </div>
      <div className="homepage-right">
        <h1 className="title">Wind Vision</h1>
        <button className="btn" onClick={() => navigate('/load')}>
          Nova inspeção
        </button>
        <button className="btn" onClick={() => navigate('/inspections')}>
          Inspeções anteriores
        </button>
      </div>

      <button
        className="logout-button"
        onClick={handleLogout}
        title="Sair"
        aria-label="Sair"
      >
        <img
          src="/img/saidaModal.png"
          alt="Sair"
          style={{ width: 32, height: 32 }}
        />
      </button>

    </HomePageContainer>
  );
};

