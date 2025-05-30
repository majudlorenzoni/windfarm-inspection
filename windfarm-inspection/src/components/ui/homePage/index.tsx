// src/main.tsx ou src/index.tsx
import { useState } from 'react'
import { ArrowRightCircle } from 'lucide-react';
import { HomePageContainer } from './styles';
import { LoadPage } from '../loadPage';
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
  const navigate = useNavigate()

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
        <h1 className="title" >Wind Vision</h1>
        <button className="btn" onClick={() => navigate('/load')}>Nova inspeção</button>
        <button className="btn">Inspeções anteriores</button>
      <ArrowRightCircle className="arrow-icon" size={40} color="#1c95c5" />
      </div>

    </HomePageContainer>
  );
};