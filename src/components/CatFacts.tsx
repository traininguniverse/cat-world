import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FactsContainer = styled.div`
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

const FactsContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const FactsTitle = styled.h1`
  color: #3066be;
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px #a1caff;
`;

const Fact = styled.div`
  margin-bottom: 2.5rem;
`;

const FactTitle = styled.h2`
  color: #357abd;
  font-size: 1.3rem;
  margin-bottom: 0.7rem;
`;

const FactText = styled.p`
  color: #333;
  font-size: 1.08rem;
  line-height: 1.7;
`;

const CatFacts: React.FC = () => {
  const navigate = useNavigate();
  return (
    <FactsContainer>
      <BackButton onClick={() => navigate('/dashboard')}>
        ← Powrót do menu
      </BackButton>
      <FactsContent>
        <FactsTitle>Kocie Ciekawostki</FactsTitle>
        <Fact>
          <FactTitle>Fakt: Kocie mruczenie leczy!</FactTitle>
          <FactText>
            Czy wiesz, że mruczenie kotów ma właściwości lecznicze? Badania wykazały, że dźwięki o częstotliwości 25-150 Hz, które wydają koty podczas mruczenia, mogą przyspieszać gojenie się kości i tkanek, a także działać uspokajająco na ludzi. Dlatego obecność kota w domu to nie tylko radość, ale i zdrowie!
          </FactText>
        </Fact>
        <Fact>
          <FactTitle>Anegdota: Koci złodziej skarpetek</FactTitle>
          <FactText>
            Pewien kot o imieniu Filemon miał nietypowe hobby – uwielbiał kraść skarpetki swoim domownikom. Każdego ranka właściciele znajdowali w swoim łóżku nową kolekcję skarpetek, które Filemon skrupulatnie znosił przez całą noc. Nikt nie wiedział, po co mu te skarpetki, ale wszyscy zgodnie twierdzili, że Filemon był najszczęśliwszy, gdy mógł spać wśród swojego kolorowego łupu!
          </FactText>
        </Fact>
      </FactsContent>
    </FactsContainer>
  );
};

export default CatFacts; 