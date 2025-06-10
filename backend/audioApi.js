const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const { decodeBase64ToFile } = require("./utils/decodeBase64");

// Funzione generica per la lettura (Leggi) adattata a Node.js
const Leggi = async (DB, Where, Pagina = 0, Token) => {
  const SERVERAPI = process.env.SERVERAPI;
  const headers = { "Content-Type": "application/json" };

  const body = JSON.stringify({
    Token: Token,
    DB: DB,
    Funzione: "Leggi",
    Classe: Where,
    Pagina: Pagina,
  });

  const response = await fetch(`${SERVERAPI}/api/axo_general`, {
    method: "POST",
    headers,
    body,
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return await response.json();
};

// Funzione che chiama la tua API per ottenere il Base64 e salva come MP3
const estraiAudioESalva = async () => {
  // Qui puoi impostare il token reale, oppure passarlo come parametro
  const Token = "TUO_TOKEN";
  const json = await Leggi("LmSync", "LmSync", 0, Token);

  const base64 = json?.Itemset?.LmSync?.[0]?.LmSync_AudioInput;
  if (!base64) throw new Error("Audio non trovato nel DB");

  // Decodifica e salva come MP3
  const mp3Path = path.join(__dirname, "temp", `audio_${Date.now()}.mp3`);
  decodeBase64ToFile(base64, mp3Path);
  return mp3Path;
};

module.exports = { estraiAudioESalva, Leggi };
