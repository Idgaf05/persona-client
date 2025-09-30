# 🐾 Persona: Emotion-Driven Character & Scene Simulation

**Persona** is a full-stack web application that blends emotional intelligence with interactive storytelling. Users create emotionally profiled characters, simulate their reactions to narrative scenes, and discover personalized matches based on mood compatibility. Designed with playful visuals and pastel aesthetics, Persona offers a unique experience where data meets empathy.

---

## 🎯 What Is Persona?

Persona is a simulation platform where:

- Users create characters with emotional and personality traits.
- Scenes have emotional atmospheres (moods) and affect characters differently.
- The system calculates compatibility between characters and scenes.
- Users simulate battles, receive scene suggestions, and manage emotional favorites.

---

## 🛠️ Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| Frontend     | React, React Router, MUI       |
| Backend      | Node.js, Express.js            |
| Database     | MongoDB, Mongoose              |
| API Design   | RESTful                        |
| Styling      | MUI (Material UI), custom themes |
| Animation    | CSS keyframes (🫧 bubble effects) |

---

## 📦 Features

### 👤 Character Creation
- Define name, age, background, and avatar.
- Set emotional profile (anger, joy, fear, sadness, surprise).
- Personality traits based on Big Five (openness, extraversion, etc.).
- Visual sliders for emotion input.

### 🎬 Scene System
- Each scene has a mood (e.g. melancholic, playful, intense).
- Scenes carry emotional impact values.
- Scenes can “resonate” with specific character types.

### ⚔️ Battle Simulation
- Select 3 characters and 3 scenes.
- System calculates compatibility matrix.
- Finds best match permutation for maximum emotional alignment.
- Displays winners per scene and average success score.

### 🧠 Emotion Simulation
- Simulate how a character reacts to a selected scene.
- Updates emotional profile based on scene impact.
- Shows compatibility score and readiness level.

### ⭐ Favorites & Emotional Home
- Automatically assign a “home scene” based on dominant emotion.
- View all favorited scenes with mood and color.
- Navigate to scene detail pages with thematic descriptions.

### 📊 Scene List with Compatibility
- View all scenes with:
  - Emotional impact map (positive/negative effects).
  - Compatibility score with current character.
  - Story snippet and mood chip.
  - Resonance tags.

---

## 🧮 Compatibility Logic

Each scene mood has weighted emotional effects:

```js
const moodWeights = {
  playful:     { joy: 1.0, fear: -0.3 },
  tense:       { fear: 1.0, joy: -0.5 },
  melancholic: { sadness: 1.0, anger: -0.2 },
  intense:     { anger: 1.0, surprise: 0.5 },
  mystery:     { surprise: 1.0, fear: 0.3 },
  neutral:     { joy: 0.5, sadness: 0.5 }
};
```
Compatibility is calculated by multiplying character emotions with scene mood weights, then normalizing to a 0–100 score.
### 🧭 Navigation Flow
Home Page → Character Select or Create
Character Dashboard → Simulate scene, view emotional profile
Battle Arena → Select characters, simulate battle
Favorites Page → View emotional home and saved scenes
Scene Detail → Read mood description and emotional impact
Scene List → Browse all scenes with compatibility scores
```bash
├── models/
│   ├── Character.js
│   ├── Scene.js
│   ├── FavoriteScene.js
│   └── EventLog.js

├── controllers/
│   ├── characterController.js
│   ├── sceneController.js
│   ├── battleController.js
│   └── emotionController.js

├── routes/
│   ├── characterRoutes.js
│   ├── sceneRoutes.js
│   ├── battleRoutes.js
│   └── emotionRoutes.js

├── client/
│   ├── components/
│   │   ├── CharacterCard.jsx
│   │   ├── CatCelebration.jsx
│   │   ├── EmotionSimulator.jsx
│   │   ├── SceneSuggestion.jsx
│   │   └── FavoriteSceneList.jsx
│   ├── pages/
│   │   ├── CharacterCreate.jsx
│   │   ├── CharacterDashboard.jsx
│   │   ├── CharacterSelect.jsx
│   │   ├── BattlePage.jsx
│   │   ├── FavoritesPage.jsx
│   │   ├── ScenePage.jsx
│   │   ├── SceneListPage.jsx
│   │   └── CharacterDashboardWrapper.jsx
│   └── App.js
```

### 🚀 Getting Started
Backend Setup
```bash
npm install
npm run dev
```
Frontend Setup
```bash
cd client
npm install
npm start
```
Seed Scenes
```bash
node seedScenes.js
```
## 🧪 Testing Ideas
Compatibility calculation edge cases

Scene simulation with extreme emotion values

Battle permutation logic

Auto-favorite assignment accuracy

Modal editing of characters

## 💡 Design Philosophy
Persona is built around the idea that emotional data can drive meaningful interaction. Instead of static attributes, characters evolve through scenes. The UI is designed to feel soft, playful, and emotionally engaging, from bubble animations to pastel color palettes.
