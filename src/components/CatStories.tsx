import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const StoryContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #a3d9ff, #ffffff);
  padding: 2rem;
  position: relative;
`;

const StoryContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const StoryTitle = styled.h1`
  color: #3066be;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px #a1caff;
`;

const StoryMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StoryButton = styled.button<{ active: boolean }>`
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  background-color: ${props => props.active ? '#3066be' : '#e0e0e0'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#3066be' : '#d0d0d0'};
    transform: translateY(-2px);
  }
`;

const StoryText = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  text-align: justify;
  margin-bottom: 2rem;

  p {
    margin-bottom: 1.5rem;
  }
`;

const StoryImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 15px;
  margin: 2rem auto;
  display: block;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const stories = {
  garden: {
    title: "Przygoda Rudego i Szarka: Tajemniczy Ogród",
    content: (
      <>
        <p>
          Pewnego słonecznego poranka, gdy promienie słońca delikatnie muskały futerko Rudego i Szarka, 
          dwójka przyjaciół postanowiła wybrać się na swoją codzienną wyprawę. Tego dnia jednak czekała 
          ich niezwykła przygoda.
        </p>

        <p>
          Rudy, z charakterystycznym rudym futerkiem i białym brzuszkiem, był zawsze bardziej ostrożny 
          i rozważny. Jego przyjaciel Szarek, czarny jak noc z białymi skarpetkami na łapkach, był 
          przeciwieństwem - pełen energii i ciekawości świata. To właśnie Szarek pierwszy zauważył 
          dziwne drzwi w ogrodzeniu, których wcześniej nigdy nie było.
        </p>

        <p>
          "Rudy, chodź zobacz!" - zawołał Szarek, machając ogonem z podekscytowania. "Co to może być?"
          Rudy, choć początkowo sceptyczny, nie mógł oprzeć się ciekawości. Wspólnie podeszli do 
          tajemniczych drzwi, które okazały się być uchylone.
        </p>

        <p>
          Po drugiej stronie rozciągał się przepiękny ogród, jakiego nigdy wcześniej nie widzieli. 
          Wysokie drzewa tworzyły naturalne tunele, a między nimi rosły kolorowe kwiaty, których 
          zapach przyciągał motyle. W powietrzu unosił się dźwięk śpiewających ptaków.
        </p>

        <p>
          "To musi być magiczne miejsce!" - szepnął Rudy, a jego oczy rozszerzyły się ze zdumienia. 
          Szarek już biegł w głąb ogrodu, skacząc między kwiatami i łapiąc motyle. Rudy, choć 
          początkowo nieśmiały, powoli dał się ponieść radości odkrywania.
        </p>

        <p>
          W ogrodzie spotkali innych kotów, którzy opowiedzieli im historię tego miejsca. Okazało się, 
          że jest to sekretny ogród, do którego dostęp mają tylko wybrane koty - te, które mają 
          szczególną więź z naturą i potrafią docenić jej piękno.
        </p>

        <p>
          Od tego dnia Rudy i Szarek stali się strażnikami magicznego ogrodu. Każdego ranka 
          sprawdzali, czy wszystko jest w porządku, pomagali młodszym kotom odkrywać jego 
          tajemnice i dbali o to, by miejsce to pozostało bezpiecznym schronieniem dla wszystkich 
          kotów w okolicy.
        </p>

        <p>
          A gdy wieczorem wracali do domu, ich serca były pełne radości i satysfakcji z kolejnego 
          dnia pełnego przygód. Bo przecież prawdziwa przyjaźń i wspólne odkrywanie świata to 
          największe skarby, jakie mogą spotkać dwa kocie serca.
        </p>
      </>
    ),
    image: "/images/Sennik kotów nad nocnym niebem.png"
  },
  stars: {
    title: "Przygoda Rudego i Szarka: Gwiaździsta Noc",
    content: (
      <>
        <p>
          Była to szczególna noc - najjaśniejsza noc w roku, gdy gwiazdy spadają z nieba. Rudy i Szarek 
          siedzieli na swoim ulubionym parapecie, obserwując rozgwieżdżone niebo. Nagle, jedna z gwiazd 
          oderwała się od firmamentu i zaczęła spadać w kierunku ich ogrodu.
        </p>

        <p>
          "Musimy ją złapać!" - zawołał Szarek, już gotowy do skoku. Rudy, choć zwykle bardziej 
          ostrożny, tym razem nie wahał się ani chwili. Wiedział, że spadająca gwiazda to 
          niezwykła okazja, która może przynieść szczęście.
        </p>

        <p>
          Biegli przez ogród, skacząc przez krzewy i kwiaty, śledząc świetlisty ślad gwiazdy. 
          Gdy w końcu dotarli do miejsca, gdzie gwiazda upadła, zobaczyli mały, świecący kamień, 
          który delikatnie pulsował niebieskim światłem.
        </p>

        <p>
          "To musi być magiczna gwiazda!" - szepnął Rudy, a jego oczy odbijały niebieski blask. 
          Szarek ostrożnie podszedł do kamienia i delikatnie dotknął go łapką. W tej samej chwili 
          kamień rozbłysł jaśniej, a wokół nich pojawiły się setki małych, świecących motyli.
        </p>

        <p>
          Motyle zaczęły tańczyć w powietrzu, tworząc przepiękne wzory i figury. Rudy i Szarek 
          siedzieli zachwyceni, obserwując ten niezwykły spektakl. Nagle jeden z motyli usiadł 
          na nosie Rudego, a drugi na uchu Szarka, i wtedy koty usłyszały cichy, melodyjny głos.
        </p>

        <p>
          "Jesteście wyjątkowymi kotami" - szeptał głos. "Wasza przyjaźń i odwaga sprawiły, że 
          gwiazda wybrała was na swoich opiekunów. Od teraz, każdej nocy, gdy spojrzycie w niebo, 
          będziecie widzieć więcej gwiazd niż inni, a wasze sny będą pełne magicznych przygód."
        </p>

        <p>
          Od tamtej nocy Rudy i Szarek stali się strażnikami nie tylko ogrodu, ale i nocnego nieba. 
          Każdego wieczoru siadali na parapecie, obserwując gwiazdy i opowiadając sobie historie o 
          swoich snach. A magiczny kamień, który znaleźli, świecił delikatnie w ich legowisku, 
          przypominając o tej niezwykłej przygodzie.
        </p>

        <p>
          I tak oto, dzięki spadającej gwieździe, ich przyjaźń stała się jeszcze silniejsza, a ich 
          życie wypełniło się magią i cudem. Bo przecież prawdziwa magia tkwi w przyjaźni i 
          umiejętności dostrzegania cudów w zwykłych rzeczach.
        </p>
      </>
    ),
    image: "/images/Sennik kotów nad nocnym niebem.png"
  },
  planetx: {
    title: "PlanetX – pierwsze kroki w nowym świecie",
    content: (
      <>
        <p>
          Rudy spojrzał w bezkresną przestrzeń przed sobą. Planeta była piękna, ale groźna – nie miała 
          jeszcze przyciągania ziemskiego. Krople wody fruwały w powietrzu niczym małe, świecące kulki, 
          a każdy oddech wymagał maski.
        </p>

        <p>
          — Szarku, jeśli nie znajdziemy sposobu na grawitację, będziemy się tu bujać jak w kosmicznym 
          oceanarium! — mruknął Rudy, próbując złapać wirującą kroplę wody.
        </p>

        <p>
          Szarek spojrzał w dal i zauważył dziwne błyski na horyzoncie.
          — Rudy… tam, przy tych skałach, coś się rusza. To chyba… lokalni mieszkańcy PlanetyX?
        </p>

        <p>
          Nagle przed nimi pojawiły się postacie – niewielcy kosmici, przypominający… koty w hełmach 
          kosmicznych! 😺👽
          — Witajcie na PlanetX — powiedział jeden z nich. — Widzę, że nie macie jeszcze grawitacji 
          ani źródeł wody. Może pomożemy wam przetrwać… jeśli obiecacie, że nie zrzucicie na nas 
          żadnej próbki ziemskiego sera.
        </p>

        <p>
          Rudy i Szarek spojrzeli po sobie i kiwnęli głowami.
          — Umowa stoi — odpowiedział Rudy. — Ale najpierw musimy poradzić sobie z „próżniową 
          samotnością" — tym dziwnym uczuciem, które sprawia, że czujemy się mali wobec całego kosmosu.
        </p>

        <p>
          I tak zaczęła się ich pierwsza misja: połączyć ludzką wiedzę i kosmiczne umiejętności 
          kotopodobnych mieszkańców, aby stworzyć PlanetX, gdzie życie mogłoby naprawdę zakwitnąć.
        </p>
      </>
    ),
    images: [
      "/images/Dwa_koty_na_obcej_planecie.png",
      "/images/Koty_na_obcej_planecie_w_kosmosie.png"
    ]
  }
};

const CatStories: React.FC = () => {
  const [activeStory, setActiveStory] = useState<'garden' | 'stars' | 'planetx'>('garden');
  const navigate = useNavigate();

  return (
    <StoryContainer>
      <BackButton onClick={() => navigate('/dashboard')}>
        ← Powrót do menu
      </BackButton>
      <StoryContent>
        <StoryTitle>{stories[activeStory].title}</StoryTitle>
        
        <StoryMenu>
          <StoryButton 
            active={activeStory === 'garden'} 
            onClick={() => setActiveStory('garden')}
          >
            Tajemniczy Ogród
          </StoryButton>
          <StoryButton 
            active={activeStory === 'stars'} 
            onClick={() => setActiveStory('stars')}
          >
            Gwiaździsta Noc
          </StoryButton>
          <StoryButton 
            active={activeStory === 'planetx'} 
            onClick={() => setActiveStory('planetx')}
          >
            PlanetX
          </StoryButton>
        </StoryMenu>

        <StoryText>
          {stories[activeStory].content}
        </StoryText>

        {activeStory === 'planetx' ? (
          <>
            <StoryImage 
              src={stories[activeStory].images[0]}
              alt={stories[activeStory].title}
            />
            <StoryImage 
              src={stories[activeStory].images[1]}
              alt={stories[activeStory].title}
            />
          </>
        ) : (
          <StoryImage 
            src={stories[activeStory].image}
            alt={stories[activeStory].title}
          />
        )}
      </StoryContent>
    </StoryContainer>
  );
};

export default CatStories; 