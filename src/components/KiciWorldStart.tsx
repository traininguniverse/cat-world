import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 100vh;
  background: linear-gradient(to bottom, #a3d9ff, #ffffff);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 0.5rem;
  color: #3066be;
  text-shadow: 2px 2px 4px #a1caff;
`;

const MainImage = styled.img`
  width: 300px;
  height: auto;
  margin: 1rem 0;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-style: italic;
`;

const Button = styled.button`
  background-color: #4a90e2;
  border: none;
  color: white;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(74, 144, 226, 0.5);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357abd;
  }
`;

const KiciWorldStart: React.FC = () => {
  const navigate = useNavigate();

  const startAdventure = () => {
    navigate('/dashboard');
  };

  return (
    <Container>
      <Title>Kici World</Title>
      <MainImage src="/images/Sennik kotów nad nocnym niebem.png" alt="Koty nad nocnym niebem" />
      <Subtitle>Magiczna kraina Rudego i Szarka</Subtitle>
      <Button onClick={startAdventure}>
        Rozpocznij przygodę
      </Button>
    </Container>
  );
};

export default KiciWorldStart; 