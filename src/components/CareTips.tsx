import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TipsContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #a3d9ff, #ffffff);
  padding: 2rem;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  background-color: #3066be;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #357abd;
    transform: translateY(-2px);
  }
`;

const TipsContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const TipsTitle = styled.h1`
  color: #3066be;
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px #a1caff;
`;

const Tip = styled.div`
  margin-bottom: 2.5rem;
`;

const TipTitle = styled.h2`
  color: #357abd;
  font-size: 1.3rem;
  margin-bottom: 0.7rem;
`;

const TipText = styled.p`
  color: #333;
  font-size: 1.08rem;
  line-height: 1.7;
`;

const CareTips: React.FC = () => {
  const navigate = useNavigate();
  return (
    <TipsContainer>
      <BackButton onClick={() => navigate('/dashboard')}>
        ← Powrót do menu
      </BackButton>
      <TipsContent>
        <TipsTitle>Porady Opieki nad Małymi Kotkami</TipsTitle>
        <Tip>
          <TipTitle>1. Zapewnij ciepło i poczucie bezpieczeństwa</TipTitle>
          <TipText>
            Małe kotki nie potrafią jeszcze samodzielnie regulować temperatury ciała, dlatego bardzo ważne jest, aby zapewnić im odpowiednio ciepłe i miękkie miejsce do spania. Najlepiej sprawdzi się kocyk lub specjalne legowisko ustawione z dala od przeciągów. W pierwszych tygodniach życia kocięta potrzebują także bliskości – jeśli nie mają mamy, możesz użyć termoforu owiniętego w ręcznik, by imitować ciepło ciała.
          </TipText>
        </Tip>
        <Tip>
          <TipTitle>2. Karmienie i higiena</TipTitle>
          <TipText>
            Kocięta do 4. tygodnia życia powinny być karmione wyłącznie mlekiem matki lub specjalnym mlekiem zastępczym dla kociąt (nie krowim!). Karmienie odbywa się co 2-3 godziny, również w nocy. Po każdym posiłku należy delikatnie masować brzuszek i okolice odbytu wilgotnym wacikiem, aby pobudzić trawienie i wypróżnianie – to bardzo ważne, bo maluchy nie potrafią jeszcze same załatwiać swoich potrzeb.
          </TipText>
        </Tip>
      </TipsContent>
    </TipsContainer>
  );
};

export default CareTips; 