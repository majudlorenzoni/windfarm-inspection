import styled from 'styled-components';

export const LoadPageContainer = styled.div`
  font-family: 'Jockey One', sans-serif;
  height: 100vh;
  width: 100vw;
  background-color: #09044F;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  .title {
    font-size: 55px;
    color: rgb(248, 248, 255);
    font-weight: bold;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:rgb(56, 86, 238); /* azul */
    border-radius: 50%;
    width: 150px;
    height: 150px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }

  label:hover {
    background-color: #1546a0;
    transform: scale(1.1);
  }

  label img {
    width: 70px;
    height: 70px;
    user-select: none;
    pointer-events: none;
  }
`;

