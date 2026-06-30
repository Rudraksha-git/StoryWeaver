# 🌍 StoryWeaver  
### Preserving Oral Histories & Dialects with Generative AI

StoryWeaver is a **full-stack web application** built with **Next.js, Tailwind CSS, Firebase**, and **Google Generative AI** that preserves **dying local dialects and oral histories** by transforming spoken stories into **translated, culturally explained, searchable digital archives**.

> 🧵 *“When languages fade, stories shouldn’t.”*

## [StoryWeaver](https://story-weaver-szm.vercel.app/)

---

## 📌 Table of Contents
- Problem Statement  
- Solution Overview  
- Key Features  
- Tech Stack  
- System Architecture  
- Application Workflow  
- Project Structure  
- Database Design  
- AI & Prompting Strategy  
- Privacy & Ethics  
- Installation & Setup  
- Future Scope  

---

## ❗ Problem Statement

Many regional dialects and folk traditions exist only in **spoken form**, passed down orally through elders.  
Due to globalization, migration, and lack of documentation, these voices are disappearing rapidly.

Current tools:
- Translate words, **not cultural meaning**
- Ignore idioms, emotions, and traditions
- Do not preserve oral storytelling

Once these voices are lost, **cultural heritage disappears forever**.

---

## 💡 Solution Overview

StoryWeaver provides a **simple and inclusive platform** where users can:

1. Record stories in their native dialect
2. Convert speech to text using AI
3. Translate dialects into English/Hindi
4. Generate cultural explanations & summaries
5. Store stories in a searchable digital archive

The result is a **living, community-driven cultural library**.

---

## ✨ Key Features

- 🎙️ **Browser-based Audio Recording**
- 📝 **Dialect Speech-to-Text Transcription**
- 🌐 **Context-Aware Translation**
- 🧠 **Cultural & Idiom Explanation (Gemini AI)**
- 📚 **Searchable Story Archive**
- 🎨 **Clean UI with Tailwind CSS**
- 🔒 **Secure Storage with Firebase**

---

## 🎨 UI / UX Design (Figma)

The complete UI/UX design for **StoryWeaver** was created in Figma, covering the landing page, story recording flow, story listing, and story detail views.

🔗 **Figma Design Link:**
[https://www.figma.com/site/9tkTPJB1tNUSHE4NiuDfLB/StoryWeaver?node-id=0-1&p=f&t=GmS7S0ZUQFqYGbKh-0](https://www.figma.com/site/9tkTPJB1tNUSHE4NiuDfLB/StoryWeaver?node-id=0-1&p=f&t=GmS7S0ZUQFqYGbKh-0)

The design emphasizes:

* Accessibility for non-technical users
* Clean, minimal storytelling-focused layouts
* Mobile-first and responsive components
* Intuitive navigation for browsing cultural archives

---

## 🛠️ Tech Stack

### Frontend
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- Web Audio API

### Backend
- **Next.js API Routes** (no separate server)

### Database & Storage
- **Firebase Firestore** – story metadata & text
- **Firebase Cloud Storage** – audio files

### AI & Cloud Services
- **Google Cloud Speech-to-Text API (v2)**
- **Gemini 1.5 Pro (Vertex AI)**

---

## 🏗️ System Architecture

```

User (Browser)
↓
Next.js Frontend (React + Tailwind)
↓
Next.js API Routes
├── Firebase Storage (Audio Files)
├── Firestore (Story Data)
├── Speech-to-Text API
└── Gemini AI (Translation + Cultural Context)

```

---

## 🔁 Application Workflow

1. User records a story via the browser
2. Audio is uploaded to the backend
3. Audio is stored in Firebase Cloud Storage
4. Speech-to-Text converts dialect speech to text
5. Gemini AI:
   - Translates the story
   - Explains idioms & traditions
   - Generates a summary
6. Processed data is saved in Firestore
7. Story becomes searchable and viewable

---

## 📁 Project Structure

```

storyweaver/
├── app/
│   ├── api/                     # Backend (Next.js API routes)
│   │   ├── upload/
│   │   │   └── route.js         # Upload audio + AI processing
│   │   │
│   │   ├── stories/
│   │   │   └── route.js         # Get all stories
│   │   │
│   │   └── story/
│   │       └── [id]/
│   │           └── route.js     # Get single story
│   │
│   ├── record/
│   │   └── page.js              # Record story page
│   │
│   ├── stories/
│   │   ├── page.js              # Stories list page
│   │   └── [id]/
│   │       └── page.js          # Story details page
│   │
│   ├── layout.js                # Root layout (Navbar, Tailwind)
│   ├── page.js                  # Home / landing page
│   └── globals.css              # Tailwind base styles
│
├── components/
│   ├── ui/                      # Reusable Tailwind UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Badge.jsx
│   │
│   ├── AudioRecorder.jsx        # Mic recording logic + UI
│   ├── StoryCard.jsx            # Story preview card
│   ├── StoryPlayer.jsx          # Audio playback
│   ├── Navbar.jsx               # Top navigation bar
│   └── Loader.jsx               # Loading spinner
│
├── lib/                         # Core logic & integrations
│   ├── firebase.js              # Firebase initialization
│   ├── firestore.js             # Firestore CRUD helpers
│   ├── storage.js               # Firebase Storage helpers
│   ├── speechToText.js          # Google Speech-to-Text logic
│   └── gemini.js                # Gemini AI logic
│
├── hooks/
│   └── useRecorder.js           # Custom audio recording hook
│
├── public/
│   └── logo.png                 # Static assets
│
├── .env.local                   # Environment variables
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── package.json
└── README.md

```

---

## 🗄️ Database Design (Firestore)

**Collection: `stories`**

| Field | Type | Description |
|-----|-----|-------------|
| title | string | Story title |
| dialectText | string | Original transcription |
| translatedText | string | English/Hindi translation |
| culturalNotes | string | Cultural explanations |
| summary | string | AI-generated summary |
| region | string | Region of origin |
| language | string | Dialect/language |
| audioUrl | string | Firebase Storage URL |
| createdAt | timestamp | Upload time |

---

## 🧠 AI & Prompting Strategy

Gemini is used for **reasoning, not just translation**.

**Prompt Example:**
```

You are a cultural linguist and historian.
Translate the following dialect story into English.
Preserve emotional tone.
Explain idioms, traditions, and cultural references.
Provide a short summary.

````

This enables **meaning-preserving translations**, not literal ones.

---

## 🔐 Privacy & Ethical Considerations

- Explicit consent before recording
- Option to keep stories private
- No biometric identification
- Secure cloud storage
- Community ownership of content

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- Firebase Project
- Google Cloud Project with:
  - Speech-to-Text API enabled
  - Vertex AI (Gemini) enabled

---

### Clone & Install

```
git clone https://github.com/Diksha8-db/StoryWeaver.git
npm install
npm run dev
```
---

### Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
GOOGLE_APPLICATION_CREDENTIALS=
GEMINI_API_KEY=
```

---

## 🌱 Future Scope

* Offline-first PWA support
* Mobile app version
* School curriculum integration
* Dialect learning modules
* Government cultural archives
* Multi-language subtitles

---

## 🏆 Why StoryWeaver Stands Out

* Real-world social impact
* Strong Generative AI integration
* Clean full-stack architecture
* Easy live demonstration
* Scalable and inclusive design

---
## 📌 Tagline

**StoryWeaver — Preserving voices, one story at a time.**

---

