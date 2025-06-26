import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { LearnMoreContainer } from './styles';

export const LearnMore: React.FC = () => {
    return (
    <LearnMoreContainer>
      <div className="learnmore-title">
        <h1>WindVision</h1>
      </div>

      <div className="learnmore-box">
        O WindVision é uma plataforma interativa desenvolvida para auxiliar na inspeção
        remota de turbinas eólicas. Combinando tecnologias modernas de visualização 3D,
        gráficos dinâmicos e painéis informativos, o WindVision oferece uma visão
        completa e intuitiva do parque eólico.
        <br />
        <br />
        A proposta da ferramenta é facilitar o trabalho de engenheiros, técnicos e
        gestores na análise do estado operacional das turbinas, permitindo que decisões
        sejam tomadas com mais agilidade e precisão.
      </div>
    </LearnMoreContainer>
  )
}