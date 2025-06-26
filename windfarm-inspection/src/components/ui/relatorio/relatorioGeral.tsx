// src/pages/RelatorioGeral.tsx
import React, { useEffect, useState } from 'react';
import { useWindData } from '../../../components/windDataContext';
import { checkIfTowerHasAlert } from '../../wind-turbine/checkTowerAlert';
import { BottomNavButton } from '../navegationButtons/styles';
import {
  LineChart,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import {
  RelatorioGeralContainer,
  SectionContainer,
  SectionHeader,
  SectionContent,
  ChartGrid,
  StatGrid,
  StatBox,
} from './styled';
import { useNavigate } from 'react-router-dom';

export const RelatorioGeral: React.FC = () => {
  const { windData, setWindData } = useWindData();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {},
  );

  const navigate = useNavigate();

  const handleLeftClick = () => {
    navigate('/inspections');
  };

  const handleRightClick = () => {
    navigate('/home');
  };

  useEffect(() => {
    if (!windData) {
      const savedData = localStorage.getItem('windData');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);

          if (parsedData.createdAt && parsedData.createdAt.seconds) {
            parsedData.createdAt = new Date(
              parsedData.createdAt.seconds * 1000,
            );
          }

          setWindData(parsedData);
        } catch (error) {
          console.error('Erro ao parsear windData do localStorage', error);
        }
      }
    }
  }, [windData, setWindData]);

  useEffect(() => {
    if (windData) {
      const toSave = {
        ...windData,
        createdAt:
          windData.createdAt instanceof Date
            ? { seconds: Math.floor(windData.createdAt.getTime() / 1000) }
            : windData.createdAt,
      };
      localStorage.setItem('windData', JSON.stringify(toSave));
    }
  }, [windData]);

  console.log('Dados carregados no RelatorioGeral:', windData);

  if (!windData) {
    return (
      <RelatorioGeralContainer>
        <p>Nenhuma inspeção carregada.</p>
      </RelatorioGeralContainer>
    );
  }

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const turbines = windData?.towers || [];
  const total = turbines.length;
  const inspecionadas = turbines.filter(
    (t: any) => t.maintenance_log && t.maintenance_log.length > 0,
  ).length;
  const falhas = turbines.filter((t: any) => checkIfTowerHasAlert(t)).length;

  return (
    <RelatorioGeralContainer>
      <h1>Relatório Geral da Inspeção</h1>

      <SectionContainer>
        <SectionHeader onClick={() => toggleSection('sumario')}>
          Sumário
        </SectionHeader>
        <SectionContent>
          <p>
            Esta inspeção foi realizada em{' '}
            {windData?.createdAt?.toDate?.().toLocaleString?.() ||
              'data desconhecida'}
            .
          </p>
          <p>
            Foram avaliadas {total} turbinas. Abaixo, seguem os gráficos e dados
            técnicos da operação.
          </p>
        </SectionContent>
      </SectionContainer>

      <ChartGrid>
        <SectionContainer>
          <SectionHeader onClick={() => toggleSection('resumoTurbinas')}>
            Resumo das Condições das Turbinas
          </SectionHeader>
          <SectionContent>
            <ResponsiveContainer width="100%" height={340}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Com falhas', value: falhas },
                    {
                      name: 'Sem falha conhecida',
                      value: inspecionadas - falhas,
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  <Cell fill="#ef4444" /> {/* Vermelho para falhas */}
                  <Cell fill="#3b82f6" /> {/* Azul para saudáveis */}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </SectionContent>
        </SectionContainer>

        <SectionContainer>
          <SectionHeader onClick={() => toggleSection('graficoUptime')}>
            Gráfico: Disponibilidade (%)
          </SectionHeader>
          <SectionContent>
            <ResponsiveContainer width="100%" height={340}>
              <LineChart
                data={turbines.map((t: any) => ({
                  name: t.name || t.id,
                  uptime: t?.metadata?.uptime_percent ?? 0,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[90, 100]} unit="%" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="uptime"
                  stroke="#a78bfa"
                  name="Disponibilidade"
                />
              </LineChart>
            </ResponsiveContainer>
          </SectionContent>
        </SectionContainer>
      </ChartGrid>

      <ChartGrid>
        <SectionContainer>
          <SectionHeader onClick={() => toggleSection('graficoVibracao')}>
            Gráfico: Vibração por Torre
          </SectionHeader>
          <SectionContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={turbines.map((t: any) => ({
                  name: t.name || t.id,
                  amplitude: t?.bearing_vibration?.amplitude ?? 0,
                }))}
                style={{ backgroundColor: '#fff', color: '#000' }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', color: '#000' }}
                />
                <Legend wrapperStyle={{ color: '#000' }} />
                <Bar
                  dataKey="amplitude"
                  fill="#f87171"
                  name="Amplitude de Vibração (g)"
                />
              </BarChart>
            </ResponsiveContainer>
          </SectionContent>
        </SectionContainer>

        <SectionContainer>
          <SectionHeader onClick={() => toggleSection('graficoStress')}>
            Gráfico: Tensão Estrutural
          </SectionHeader>
          <SectionContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={turbines.map((t: any) => ({
                  name: t.name || t.id,
                  stress: t?.tower_stress_measurements?.stress ?? 0,
                }))}
                style={{ backgroundColor: '#fff', color: '#000' }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" stroke="#000" />
                <YAxis
                  stroke="#000"
                  label={{
                    value: 'MPa',
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#000',
                  }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', color: '#000' }}
                />
                <Legend wrapperStyle={{ color: '#000' }} />
                <Bar dataKey="stress" fill="#60a5fa" name="Tensão (MPa)" />
              </BarChart>
            </ResponsiveContainer>
          </SectionContent>
        </SectionContainer>
      </ChartGrid>

      <BottomNavButton position="left" onClick={handleLeftClick}>
        <img src="/img/left-arrow.png" alt="Voltar" />
      </BottomNavButton>

      <BottomNavButton position="right" onClick={handleRightClick}>
        <img src="/img/right-arrow.png" alt="Avançar" />
      </BottomNavButton>
    </RelatorioGeralContainer>
  );
};