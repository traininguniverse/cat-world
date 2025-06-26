import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #a3d9ff, #ffffff);
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #3066be;
  text-shadow: 2px 2px 4px #a1caff;
  margin-bottom: 1rem;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const MenuCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h2`
  color: #3066be;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.4;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Historie Kotów",
      description: "Poznaj fascynujące historie Rudego i Szarka oraz ich przygody",
      path: "/stories"
    },
    {
      title: "Galeria Zdjęć",
      description: "Zobacz najpiękniejsze zdjęcia naszych kotów w różnych sytuacjach",
      path: "/gallery"
    },
    {
      title: "Porady Opieki",
      description: "Dowiedz się jak najlepiej dbać o swojego kota",
      path: "/care"
    },
    {
      title: "Kocie Ciekawostki",
      description: "Interesujące fakty i anegdoty ze świata kotów",
      path: "/facts"
    },
    {
      title: "Więcej kocich zabaw – animacje i gra",
      description: "Odkryj dodatkowe animacje i kocią grę!",
      external: true,
      url: "https://cat-world-2.web.app/"
    }
  ];

  return (
    <DashboardContainer>
      <Header>
        <Title>Kici World Dashboard</Title>
      </Header>
      <MenuGrid>
        {menuItems.map((item, index) => (
          <MenuCard 
            key={index}
            onClick={() => {
              if (item.external && item.url) {
                window.open(item.url, '_blank');
              } else if (item.path) {
                navigate(item.path);
              }
            }}
          >
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </MenuCard>
        ))}
      </MenuGrid>
    </DashboardContainer>
  );
};

export default Dashboard; 