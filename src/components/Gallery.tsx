import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const GalleryContainer = styled.div`
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

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 4rem auto 0 auto;
  max-width: 500px;
`;

const SliderImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 1.5rem;
  transition: box-shadow 0.3s, transform 0.3s;
`;

const ImageTitle = styled.div`
  font-size: 1.2rem;
  color: #3066be;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const NavButton = styled.button`
  background: #3066be;
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #357abd;
    transform: scale(1.08);
  }
`;

const images = [
  {
    src: '/images/wypoczynek.jpeg',
    title: 'Wypoczynek',
  },
  {
    src: '/images/z_kocykiem_2.png',
    title: 'Z kocykiem 2',
  },
  {
    src: '/images/z_kocykiem.jpeg',
    title: 'Z kocykiem',
  },
  {
    src: '/images/zabawa.jpeg',
    title: 'Zabawa',
  },
];

const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const prevImage = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <GalleryContainer>
      <BackButton onClick={() => navigate('/dashboard')}>
        ← Powrót do menu
      </BackButton>
      <h1 style={{ textAlign: 'center', color: '#3066be', marginTop: '2rem', textShadow: '2px 2px 4px #a1caff' }}>
        Galeria Kotków
      </h1>
      <SliderWrapper>
        <NavButtons>
          <NavButton onClick={prevImage} aria-label="Poprzednie zdjęcie">&#8592;</NavButton>
          <NavButton onClick={nextImage} aria-label="Następne zdjęcie">&#8594;</NavButton>
        </NavButtons>
        <SliderImage src={images[current].src} alt={images[current].title} />
        <ImageTitle>{images[current].title}</ImageTitle>
      </SliderWrapper>
    </GalleryContainer>
  );
};

export default Gallery; 