import React from 'react';
import { BottomNavButton } from './styles';

type BottomNavigationProps = {
  onLeftClick: () => void;
  onRightClick: () => void;
};

export function BottomNavigation({ onLeftClick, onRightClick }: BottomNavigationProps) {
  return (
    <>
      <BottomNavButton position="left" onClick={onLeftClick} aria-label="Voltar">
        <img src="/img/left-arrow.png" alt="Seta para esquerda" />
      </BottomNavButton>

      <BottomNavButton position="right" onClick={onRightClick} aria-label="Avançar">
        <img src="/img/right-arrow.png" alt="Seta para direita" />
      </BottomNavButton>
    </>
  );
}
