# 📄 Progetto Editor – Descrizione Completa

## 📖 Panoramica

Il **Progetto Editor** è una soluzione completa per la creazione, modifica e generazione di template di stampa PDF. Il sistema permette agli utenti di progettare documenti attraverso un'interfaccia drag-and-drop intuitiva e di generare PDF dinamici basati su dati provenienti da sistemi esterni.

---

## 🔐 1. Accesso al Progetto

### Sistema di Autenticazione

L'accesso al sistema avviene tramite una **schermata di login** sicura dove l'utente deve inserire:

- **Nome utente**
- **Password**

> ⚠️ **Sicurezza**: Solo utenti autorizzati possono accedere alle funzionalità dell'editor

### Flusso di Accesso

```
Login → Verifica Credenziali → Dashboard Progetti
```

---

## 🏠 2. Struttura Principale dell'Applicazione

### Dashboard Progetti

Una volta effettuato l'accesso, l'utente accede alla **schermata principale** che presenta:

- 📋 **Elenco completo** di tutti i progetti disponibili
- 🔍 **Funzionalità di ricerca** e filtro
- ➕ **Opzioni di creazione** nuovi progetti
- 🗑️ **Gestione progetti** esistenti

### Apertura Editor

Quando un progetto viene selezionato, si apre l'**ambiente di lavoro dell'editor** che funziona come una dashboard completa per:

- Creazione template
- Modifica template esistenti
- Gestione elementi grafici

---

## 🎨 3. Template Editor – Funzionalità Principali

### Capacità dell'Editor

L'editor permette di:

- ✨ **Creare nuovi template** da zero
- ✏️ **Modificare template esistenti**
- 🖱️ **Trascinare elementi grafici** in una pagina dimostrativa
- 👁️ **Visualizzare in tempo reale** l'aspetto finale del documento

### Interfaccia Utente

```
┌─────────────────────────────────────────────────────┐
│  Toolbar Componenti                                 │
├─────────────────┬───────────────────────────────────┤
│  Pannello       │                                   │
│  Elementi       │        Canvas Editor              │
│  Disponibili    │      (Area di Lavoro)            │
│                 │                                   │
└─────────────────┴───────────────────────────────────┘
```

---

## 🧩 4. Tipi di Elementi Disponibili

### 🔹 Elementi Singoli

Componenti base dell'interfaccia che possono essere posizionati liberamente:

| Elemento     | Descrizione        | Funzionalità                          |
| ------------ | ------------------ | ------------------------------------- |
| **Label**    | Etichette di testo | Testo semplice o multilinea           |
| **Image**    | Immagini           | Caricamento e posizionamento immagini |
| **Datagrid** | Tabelle dati       | Visualizzazione dati tabulari         |
| **Textarea** | Area testo         | Input testo multi-riga                |
| **Text**     | Campo testo        | Input testo semplice                  |

### 🔸 Elementi Composti

Insiemi di elementi singoli preconfigurati:

| Elemento   | Composizione         | Comportamento             |
| ---------- | -------------------- | ------------------------- |
| **Header** | 2 Label + 2 Immagini | Posizionamento automatico |
| **Footer** | Elementi predefiniti | Layout preconfigurato     |

> 💡 **Nota**: Gli elementi composti vengono posizionati automaticamente quando trascinati nella pagina

---

## 💾 5. Gestione degli Elementi e dei Dati

### Architettura Database

La struttura e posizione degli elementi è salvata in un sistema di tabelle relazionali:

#### Tabelle Principali

```sql
-- Posizioni elementi principali
template_compost
├── id
├── template_id
├── element_type
├── x_position
├── y_position
└── properties

-- Elementi figli (composizioni interne)
template_compost_items
├── parent_id
├── child_element_id
├── relative_position
└── child_properties
```

### Flusso Dati

```
Template Design → Database Storage → PDF Generation
```

---

## 💾 6. Salvataggio e Generazione del Documento

### Processo di Salvataggio

Per salvare template creati o modificati:

1. **Scrittura dati** nelle tabelle:

   - `compost_print` (template principale)
   - `compost_print_items` (elementi del template)

2. **Validazione** struttura template
3. **Conferma** salvataggio

### Processo di Generazione PDF

#### Step 1: Preparazione Dati

I dati da visualizzare vengono salvati nella tabella `print`:

```json
{
  "codice_univoco": "ABC123XYZ",
  "template_id": 456,
  "data_json": {
    "nome_cliente": "Mario Rossi",
    "indirizzo": "Via Roma 123",
    "items": [...],
    "totale": 1250.00
  }
}
```

#### Step 2: Richiamo Template

Il sistema viene richiamato tramite URL:

```
https://editor.domain.com/visualizza/ABC123XYZ
```

#### Step 3: Elaborazione

Il sistema:

1. 📖 **Legge i dati** dalla tabella `print`
2. 🔍 **Recupera l'ID** del template associato
3. 🔄 **Esegue il matching** tra dati e template
4. 🎨 **Personalizza ogni elemento** in base al tipo
5. 📄 **Genera e visualizza** il PDF finale

---

## ⚙️ 7. Personalizzazione degli Elementi

### 🏷️ Label

**Caratteristiche:**

- Testo semplice o multilinea
- Altezza dinamica per contenuto multilinea
- Formattazione avanzata

**Proprietà configurabili:**

```json
{
  "text": "Contenuto label",
  "multiline": true,
  "font_size": 12,
  "font_family": "Arial",
  "color": "#000000",
  "alignment": "left"
}
```

### 🖼️ Image

**Caratteristiche:**

- Caricamento immagini su server dedicato
- Ridimensionamento automatico
- Formati supportati: JPG, PNG, SVG

**Funzionalità future:**

- Integration con datagrid per storage
- Gestione avanzata dei formati

### 📊 Datagrid

**Gestione Avanzata:**

Il Datagrid ha capacità di **paginazione automatica**:

```
📈 Esempio:
- Dati totali: 9.000 righe
- Righe per pagina: 100
- Risultato: 90 pagine automatiche
```

**Caratteristiche:**

- Intestazioni personalizzabili
- Stili alternati per righe
- Calcoli automatici (totali, subtotali)
- Gestione overflow contenuto

---

## 🔗 8. Integrazione con Sistemi Esterni

### Fonte Dati

Il **file JSON** contenente i dati da inserire nei template viene generato da:

- 🏢 **Gestionale Axona**
- 📊 **Sistemi ERP aziendali**
- 🗄️ **Database esterni**
- 🌐 **API di terze parti**

### Formato Integrazione

```json
{
  "template_code": "INVOICE_001",
  "generation_date": "2025-05-28",
  "data": {
    "header": {
      "company_name": "Axona Srl",
      "invoice_number": "INV-2025-001"
    },
    "customer": {
      "name": "Cliente Esempio",
      "address": "Via Example 123"
    },
    "items": [
      {
        "description": "Prodotto A",
        "quantity": 10,
        "price": 25.0
      }
    ]
  }
}
```

### Benefici Integrazione

- ✅ **Aggiornamento dinamico** dei dati
- ✅ **Sincronizzazione automatica** con sistemi aziendali
- ✅ **Riduzione errori** manuali
- ✅ **Tempo reale** nella generazione documenti

---

## 🚀 9. Sviluppi Futuri (To-Do)

### 📋 Roadmap Funzionalità

#### ⚡ Priorità Alta

- [ ] **Rimozione pagine extra**

  - Implementazione controlli per eliminare pagine vuote
  - Ottimizzazione layout automatico

- [ ] **Miglioramento salvataggio template**
  - Sistema di versioning
  - Backup automatico
  - Rollback modifiche

#### 🔧 Priorità Media

- [ ] **Sistema caricamento immagini**

  - Upload manager avanzato
  - Compressione automatica
  - Gallery condivisa

- [ ] **Ottimizzazione generazione pagine**
  - Algoritmi intelligenti per Datagrid
  - Preview multipagina
  - Controllo memoria

#### 🎯 Priorità Bassa

- [ ] **Matching dati/template avanzato**
  - Validazione automatica tipi
  - Gestione errori robusta
  - Suggerimenti intelligenti

### 🔮 Funzionalità Future

#### Nuovi Tipi di Elementi

- **Chart** (Grafici dinamici)
- **QR Code** (Generazione automatica)
- **Barcode** (Codici a barre)
- **Signature** (Campi firma digitale)

#### Miglioramenti UX

- **Undo/Redo** system
- **Template gallery** condivisa
- **Collaborative editing**
- **Real-time preview**

#### Integrazione Avanzata

- **API REST** complete
- **Webhook** per aggiornamenti
- **Export** in formati multipli
- **Cloud storage** integration

---

## 📊 Metriche e Performance

### 🎯 Obiettivi Performance

| Metrica                     | Target  | Attuale |
| --------------------------- | ------- | ------- |
| Tempo caricamento editor    | < 2s    | 1.8s    |
| Generazione PDF (100 righe) | < 5s    | 4.2s    |
| Salvataggio template        | < 1s    | 0.8s    |
| Responsive time             | < 200ms | 150ms   |

### 📈 Scalabilità

- **Supporto utenti simultanei**: 100+
- **Template per progetto**: Illimitati
- **Dimensione massima PDF**: 50MB
- **Righe Datagrid supportate**: 10,000+

---

## 🛠️ Supporto e Manutenzione

### 📞 Contatti Tecnici

- **Team di sviluppo**: developers@axona.com
- **Supporto utenti**: support@axona.com
- **Documentazione**: docs.axona.com/printeditor

### 🔄 Ciclo di Rilascio

- **Major updates**: Trimestrali
- **Bug fixes**: Settimanali
- **Security patches**: Immediate

---

_Documento aggiornato al 28 maggio 2025_
_Versione: 1.0.0_
