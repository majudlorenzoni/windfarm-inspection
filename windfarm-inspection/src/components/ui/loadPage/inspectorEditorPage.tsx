import React, { useState } from 'react';
import { DataWind } from './index';
import { saveInspection } from '../../../utils/saveInspection'; // função do Firestore
import { auth } from '../../../../firebase';

export const InspectionEditorPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState<string>('');


  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user?.email) {
      setMessage('Usuário não autenticado');
      return;
    }

    try {
      await saveInspection(user.email, data);
      setMessage('Inspeção salva com sucesso!');
    } catch (error) {
      console.error(error);
      setMessage('Erro ao salvar a inspeção.');
    }
  };

  if (!data) return <p>Carregue um JSON para começar.</p>;

  return (
    <>
      <DataWind data={data} onDataChange={setData} />
      <button onClick={handleSave}>Salvar Inspeção</button>
      {message && <p>{message}</p>}
    </>
  );
};
