import styled from 'styled-components'

export const LearnMoreContainer = styled.div`
  font-family: 'Jockey One', sans-serif;
  height: 100vh;
  width: 100vw;
  background-color: #09044f;
  color: #f0f0ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;

  .learnmore-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    
  }

  .learnmore-title h1 {
    font-size: 3rem;
   color: rgb(248, 248, 255);
    font-weight: bold;
    text-shadow:
      -4px -4px 0 #00669C,
      4px -4px 0 #00669C,
      -4px 4px 0 #00669C,
      4px 4px 0 #00669C;
  }

  .learnmore-box {
    border: 1px solid #46a3d7;
    padding: 2rem;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    text-align: center;
    font-size: 1.25rem;
    line-height: 1.6;
    max-width: 700px;
  }
`
