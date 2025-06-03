import styled from 'styled-components';

// Componentes de estilo
export const DataWindContainer = styled.div`
display: flex;
  justify-content: center;  /* centraliza horizontalmente */
  align-items: center;      /* centraliza verticalmente */
  font-family: 'Jockey One', sans-serif;
  background-color: #09044F;
  flex-direction: column; 

.data-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 60%;
  justify-content: center;
}

.section-title {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.data-table th, .data-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.data-table th {
  background-color: #f5f7fa;
  font-weight: 600;
  color: #2c3e50;
}

.data-table tr:hover {
  background-color: #f9f9f9;
}

.data-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.data-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 60px;
  resize: vertical;
  box-sizing: border-box;
}

.data-input:focus, .data-textarea:focus {
  outline: none;
  border-color: #4d90fe;
  box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.3);
}

.tower-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #09044F;
  padding: 20px 30px;
  color: white;
  width: 280px;
  margin: 20px auto;
}

.tower-selector h2 {
  margin-bottom: 15px;
  font-weight: 400;
  font-size: 1.8rem;
}

.tower-selector select {
  width: 100%;
  padding: 8px 12px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #1b1b7a;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tower-selector select:hover,
.tower-selector select:focus {
  background-color: #3a3aaf;
  outline: none;
}

.confirm-button {
  margin-top: 20px;
  padding: 12px 28px;
  background-color: #1b1b7a;
  border: none;
  border-radius: 8px;
  color: white;
  font-family: 'Jockey One', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 25px;
}


.confirm-button:hover {
  background-color: #3a3aaf;
  box-shadow: 0 4px 8px rgba(58, 58, 175, 0.5);
}


`