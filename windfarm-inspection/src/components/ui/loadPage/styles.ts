import styled from 'styled-components';

export const LoadPageContainer = styled.div`
  background-color: #09044f;
  color: #f0f0ff;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  font-family: 'Jockey One', sans-serif;

  .title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-color: #1e1a80;
    color: #f0f0ff;
    padding: 1.2rem 2rem;
    border-radius: 12px;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-weight: 500;
    width: 300px; /* 👈 largura fixa */
    text-align: center;

    img {
      width: 32px;
      height: 32px;
    }

    &:hover {
      background-color: #2d27aa;
    }
  }
`;



