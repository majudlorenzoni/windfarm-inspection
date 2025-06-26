import styled from 'styled-components';

export const FilterModalContainer = styled.div`
  position: absolute;
  font-family: 'Jockey One', sans-serif;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(163, 214, 238, 0.85); /* leve transparência com azul escuro */
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  > div.modal {
    background: #09044f;
    border-radius: 12px;
    padding: 2rem;
    width: 360px;
    max-height: 80vh;
    overflow-y: auto;
    font-family: 'Jockey One', sans-serif;
    color: #f0f0ff;
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 1.8rem;
    text-align: center;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  label.checkbox-label {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  input[type='range'] {
    width: 100%;
    cursor: pointer;
  }

  input[type='date'] {
    padding: 0.25rem;
    border-radius: 6px;
    border: none;
    font-family: 'Jockey One', sans-serif;
    font-size: 1rem;
  }

  div {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .actions {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
  }

  button.primary {
    padding: 0.5rem 1rem;
    background-color: #1e1a80;
    color: #f0f0ff;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    width: 48%;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2d27aa;
    }
  }

  button.secondary {
    padding: 0.5rem 1rem;
    background-color: #444780;
    color: #bbb;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    width: 48%;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #5a57ab;
      color: #f0f0ff;
    }
  }
`;
