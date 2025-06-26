// styles.ts
import styled from 'styled-components';

export const BottomNavButton = styled.button<{ position: 'left' | 'right' }>`
  position: fixed;
  bottom: 20px;
  ${(props) => (props.position === 'left' ? 'left: 20px;' : 'right: 20px;')}
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #1e1a80;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(30, 26, 128, 0.4);

  &:hover {
    background-color: #2d27aa;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;
