import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, Timestamp } from 'firebase/firestore';
import { auth } from '../../../../firebase';
import { db } from '../../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useWindData } from '../../../components/windDataContext';
import { InspectionPageContainer } from './styled';

interface InspectionEntry {
  id: string;
  createdAt: Timestamp;
  [key: string]: any;
}

export const PreviousInspectionsPage: React.FC = () => {
  const [inspections, setInspections] = useState<InspectionEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setWindData } = useWindData();

  useEffect(() => {
    const fetchInspections = async () => {
      const user = auth.currentUser;
      if (!user || !user.email) {
        alert('Você precisa estar logado para ver suas inspeções.');
        return;
      }

      try {
        const inspectionsRef = collection(
          db,
          'users',
          user.email,
          'inspections',
        );
        const snapshot = await getDocs(inspectionsRef);
        const data: InspectionEntry[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as object),
        })) as InspectionEntry[];

        setInspections(data);
      } catch (error) {
        console.error('Erro ao buscar inspeções:', error);
        alert('Erro ao carregar inspeções.');
      } finally {
        setLoading(false);
      }
    };

    fetchInspections();
  }, []);

  const handleViewInspection = async (inspectionId: string) => {
    const user = auth.currentUser;
    if (!user || !user.email) {
      alert('Usuário não autenticado. Faça login.');
      return;
    }

    try {
      const inspectionDocRef = doc(
        db,
        'users',
        user.email,
        'inspections',
        inspectionId,
      );
      const inspectionSnap = await getDoc(inspectionDocRef);

      if (!inspectionSnap.exists()) {
        alert('Inspeção não encontrada.');
        return;
      }

      const inspectionData = inspectionSnap.data();
      setWindData(inspectionData); // <-- Carrega no contexto
      navigate('/windFarm'); // <-- Redireciona
    } catch (error) {
      console.error('Erro ao carregar inspeção:', error);
      alert(
        `Erro ao carregar inspeção: ${error instanceof Error ? error.message : error}`,
      );
    }
  };

  const handleViewReport = async (inspectionId: string) => {
    const user = auth.currentUser;
    if (!user || !user.email) {
      alert('Usuário não autenticado. Faça login.');
      return;
    }

    try {
      const inspectionDocRef = doc(
        db,
        'users',
        user.email,
        'inspections',
        inspectionId,
      );
      const inspectionSnap = await getDoc(inspectionDocRef);

      if (!inspectionSnap.exists()) {
        alert('Inspeção não encontrada.');
        return;
      }

      const inspectionData = inspectionSnap.data();
      setWindData(inspectionData); // <-- Carrega no contexto
      navigate('/report'); // <-- Redireciona
    } catch (error) {
      console.error('Erro ao carregar inspeção:', error);
      alert(
        `Erro ao carregar inspeção: ${error instanceof Error ? error.message : error}`,
      );
    }
  };

  if (loading) return <p>Carregando inspeções...</p>;

  return (
    <InspectionPageContainer>
      <div className="init">
        {inspections.length === 0 ? (
          <p>Você ainda não possui inspeções salvas.</p>
        ) : (
          <div className="has">
            <h1>Inspeções Anteriores</h1>
            <ul>
              {inspections.map((inspection, index) => (
                <li key={inspection.id}>
                  <div>
                    <h4>
                      Nome:<span>Inspeção {inspections.length - index}</span>
                    </h4>
                    <h4>
                      Data:
                      <span>
                        {inspection.createdAt?.toDate().toLocaleString() ||
                          'Desconhecida'}
                      </span>
                    </h4>
                  </div>
                  <div className="has-buttons">
                    <button
                      className="button-inspecao"
                      onClick={() => handleViewInspection(inspection.id)}
                    >
                      Visualizar inspeção
                    </button>
                    <button
                      className="button-relatorio"
                      onClick={() => handleViewReport(inspection.id)}
                    >
                      Visualizar Relatório
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </InspectionPageContainer>
  );
};