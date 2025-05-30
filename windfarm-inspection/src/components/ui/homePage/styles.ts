import styled from 'styled-components';

export const HomePageContainer = styled.div`
  font-family: 'Jockey One', sans-serif;
  height: 100vh;
  width: 100vw;

  display: flex;

  .homepage-left {
    background-color: #46A3D7;
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .homepage-left img {
    height: 100%;
    width: auto;
  }

  .homepage-right {
    background-color: #09044F;
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    gap: 1rem;
    align-items: center;
  }

  .homepage-right .title {
    font-size: 100px;
    color: rgb(248, 248, 255);
    font-weight: bold;
    text-shadow:
      -4px -4px 0 #00669C,
      4px -4px 0 #00669C,
      -4px 4px 0 #00669C,
      4px 4px 0 #00669C;
  }

  .btn {
    background-color: #1c95c5;
    font-family: 'Jockey One', sans-serif;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1.6rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 60%;
  }

  .btn:hover {
    background-color: #147ca6;
  }

  .arrow-icon {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    cursor: pointer;
  }

`;
