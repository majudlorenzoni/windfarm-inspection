import React from 'react';
import styled from 'styled-components';

type ExitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLogout: () => void;
};

const ExitModalContainer = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(9, 4, 79, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .modal-box {
    background: #09044f;
    padding: 2rem;
    border-radius: 12px;
    width: 320px;
    font-family: 'Jockey One', sans-serif;
    color: #f0f0ff;
    text-align: center;
  }

  .buttons-container {
    margin-top: 2rem;
    display: flex;
    justify-content: space-around;
  }

  button {
    padding: 0.5rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    width: 45%;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  button.primary {
    background-color: #1e1a80;
    color: #f0f0ff;

    &:hover {
      background-color: #2d27aa;
      color: #f0f0ff;
    }
  }

  button.secondary {
    background-color: #444780;
    color: #bbb;

    &:hover {
      background-color: #5a57ab;
      color: #f0f0ff;
    }
  }
`;

export function ExitModal({ isOpen, onClose, onConfirmLogout }: ExitModalProps) {
  if (!isOpen) return null;

  return (
    <ExitModalContainer>
      <div className="modal-box">
        <h2>Deseja sair da aplicação?</h2>
        <div className="buttons-container">
          <button className="secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="primary" onClick={onConfirmLogout}>
            Confirmar
          </button>
        </div>
      </div>
    </ExitModalContainer>
  );
}
