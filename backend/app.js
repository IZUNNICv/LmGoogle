require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { estraiAudioESalva } = require("./audioApi");
const { eseguiSelenium } = require("./seleniumRunner");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/run-selenium", async (req, res) => {
  try {
    // 1. Estrai e salva l'audio come MP3
    const mp3Path = await estraiAudioESalva();

    // 2. Avvia Selenium e passa il percorso del file MP3
    await eseguiSelenium(mp3Path);

    res.json({ ok: true, message: "Selenium eseguito con successo" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend avviato sulla porta ${PORT}`));
