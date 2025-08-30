# 🐾 Kici World

**Demo online:** [https://kici-world.web.app/](https://kici-world.web.app/)

**Kici World** to nowoczesna, responsywna aplikacja webowa poświęcona kotom Rudy i Szarek. Projekt łączy elementy bajkowe, edukacyjne i praktyczne, prezentując historie, galerię zdjęć, porady opieki oraz ciekawostki o kotach.

---

## 🛠️ Technologie

- **React** (TypeScript) – główny framework do budowy interfejsu użytkownika
- **React Router** – obsługa routingu SPA
- **Styled-components** – stylowanie komponentów w JS/TS
- **Firebase Hosting** – hosting statyczny aplikacji
- **Node.js & npm** – zarządzanie zależnościami i skryptami

---

## 📦 Struktura projektu

```
├── public/           # pliki statyczne (w tym zdjęcia do galerii)
│   └── images/       # obrazy do historii i galerii
│       ├── Dwa_koty_na_obcej_planecie.png    # nowy obraz PlanetX
│       ├── Koty_na_obcej_planecie_w_kosmosie.png  # nowy obraz PlanetX
│       └── ...       # pozostałe obrazy
├── src/
│   ├── components/   # komponenty React (Dashboard, Galeria, Historie, Porady, Ciekawostki)
│   │   └── CatStories.tsx  # komponent z nową historią PlanetX
│   ├── App.tsx       # główny komponent z routingiem
│   └── ...
├── firebase.json     # konfiguracja Firebase Hosting (rewrites dla SPA)
├── package.json      # zależności i skrypty
└── README.md         # dokumentacja
```


## 🚀 Jak uruchomić lokalnie

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/traininguniverse/cat-world.git
   cd cat-world   
   ```
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Uruchom aplikację:
   ```bash
   npm start
   ```
   Strona będzie dostępna pod [http://localhost:3000](http://localhost:3000)

---

## 🌐 Wdrażanie na Firebase Hosting

1. Zbuduj aplikację:
   ```bash
   npm run build
   ```
2. Wdróż na Firebase:
   ```bash
   firebase deploy
   ```

**Aplikacja jest dostępna pod adresem:** [https://kici-world.web.app/](https://kici-world.web.app/)

---

## ✨ Funkcjonalności

- **Strona główna** – powitanie i rozpoczęcie przygody
- **Dashboard** – menu główne z sekcjami:
  - **Historie Kotów** – bajkowe opowieści o Rudym i Szarku:
    - "Przygoda Rudego i Szarka: Tajemniczy Ogród" – magiczna przygoda w sekretnym ogrodzie
    - "Przygoda Rudego i Szarka: Gwiaździsta Noc" – kosmiczna przygoda ze spadającą gwiazdą
    - "PlanetX – pierwsze kroki w nowym świecie" – kosmiczna misja na obcej planecie z kotopodobnymi kosmitami
  - **Galeria** – slider ze zdjęciami kotków
  - **Porady Opieki** – praktyczne wskazówki dla opiekunów małych kotów
  - **Kocie Ciekawostki** – interesujące fakty i anegdoty

---

## 🆕 Najnowsze aktualizacje

### v1.1.0 - Kosmiczna przygoda PlanetX
- **Nowa historia**: "PlanetX – pierwsze kroki w nowym świecie"
  - Kosmiczna przygoda Rudego i Szarka na obcej planecie
  - Spotkanie z kotopodobnymi kosmitami w hełmach kosmicznych
  - Dwa nowe obrazy: koty na obcej planecie i w kosmosie
- **Ulepszenia techniczne**:
  - Obsługa wielu obrazków w jednej historii
  - Lepsze zarządzanie stanem komponentów
  - Zoptymalizowane wdrażanie na Firebase

---

## 👨‍💻 Architektura i podejście

- Każda sekcja to osobny, wydzielony komponent React
- Routing oparty o React Router (`/dashboard`, `/gallery`, `/stories`, `/care`, `/facts`)
- Stylowanie komponentów z użyciem styled-components (CSS-in-JS)
- Obsługa SPA na Firebase Hosting dzięki rewrite do `index.html`
- Kod zgodny z TypeScript (typowanie propsów, komponentów)
- Prosta, czytelna struktura katalogów

---

## 🖼️ Zrzuty ekranu

Poniżej przykładowe widoki aplikacji:

### Strona główna
![Strona główna](screenshots/main_screen.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Historie Kotów
![Historia 1](screenshots/story1.png)
![Historia 2](screenshots/story2.png)

**Nowa historia PlanetX:**
- Obrazek 1: Dwa koty na obcej planecie
- Obrazek 2: Koty w kosmosie z hełmami kosmicznymi

### Galeria (slider)
![Galeria 1](screenshots/gallery1.png)
![Galeria 2](screenshots/gallery2.png)
![Galeria 3](screenshots/gallery3.png)
![Galeria 4](screenshots/gallery4.png)

### Porady Opieki
![Porady Opieki](screenshots/advices.png)

### Kocie Ciekawostki
![Kocie Ciekawostki](screenshots/cat_curiosities.png)

---

## 👥 Autorzy

- Training Universe (pomysł, kod, zdjęcia kotków)
- Rudy & Szarek (inspiracja, modele do zdjęć)

---

## 📄 Licencja

Projekt udostępniony na licencji Creative Commons Uznanie autorstwa-Użycie niekomercyjne 4.0 Międzynarodowa (CC BY-NC 4.0).
Szczegóły: https://creativecommons.org/licenses/by-nc/4.0/deed.pl

You are free to:
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material

Under the following terms:
- Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- NonCommercial — You may not use the material for commercial purposes.

No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

---

**Miłego korzystania!** 