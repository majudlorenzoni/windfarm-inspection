import styled from 'styled-components';

export const InspectionPageContainer = styled.div`
  font-family: 'Jockey One', sans-serif;
  height: 100vh;
  width: 100%;
  background-color: #09044F;
  color: #F0F0FF;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  box-sizing: border-box;

  .init p {
  font-size: 30px;
  text-align: center; /* centraliza o texto */
  border: 2px solid #ccc; /* borda simples */
  border-radius: 12px; /* cantos arredondados */
  padding: 20px; /* espaço interno */
  width: fit-content; /* largura se ajusta ao conteúdo */
  margin: 0 auto; /* centraliza horizontalmente o bloco */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* sombra leve */
}

  
  .has {
    width: 100%;
    max-width: 1000px; /* Aumentado para expandir horizontalmente */
    max-height: 100%;
    overflow-y: auto;
    padding: 1.5rem;
    border: 1px solid #46A3D7;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.06);
    box-shadow: 0 0 10px #46A3D7;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: #46A3D7 transparent;
  }

  .has::-webkit-scrollbar {
    width: 8px;
  }

  .has::-webkit-scrollbar-thumb {
    background-color: #46A3D7;
    border-radius: 8px;
  }

  .has h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #FFFFFF;
  }

  .has ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .has li {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    background-color: rgba(255, 255, 255, 0.07);
    border: 1px solid #46A3D7;
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.4;
  }

  .has h4 {
    font-size: 1rem;
    color: #70C0E8;
    font-weight: 600;
    margin: 0;
  }

  .has span {
    color: #FFFFFF;
    font-weight: 400;
    margin-left: 0.3rem;
  }

  .has-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
    width: 100%;
  }

  .button-inspecao,
  .button-relatorio {
    flex: 1;
    min-width: 140px;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    background-color: #46A3D7;
    color: white;
    transition: background-color 0.3s;
  }

  .button-inspecao:hover,
  .button-relatorio:hover {
    background-color: #368bbf;
  }
`;


