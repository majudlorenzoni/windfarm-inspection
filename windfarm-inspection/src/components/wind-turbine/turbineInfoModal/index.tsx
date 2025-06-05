import React from 'react'
import * as THREE from 'three'
import { TurbineInfoModalContainer } from './styles'

type TurbineInfoModalProps = {
  turbine: THREE.Object3D
  onClose: () => void
  isOpen: boolean
}

export default function TurbineInfoModal({ turbine, onClose, isOpen }: TurbineInfoModalProps) {
  const { name, userData } = turbine

  if (!userData) {
    return (
      <div>
        <button onClick={onClose}>Fechar</button>
        <p>Sem dados disponíveis para essa turbina.</p>
      </div>
    );
  }

  const latestScada = userData.scada_data?.[userData.scada_data.length - 1];

  return (
    <TurbineInfoModalContainer isOpen={isOpen}>
      <img 
      src="../../../../public/img/close.png" 
      className="close-btn" 
      onClick={onClose} 
      />
      <h2>{name || userData.id || 'Turbina sem nome'}</h2>
    
      <section>
        <h3>Último dado SCADA</h3>
        {latestScada ? (
          <ul>
            <li>Timestamp: {new Date(latestScada.timestamp).toLocaleString()}</li>
            <li>Velocidade do vento: {latestScada.wind_speed} m/s</li>
            <li>Produção de energia: {latestScada.power_output} kW</li>
            <li>Direção da nacelle: {latestScada.nacelle_direction}°</li>
            <li>Velocidade do rotor: {latestScada.rotor_speed} rpm</li>
            <li>Temperatura ambiente: {latestScada.ambient_temperature} °C</li>
            <li>Temperatura do gerador: {latestScada.generator_temperature} °C</li>
          </ul>
        ) : (
          <p>Dados SCADA indisponíveis.</p>
        )}
      </section>

      <section>
        <h3>Metadados</h3>
        <ul>
          <li>Uptime: {userData.metadata?.uptime_percent ?? 'N/A'}%</li>
          <li>Energia total: {userData.metadata?.energy_total_mwh ?? 'N/A'} MWh</li>
          <li>Fator de capacidade: {userData.metadata?.capacity_factor ?? 'N/A'}</li>
          <li>Horas equivalentes de operação (FLH): {userData.metadata?.flh ?? 'N/A'}</li>
        </ul>
      </section>

      <section>
        <h3>Eventos recentes</h3>
        {userData.logs?.length ? (
          <ul>
            {userData.logs.map((log: any, idx: number) => (
              <li key={idx}>
                [{new Date(log.timestamp).toLocaleDateString()}] {log.event}
              </li>
            ))}
          </ul>
        ) : (
          <p>Sem eventos registrados.</p>
        )}
      </section>

      <section>
        <h3>Anotações do proprietário</h3>
        {userData.annotations?.owner?.length ? (
          <ul>
            {userData.annotations.owner.map((note: any, idx: number) => (
              <li key={idx}>
                [{new Date(note.timestamp).toLocaleDateString()}] {note.note}
              </li>
            ))}
          </ul>
        ) : (
          <p>Sem anotações.</p>
        )}
      </section>

      <section>
        <h3>Últimas manutenções</h3>
        {userData.maintenance_log?.length ? (
          <ul>
            {userData.maintenance_log.map((item: any, idx: number) => (
              <li key={idx}>
                [{item.date}] {item.description} - <em>{item.technician}</em>
              </li>
            ))}
          </ul>
        ) : (
          <p>Sem registros de manutenção.</p>
        )}
      </section>
  </TurbineInfoModalContainer>
  )
}
