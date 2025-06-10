# Backend Node.js per automazione Selenium e gestione audio

## Come funziona

1. Riceve una richiesta POST su `/run-selenium` dal frontend.
2. Chiama la tua API per estrarre l'audio in Base64 dal database.
3. Decodifica il Base64 e salva temporaneamente il file come MP3 in `backend/temp/`.
4. Avvia Selenium, apre il sito desiderato e carica il file MP3.

## Avvio

1. Installa le dipendenze:
   ```
   npm install
   ```
2. Avvia il backend:
   ```
   npm start
   ```

## Note

- Modifica i parametri API e l'URL del sito in `audioApi.js` e `seleniumRunner.js` secondo le tue esigenze.
- Assicurati che Chrome sia installato sul sistema.
- La cartella `temp/` serve per i file temporanei MP3.
