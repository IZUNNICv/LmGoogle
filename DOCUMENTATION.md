# Print Editor - Documentazione Tecnica e Funzionale

## 📋 Indice

1. [Panoramica Generale](#panoramica-generale)
2. [Architettura del Sistema](#architettura-del-sistema)
3. [Struttura del Progetto](#struttura-del-progetto)
4. [Tecnologie Utilizzate](#tecnologie-utilizzate)
5. [Funzionalità Principali](#funzionalità-principali)
6. [Componenti Chiave](#componenti-chiave)
7. [Hooks Personalizzati](#hooks-personalizzati)
8. [Sistema di Autenticazione](#sistema-di-autenticazione)
9. [Gestione Dati](#gestione-dati)
10. [Editor PDF](#editor-pdf)
11. [Configurazione e Deploy](#configurazione-e-deploy)
12. [API Reference](#api-reference)

---

## 📖 Panoramica Generale

**Print Editor** è un'applicazione web React per la gestione e creazione di template di stampa PDF. L'applicazione permette agli utenti di creare, modificare e gestire progetti di stampa attraverso un'interfaccia drag-and-drop intuitiva.

### Caratteristiche Principali

- Editor PDF visuale con drag-and-drop
- Gestione progetti di stampa
- Sistema di autenticazione integrato
- PWA (Progressive Web App) con notifiche push
- Interfaccia responsive e mobile-friendly
- Integrazione con API backend personalizzate

---

## 🏗️ Architettura del Sistema

### Architettura Frontend

```
React 18 + Vite
├── Redux Toolkit (State Management)
├── React Router (Routing)
├── Material-UI (UI Components)
├── React DnD (Drag & Drop)
└── PWA (Service Worker)
```

### Flusso Dati

```
API Backend ↔ Custom Hooks ↔ Redux Store ↔ React Components
```

---

## 📁 Struttura del Progetto

```
src/
├── components/          # Componenti React riutilizzabili
│   ├── Dashboard/      # Componenti dashboard
│   ├── GeneraPdf/      # Componenti editor PDF
│   └── Progetti/       # Componenti gestione progetti
├── hooks/              # Custom hooks
├── layout/             # Layout principali
├── pages/              # Pagine dell'applicazione
│   ├── auth/          # Pagine autenticazione
│   └── protected/     # Pagine protette
├── routes/             # Configurazione routing
├── store/              # Redux store e slices
├── utility/            # Utility e helper functions
└── main.jsx           # Entry point applicazione
```

---

## 🛠️ Tecnologie Utilizzate

### Core Technologies

- **React 18** - Framework JavaScript
- **Vite** - Build tool e dev server
- **Material-UI (MUI)** - Component library
- **React Router** - Client-side routing
- **Redux Toolkit** - State management

### Drag & Drop

- **React DnD** - Drag and drop functionality
- **React Draggable** - Elementi trascinabili
- **React RnD** - Resize and drag

### PWA & Service Worker

- **Vite PWA Plugin** - PWA configuration
- **Service Worker** - Background sync e notifiche

### Development Tools

- **ESLint** - Code linting
- **Terser** - Code minification

---

## ⚙️ Funzionalità Principali

### 1. Gestione Progetti

- Visualizzazione elenco progetti in DataGrid
- Creazione nuovi progetti
- Eliminazione progetti
- Filtri e ricerca

### 2. Editor PDF Visuale

- Canvas interattivo per design PDF
- Drag & drop di componenti
- Ridimensionamento elementi
- Gestione multipagina
- Copia elementi tra pagine

### 3. Sistema Autenticazione

- Login con token JWT
- Gestione sessioni
- Route protette
- Persistenza stato utente

### 4. PWA Features

- Installabile come app
- Notifiche push
- Funzionamento offline
- Aggiornamenti automatici

---

## 🧩 Componenti Chiave

### Layout Components

#### [`Layout.jsx`](src/layout/Layout.jsx)

Componente layout principale che gestisce:

- Header con navigazione
- Menu laterale compatto
- Area contenuto principale
- Footer condizionale

```jsx
const Layout = ({ label, children }) => {
  // Gestione menu, header e contenuto
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Header, Menu, Content */}
    </Box>
  );
};
```

### Dashboard Components

#### [`BodyMenuDash.jsx`](src/components/Dashboard/BodyMenuDash.jsx)

Gestisce il menu principale della dashboard con:

- Raggruppamento moduli per ambito
- Icone dinamiche
- Navigation responsive

### Editor PDF Components

#### [`PdfEditorIDE`](src/components/GeneraPdf/editorPdf.jsx)

Editor principale per la creazione di PDF:

**Funzionalità:**

- Gestione componenti drag-and-drop
- Sistema multipagina
- Modifica proprietà elementi
- Preview real-time

**Props principali:**

```jsx
{
  tab: number,           // Pagina corrente
  orientation: string,   // portrait/landscape
  zoom: number,         // Livello zoom
  pageCount: number     // Numero pagine
}
```

#### [`CanvasEditor`](src/components/GeneraPdf/CanvasEditor.jsx)

Canvas per il design dei PDF:

- Area di lavoro A4 (portrait/landscape)
- Drop zone per elementi
- Preview posizionamento
- Gestione eventi drag

#### [`MovableElemento`](src/components/GeneraPdf/MovableElemento.jsx)

Elemento trascinabile nel canvas:

- Ridimensionamento con `react-rnd`
- Context menu per azioni
- Copia multipagina
- Modifica proprietà

### Progetti Components

#### [`ElementiComponenti`](src/components/Progetti/ElementiComponenti.jsx)

Pannello elementi disponibili:

- Caricamento componenti da API
- Classificazione singoli/composti
- Drag source per editor

#### [`CustomComponent`](src/components/Progetti/CustomComponent.jsx)

Modal per modifica proprietà elementi:

- Form dinamico per proprietà
- Preview real-time
- Validazione input

---

## 🪝 Hooks Personalizzati

### [`useProgetti`](src/hooks/useProgetti.jsx)

Hook per gestione progetti:

**Funzionalità:**

- Caricamento dati progetti
- Configurazione colonne DataGrid
- Gestione modal e azioni
- Event listeners per refresh

**Return values:**

```jsx
{
  label: string,           // Titolo pagina
  rows: Array,            // Dati progetti
  columns: Array,         // Configurazione colonne
  loading: boolean,       // Stato caricamento
  error: string,          // Errori
  isModalOpen: boolean,   // Stato modal
  handleOpenModal: fn,    // Apri modal
  handleAddRow: fn,       // Aggiungi progetto
  getData: fn            // Refresh dati
}
```

### [`useDati`](src/hooks/useDati.js)

Hook generico per fetching dati:

**Parametri:**

```jsx
useDati(db, filtro, (pagina = 0));
```

**Funzionalità:**

- Chiamate API automatiche
- Gestione loading/error states
- Refresh manuale dati
- Cache e ottimizzazioni

### [`useModal`](src/hooks/useModal.js)

Hook per gestione modal:

- Stili consistenti
- Gestione form data
- Dirty state tracking
- Conferma chiusura

---

## 🔐 Sistema di Autenticazione

### Flusso di Login

1. **Input credenziali** in [`Login.jsx`](src/pages/auth/Login.jsx)
2. **Chiamata API** a `/api/axo_login`
3. **Salvataggio token** in localStorage
4. **Dispatch Redux** con dati utente
5. **Redirect** a `/progetti`

### Protezione Route

Le route protette utilizzano [`ProtectedRoutes.jsx`](src/routes/ProtectedRoutes.jsx):

```jsx
<Route element={<ProtectedRoutes />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/progetti" element={<Progetti />} />
</Route>
```

### Token Management

- Token JWT salvato in `localStorage`
- Invio automatico in headers API
- Refresh automatico se necessario

---

## 💾 Gestione Dati

### API Layer

Tutte le chiamate API passano attraverso [`CallFetch.jsx`](src/utility/CallFetch.jsx):

#### Funzioni Principali

**`Leggi(DB, Where, Pagina)`**

```jsx
// Lettura dati da database
const data = await Leggi("TemplatePrint", "Where Azienda='123'");
```

**`Scrivi(idobj, DB, Classe, jsonObj)`**

```jsx
// Scrittura/aggiornamento dati
await Scrivi(0, "Progetti", "SaveProgetto", formData);
```

**`Fai(Classe, Funzione, jsonParametri)`**

```jsx
// Esecuzione funzioni server
await Fai("axo_funzioni", "DeleteProgetto", { id: 123 });
```

### Redux Store

State management centralizzato per:

- Dati utente autenticato
- Configurazioni applicazione
- Cache dati frequenti
- UI state globale

---

## 🎨 Editor PDF

### Architettura Editor

L'editor PDF utilizza un sistema a componenti modulare:

```
PdfEditorIDE (Container)
├── ToolbarComponenti (Tools)
├── CanvasEditor (Workspace)
├── ElementiComponenti (Palette)
└── CustomComponent (Properties)
```

### Gestione Elementi

#### Tipi di Elementi

1. **Elementi Singoli** - Componenti base (testo, immagine, ecc.)
2. **Elementi Composti** - Gruppi di componenti correlati

#### Ciclo di Vita Elemento

1. **Drag** dal pannello elementi
2. **Drop** nel canvas
3. **Posizionamento** automatico
4. **Modifica** via doppio click
5. **Aggiornamento** proprietà
6. **Salvataggio** stato

### Sistema Multipagina

- Gestione tab per pagine multiple
- Copia elementi tra pagine
- Navigazione fluida
- Sincronizzazione stato

### Proprietà Elementi

Ogni elemento gestisce:

```jsx
{
  id: string,           // ID univoco
  x: number,           // Posizione X
  y: number,           // Posizione Y
  width: number,       // Larghezza
  height: number,      // Altezza
  page: number,        // Pagina di appartenenza
  label: string,       // Etichetta display
  parentId: string,    // ID elemento padre
  apiId: number,       // ID database
  bgcolor: string      // Colore sfondo
}
```

---

## 🚀 Configurazione e Deploy

### Variabili Ambiente

File `.env` richiesto:

```env
VITE_PORT=5173
VITE_SERVERAPI="https://apit.axonasrl.com"
VITE_AZIENDA="02639080122"
VITE_SERVERWEB="https://axot.axonasrl.com"
VITE_SERVERPATH="axot.axonasrl.com"
VITE_VAPID_PUBLIC_KEY="BPc714ElxdcFcn1JI_hSg2uwbkNk1CYn0UwTmwfmOmHYR8vK2ppwxPK2-nqTxk_sxt8KgIdVyYlXytvGyq1DvUo"
```

### Script Deploy

Il deploy automatizzato ([`deploy.cjs`](scripts/deploy.cjs)) gestisce:

1. **Pulizia** cartella destinazione
2. **Copia** favicon e loghi personalizzati
3. **Generazione** asset PWA
4. **Build** ottimizzato per produzione
5. **Deploy** su server di rete

**Comando deploy:**

```bash
node scripts/deploy.cjs --site=nomesite --favicon=favicon --logo=logo --env=production
```

### PWA Configuration

- **Manifest** generato automaticamente
- **Service Worker** per cache e notifiche
- **Icons** multiple risoluzioni
- **Installazione** supportata

---

## 📚 API Reference

### Endpoints Principali

#### Autenticazione

```http
POST /api/axo_login
Content-Type: application/json

{
  "azienda": "string",
  "user": "string",
  "password": "string"
}
```

#### Lettura Dati

```http
POST /api/axo_general
Content-Type: application/json

{
  "Token": "string",
  "DB": "string",
  "Funzione": "Leggi",
  "Classe": "string",
  "Pagina": number
}
```

#### Scrittura Dati

```http
POST /api/axo_sel
Content-Type: application/json

{
  "Token": "string",
  "Idobj": number,
  "Modulo": "string",
  "Classe": "string",
  "DB": "string",
  "Funzione": "string",
  "Parametri": "string"
}
```

### Strutture Dati

#### Progetto

```json
{
  "IDOBJ": number,
  "AZIENDA": "string",
  "TemplatePrint_Codice": "string",
  "TemplatePrint_Nome": "string",
  "TemplatePrint_Descrizione": "string"
}
```

#### Componente Template

```json
{
  "IDOBJ": number,
  "TemplateComponent_Nome": "string",
  "TemplateComponent_X": number,
  "TemplateComponent_Y": number,
  "TemplateComponentItems_W": number,
  "TemplateComponentItems_H": number,
  "OggettoBase": "string"
}
```

---

## 📱 PWA Features

### Service Worker

Il [`service-worker.js`](src/service-worker.js) gestisce:

- Cache strategico delle risorse
- Notifiche push in background
- Aggiornamenti automatici app
- Funzionalità offline base

### Notifiche Push

Sistema di notifiche implementato tramite:

1. **Registrazione** service worker
2. **Sottoscrizione** push manager
3. **Invio** credenziali al backend
4. **Ricezione** notifiche real-time

### Installazione PWA

L'app può essere installata come:

- **App desktop** (Windows, macOS, Linux)
- **App mobile** (iOS, Android)
- **Shortcut** su home screen

---

## 🔧 Development Setup

### Prerequisiti

- Node.js 18+
- npm o yarn
- Accesso API backend

### Installazione

```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development server
npm run dev
```

### Script Disponibili

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
npm run deploy       # Deploy automatico
```

### Testing

```bash
npm run test         # Unit tests
npm run e2e          # End-to-end tests
npm run lint         # Code linting
```

---

## 📈 Performance & Optimization

### Build Optimization

- **Terser** minification con drop console
- **Code splitting** automatico
- **Asset optimization** per PWA
- **Bundle analysis** integrato

### Runtime Performance

- **Memoization** componenti pesanti
- **Lazy loading** route e componenti
- **Virtual scrolling** per liste grandi
- **Debouncing** input e API calls

### Caching Strategy

- **Browser cache** per asset statici
- **Service Worker cache** per app shell
- **Memory cache** per dati frequenti
- **LocalStorage** per preferenze utente

---

## 🐛 Troubleshooting

### Problemi Comuni

#### Errori di Autenticazione

- Verificare token validità
- Controllare variabili ambiente
- Verificare connessione API

#### Problemi Drag & Drop

- Verificare browser compatibility
- Controllare event handlers
- Verificare z-index elementi

#### Performance Issues

- Analizzare bundle size
- Verificare memory leaks
- Ottimizzare re-rendering

### Debug Tools

- Redux DevTools per state
- React DevTools per componenti
- Network tab per API calls
- Console per errori runtime

---

_Documentazione aggiornata al 27 maggio 2025_
