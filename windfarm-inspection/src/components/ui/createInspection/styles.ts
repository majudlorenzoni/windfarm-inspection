import styled from 'styled-components';

export const CreateInspectionFormContainer = styled.div`
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

  .scada-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px 20px;
    align-items: start;
  }

  .scada-grid label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
  }

  .form-wrapper {
    max-width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 1.5rem;
    border: 1px solid #46A3D7;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.06);
    box-shadow: 0 0 10px #46A3D7;
    box-sizing: border-box;

    scrollbar-width: thin;
    scrollbar-color: #46A3D7 transparent;

    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #46A3D7;
      border-radius: 8px;
    }

    h1 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 2rem;
      color: #FFFFFF;
    }

    .data-section {
      border: 1px solid #0a4a6f;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .section-title {
      font-weight: 600;
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #70C0E8;
    }

    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      color: #F0F0FF;
      font-weight: 500;
      font-size: 1rem;
    }

    input[type='text'],
    input[type='number'],
    input[type='datetime-local'],
    textarea {
      margin-top: 0.4rem;
      padding: 8px 12px;
      border-radius: 8px;
      border: none;
      font-size: 1rem;
      box-sizing: border-box;
      font-family: inherit;
      background-color: #1b1b7a;
      color: white;
      transition: box-shadow 0.3s ease;
    }

    input[type='text']:focus,
    input[type='number']:focus,
    input[type='datetime-local']:focus,
    textarea:focus {
      outline: none;
      box-shadow: 0 0 5px 2px rgba(66, 133, 244, 0.7);
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }

    button {
      background-color: #46A3D7;
      color: white;
      border: none;
      border-radius: 10px;
      padding: 12px 28px;
      font-family: 'Jockey One', sans-serif;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
      margin-top: 1rem;
    }

    button.cancel {
      background-color: #6c757d;
    }

    button:hover {
      background-color: #368bbf;
      box-shadow: 0 4px 8px rgba(54, 139, 191, 0.6);
    }

    .button-group {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 2rem;
    }

    ul {
      padding-left: 20px;
      margin-top: 10px;
    }

    .data-table-scala-vertical {
  width: 100%;
  min-width: 900px;
    border-collapse: separate;
  border-spacing: 0 8px; /* espaçamento vertical entre linhas */
  font-size: 1.1rem;
  line-height: 2.2rem;
}

.data-table-scala-vertical th,
.data-table-scala-vertical td {
  padding: 12px 16px;
  text-align: center;
  white-space: nowrap;
}

/* Primeira coluna como título da linha, com destaque */
.data-table-scala-vertical th:first-child,
.data-table-scala-vertical td:first-child {
  font-weight: 700;
  text-align: left;
  white-space: normal;
  background-color: #09044F;
  color: #F0F0FF;
  border-radius: 8px;
  padding-left: 20px;
  width: 50%;
}

/* Remove bordas de th para visual limpo */
.data-table-scala-vertical thead th {
  background-color: transparent;
  font-weight: 600;
  color: #70C0E8;
  border: none;
  padding-bottom: 8px;
}

/* Remover bordas */
.data-table-scala-vertical th,
.data-table-scala-vertical td {
  border: none;
}
  }
`;