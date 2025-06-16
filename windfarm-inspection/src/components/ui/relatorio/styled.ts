// src/pages/RelatorioGeral.styles.ts
import styled from 'styled-components';

export const RelatorioGeralContainer = styled.div`
  font-family: 'Jockey One', sans-serif;
  height: 100vh;
  width: 100vw;
  background-color: #09044F;
  color: #f8f8ff;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  overflow-y: auto;
  gap: 2rem;
`;

export const SectionContainer = styled.div`
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: #09044F;
  width: 80%;
`;

export const SectionHeader = styled.div`
  padding: 1rem;
  background-color: #f4f4f4;
  cursor: pointer;
  font-weight: bold;
  border-radius: 8px 8px 0 0;
`;

export const SectionContent = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  color: #1e1e1e;            
  border-radius: 0 0 8px 8px;
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

export const StatBox = styled.div`
  background-color: #e8f0fe;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

export const ChartGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 80%;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  & > div {
    flex: 1 1 45%;
    min-width: 400px;
  }
`;
