import React from 'react';
import styled from 'styled-components';

const FilterButtonContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #1e1a80;
  color: #f0f0ff;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-family: 'Jockey One', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  width: fit-content;
  transition: background-color 0.3s ease;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: #2d27aa;
  }
`;

export function FilterButton({ onClick }: { onClick: () => void }) {
  return (
    <FilterButtonContainer onClick={onClick} aria-label="Abrir filtro">
      <img src="/img/filter.png" alt="Filtro" />
      Filtrar turbina
    </FilterButtonContainer>
  );
}