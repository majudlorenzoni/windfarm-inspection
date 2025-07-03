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

  .button-add {
    font-family: 'Jockey One', sans-serif;
    background-color: #46A3D7;
    border: none;
    border-radius: 10px;
    padding: 12px 28px;
    color: #F0F0FF;
    font-size: 1.1rem;
  }

  .form-wrapper {
    max-width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 1.5rem;
    border: 1px solid #46A3D7;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.06);
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

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #70C0E8;
    }

    .data-section {
      border: 1px solid #0a4a6f;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
    }

    .section-title {
      font-weight: 600;
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #70C0E8;
    }

    .fieldset-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px; 
      gap: 20px;
      width: 100%;
      font-size: 24px;
    }

    button.remove-tower-button {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0; /* evita padding extra */
    }

    button.remove-tower-button img {
      width: 30px;
      height: 30px;
      display: block; /* evita espaçamento abaixo da imagem */
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
      border-spacing: 0 8px;
      font-size: 1.1rem;
      line-height: 2.2rem;
    }

  .data-table-scala-vertical th,
  .data-table-scala-vertical td {
    padding: 12px 16px;
    text-align: center;
    white-space: nowrap;
  }

  .logsSystem {
    padding: 16px;
    border-radius: 8px;
    max-width: 700px;
    margin: 20px 0 20px 0px;
    color: #9cc9ff;
    border: 0.5px solid #9cc9ff;
  }

  .logsSystem h3 {
    margin-bottom: 12px;
    font-weight: 700;
    color: #8ac7ff;
    font-size: 1.5rem;
  }

  .logsSystem table.data-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 12px;
  }

  .logsSystem tbody tr {
    border-radius: 8px;
    vertical-align: middle;
  }

  .logsSystem tbody tr td {
    padding: 8px 12px;
    vertical-align: middle;
  }

  .logsSystem tbody tr td input.data-input {
    width: 100%;
    padding: 6px 10px;
    border-radius: 6px;
    border: none;
    font-size: 1rem;
    background-color: #2a357a;
    color: #d9e6ff;
    box-shadow: inset 0 0 5px #1a2260;
    transition: background-color 0.3s ease;
  }

  .logsSystem tbody tr td input.data-input:focus {
    background-color: #3b4bd0;
    outline: none;
    box-shadow: 0 0 8px #6a8fff;
  }

  .logsSystem tbody tr td button {
    padding: 6px 16px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.25s ease;
  }

  .logsSystem tbody tr td button:hover {
    filter: brightness(1.15);
  }

  .logsSystem tbody tr td button[style*="#a00"] {
    background-color: #a00;
    color: white;
  }

  .logsSystem tbody tr td button[style*="#a00"]:hover {
    background-color: #c22;
  }

  .logsSystem tbody tr td button:not([style*="#a00"]) {
    background-color: #3ca6ff;
    color: white;
  }

  .logsSystem tbody tr td button:not([style*="#a00"]):hover {
    background-color: #59b0ff;
  }

  .anotacoes {
  padding: 16px;
  border-radius: 8px;
  max-width: 700px;
  margin: 20px 0 20px 0px;
  color: #9cc9ff;
  border: 0.5px solid #9cc9ff;
  }

.anotacoes h3 {
  margin-bottom: 12px;
  font-weight: 700;
  color: #8ac7ff;
  font-size: 1.5rem;
}

.anotacoes table.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px; /* espaçamento entre linhas */
}

.anotacoes tbody tr {
  border-radius: 8px;
  vertical-align: middle;
}

.anotacoes tbody tr td {
  padding: 8px 12px;
  vertical-align: middle;
}

.anotacoes tbody tr td input.data-input {
  width: 100%;
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  background-color: #2a357a;
  color: #d9e6ff;
  box-shadow: inset 0 0 5px #1a2260;
  transition: background-color 0.3s ease;
}

.anotacoes tbody tr td input.data-input:focus {
  background-color: #3b4bd0;
  outline: none;
  box-shadow: 0 0 8px #6a8fff;
}

.anotacoes tbody tr td button {
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.anotacoes tbody tr td button:hover {
  filter: brightness(1.15);
}

.anotacoes tbody tr td button[style*="#a00"] {
  background-color: #a00;
  color: white;
}

.anotacoes tbody tr td button[style*="#a00"]:hover {
  background-color: #c22;
}

.anotacoes tbody tr td button:not([style*="#a00"]) {
  background-color: #3ca6ff;
  color: white;
}

.anotacoes tbody tr td button:not([style*="#a00"]):hover {
  background-color: #59b0ff;
}

.metadados {
  margin-top: 20px;
  width: fit-content;
  text-align: left;
  border: 0.5px solid #9cc9ff;
  padding: 16px;
  border-radius: 8px;
}

.metadados h3 {
  margin-bottom: 12px;
  font-weight: 700;
  color: #8ac7ff;
  font-size: 1.5rem;
}

.metadata-group {
  display: grid;
}

.metadata-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.metadata-item label {
  width: 60%;
  font-size: 14px;
  text-align: right;
}

.metadata-item input {
  flex: 1;
  padding: 6px 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100px;
}

.standard-power-curve { 
  padding: 16px;
  border-radius: 8px;
  max-width: 700px;
  margin: 20px 0 20px 0;
  color: #9cc9ff;
  border: 0.5px solid #9cc9ff;
}

.standard-power-curve h3 {
  margin-bottom: 12px;
  font-weight: 700;
  color: #8ac7ff;
  font-size: 1.5rem;
}

.standard-power-curve table.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px; /* espaçamento entre linhas */
}

.standard-power-curve tbody tr {
  border-radius: 8px;
  vertical-align: middle;
}

.standard-power-curve tbody tr td {
  padding: 8px 12px;
  vertical-align: middle;
}

.standard-power-curve tbody tr td input.data-input {
  width: 100%;
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  background-color: #2a357a;
  color: #d9e6ff;
  box-shadow: inset 0 0 5px #1a2260;
  transition: background-color 0.3s ease;
}

.standard-power-curve tbody tr td input.data-input:focus {
  background-color: #3b4bd0;
  outline: none;
  box-shadow: 0 0 8px #6a8fff;
}

.standard-power-curve tbody tr td button {
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.standard-power-curve tbody tr td button:hover {
  filter: brightness(1.15);
}

.standard-power-curve tbody tr td button[style*="#a00"] {
  background-color: #a00;
  color: white;
}

.standard-power-curve tbody tr td button[style*="#a00"]:hover {
  background-color: #c22;
}

.standard-power-curve tbody tr td button:not([style*="#a00"]) {
  background-color: #3ca6ff;
  color: white;
}

.standard-power-curve tbody tr td button:not([style*="#a00"]):hover {
  background-color: #59b0ff;
}

.structural-vibration-signals {
  padding: 16px;
  border-radius: 8px;
  border: 0.5px solid #9cc9ff;
  max-width: 720px;
  margin: 20px 0;
  color: #9cc9ff;
}

.structural-vibration-signals h3 {
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 1.4rem;
  color: #8ac7ff;
}

.structural-vibration-signals label {
  display: block;
  margin-bottom: 14px;
  font-weight: 600;
  font-size: 1rem;
  color: #a7bbff;
}

.structural-vibration-signals input[type="text"],
.structural-vibration-signals input[type="datetime-local"] {
  width: 100%;
  max-width: 350px;
  padding: 8px 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: #2a357a;
  color: #d9e6ff;
  box-shadow: inset 0 0 6px #1a2260;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.structural-vibration-signals input[type="text"]:focus,
.structural-vibration-signals input[type="datetime-local"]:focus {
  background-color: #3b4bd0;
  outline: none;
  box-shadow: 0 0 8px #6a8fff;
}

.vibration-frequency-spectrum {
  padding: 16px;
  border-radius: 8px;
  border: 0.5px solid #9cc9ff;
  max-width: 720px;
  margin: 20px 0;
  color: #9cc9ff;
}

.vibration-frequency-spectrum h3 {
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 1.4rem;
  color: #8ac7ff;
}

.vibration-frequency-spectrum label {
  display: block;
  margin-bottom: 14px;
  font-weight: 600;
  font-size: 1rem;
  color: #a7bbff;
}

.vibration-frequency-spectrum input[type="text"],
.vibration-frequency-spectrum input[type="datetime-local"] {
  width: 100%;
  max-width: 350px;
  padding: 8px 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: #2a357a;
  color: #d9e6ff;
  box-shadow: inset 0 0 6px #1a2260;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.vibration-frequency-spectrum input[type="text"]:focus,
.vibration-frequency-spectrum input[type="datetime-local"]:focus {
  background-color: #3b4bd0;
  outline: none;
  box-shadow: 0 0 8px #6a8fff;
}

.bearing-vibration {
  padding: 16px;
  border-radius: 8px;
  border: 0.5px solid #9cc9ff;
  max-width: 400px;
  margin: 20px 0;
  color: #9cc9ff;
}

.bearing-vibration h3 {
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 1.4rem;
  color: #8ac7ff;
}

.bearing-vibration label {
  display: block;
  margin-bottom: 14px;
  font-weight: 600;
  font-size: 1rem;
  color: #a7bbff;
}

.bearing-vibration input[type="number"],
.bearing-vibration input[type="datetime-local"] {
  width: 100%;
  max-width: 220px;
  padding: 8px 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: #2a357a;
  color: #d9e6ff;
  box-shadow: inset 0 0 6px #1a2260;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.bearing-vibration input[type="number"]:focus,
.bearing-vibration input[type="datetime-local"]:focus {
  background-color: #3b4bd0;
  outline: none;
  box-shadow: 0 0 8px #6a8fff;
}

.tower-stress-measurements {
  padding: 16px;
  border-radius: 8px;
  border: 0.5px solid #9cc9ff;
  max-width: 400px;
  margin: 20px 0;
  color: #9cc9ff;
}

.tower-stress-measurements h3 {
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 1.4rem;
  color: #8ac7ff;
}

.tower-stress-measurements label {
  display: block;
  margin-bottom: 14px;
  font-weight: 600;
  font-size: 1rem;
  color: #a7bbff;
}

.tower-stress-measurements input[type="number"],
.tower-stress-measurements input[type="datetime-local"] {
  width: 100%;
  max-width: 220px;
  padding: 8px 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: #2a357a;
  color: #d9e6ff;
  box-shadow: inset 0 0 6px #1a2260;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.tower-stress-measurements input[type="number"]:focus,
.tower-stress-measurements input[type="datetime-local"]:focus {
  background-color: #3b4bd0;
  outline: none;
  box-shadow: 0 0 8px #6a8fff;
}

.sensor-sampling-interval {
  padding: 16px;
  border-radius: 8px;
  border: 0.5px solid #9cc9ff;
  max-width: 400px;
  margin: 20px 0;
  color: #9cc9ff;
}

.sensor-sampling-interval h3 {
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 1.4rem;
  color: #8ac7ff;
}

.sensor-sampling-interval label {
  display: block;
  margin-bottom: 14px;
  font-weight: 600;
  font-size: 1rem;
  color: #a7bbff;
}

.sensor-sampling-interval input[type="text"] {
  width: 100%;
  max-width: 220px;
  padding: 8px 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: #2a357a;
  color: #d9e6ff;
  box-shadow: inset 0 0 6px #1a2260;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.sensor-sampling-interval input[type="text"]:focus {
  background-color: #3b4bd0;
  outline: none;
  box-shadow: 0 0 8px #6a8fff;
}

.accelerometer-data-location {
  padding: 16px;
  border-radius: 8px;
  border: 0.5px solid #9cc9ff;
  max-width: 400px;
  margin: 20px 0;
  color: #9cc9ff;
}

.accelerometer-data-location h3 {
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 1.4rem;
  color: #8ac7ff;
}

.accelerometer-data-location label {
  display: block;
  margin-bottom: 14px;
  font-weight: 600;
  font-size: 1rem;
  color: #a7bbff;
}

.accelerometer-data-location input[type="text"] {
  width: 100%;
  max-width: 220px;
  padding: 8px 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: #2a357a;
  color: #d9e6ff;
  box-shadow: inset 0 0 6px #1a2260;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.accelerometer-data-location input[type="text"]:focus {
  background-color: #3b4bd0;
  outline: none;
  box-shadow: 0 0 8px #6a8fff;
}


  .data-table-scala-vertical th:first-child,
  .data-table-scala-vertical td:first-child {
    text-align: left;
    white-space: normal;
    background-color: #09044F;
    color: #F0F0FF;
    border-radius: 8px;
    padding-left: 20px;
    width: 50%;
  }

  .data-table-scala-vertical thead th {
    background-color: transparent;
    font-weight: 600;
    color: #70C0E8;
    border: none;
    padding-bottom: 8px;
  }

  .data-table-scala-vertical th,
  .data-table-scala-vertical td {
    border: none;
  }
}
`;