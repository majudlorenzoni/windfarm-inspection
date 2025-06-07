import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
}

export const TurbineInfoModalContainer = styled.div<ModalProps>`
  font-family: 'Jockey One', sans-serif;
  position: fixed;
  top: 35px;   
  right: 2rem;
  height: 90vh;
  width: 365px;
  background-color: #09044F; /* azul escuro */
  color: rgb(248, 248, 255); /* branco clarinho */

  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  overflow-y: auto;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  border-radius: 16px;

  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #46A3D7;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #66bde6;
  }

  .close-btn {
    cursor: pointer;
    width: 24px;
    height: 24px;
    align-self: flex-end;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .close-btn:hover {
    background-color: rgb(202, 228, 238);
  }

  h2 {
    font-size: 2.4rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-shadow:
      -2px -2px 0 #00669C,
      2px -2px 0 #00669C,
      -2px 2px 0 #00669C,
      2px 2px 0 #00669C;
  }

  section {
    border-top: 1px solid #147ca6;
    padding-top: 1rem;

    h3 {
      font-size: 1.6rem;
      margin-bottom: 0.8rem;
      color: #46A3D7;
    }

    ul {
      list-style-type: none;
      padding-left: 0;

      li {
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
        line-height: 1.4;
      }
    }

    p {
      font-size: 1.1rem;
      font-style: italic;
      color: #9999cc;
    }
  }
`;