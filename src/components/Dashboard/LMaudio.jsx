import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Leggi, Scrivi } from "../../utility/CallFetch";
import { FormatDate } from "../../utility/FormatDate";

const LMaudio = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [nuovaTabella, setNuovaTabella] = useState([]);
  const inputRef = useRef();
  //--------------- Chiamata API per ottenere i dati della tabella--------------------
  const db = "LmSync";
  const filtro = `Where Azienda <> '' or Azienda in ('00000000000','{AZIENDA}')`;

  const loadTabellaAudio = async () => {
    const nuovaTabella = await Leggi(db, filtro);
    const dati = nuovaTabella?.Itemset?.["LmSync"];
    setNuovaTabella(Array.isArray(dati) ? dati : []);
  };

  useEffect(() => {
    loadTabellaAudio();
  }, []);
  useEffect(() => {
    console.log("Nuova Tabella", nuovaTabella);
  }, [nuovaTabella]);
  // ---------------------------------------------------------------------------------
  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!audioFile) {
      alert("Seleziona un file");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(audioFile);
    reader.onloadend = async () => {
      const base64Audio = reader.result.split(",")[1];

      // Si Leggi es solo una vista, no uses dati de nuovaTabella
      const idobj = 1; // O el valore che corresponda secondo la tua logica
      const oggiFormattato = FormatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
      const dbScrivi = "LmSync";
      const Classe = "LmSync";

      const oggettoDaScrivere = {
        LmSync_AudioInput: base64Audio,
        LmSync_ScadenzaObj: oggiFormattato,
      };

      try {
        // Salva nel backend tramite Scrivi
        await Scrivi(idobj, dbScrivi, Classe, oggettoDaScrivere);
        alert("Audio inviato e salvato con successo");
      } catch (error) {
        console.error("Errore durante il salvataggio del file", error);
      }
    };
  };

  const handleRunSelenium = async () => {
    try {
      await fetch("http://localhost:5000/run-selenium", { method: "POST" });
      alert("Selenium eseguito");
    } catch (error) {
      console.error("Errore durante l'esecuzione di Selenium", error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        file audio
      </Typography>
      <Typography variant="subtitle1" mb={3}>
        Carica un file audio e invialo facilmente!
      </Typography>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        ref={inputRef}
        style={{ display: "none" }}
      />
      <Button
        variant="contained"
        color="error"
        size="large"
        startIcon={<CloudUploadIcon />}
        sx={{ px: 4, py: 2, fontSize: 18, borderRadius: 2, mb: 2 }}
        onClick={() => inputRef.current.click()}
      >
        Seleziona file audio
      </Button>
      <Typography variant="body2" color="text.secondary" mb={2}>
        oppure trascina e rilascia il file audio qui
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        sx={{ m: 1, width: 220 }}
      >
        Carica Audio
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleRunSelenium}
        sx={{ m: 1, width: 220 }}
      >
        Esegui Selenium
      </Button>
    </Box>
  );
};

export default LMaudio;
/*

const db3 = "PRINT_TemplateComponentList";
const filtro3 = `Where Azienda <> '' or Azienda in ('00000000000','{AZIENDA}')`;

const ElementiComponenti = ({ open, onClose, nuovatable, setnuovaTable }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const loadNuovaTabella = async () => {
    const nuovatable = await Leggi(db3, filtro3);
    const dataNuovaTabella = nuovatable?.Itemset?.["PRINT_TemplateComponentList"];
    setnuovaTable(Array.isArray(dataNuovaTabella) ? dataNuovaTabella : []);
  };
  useEffect(() => {
    loadNuovaTabella();
  }, []);
  useEffect(() => {
    // console.log("Nuova Tabella", nuovatable);
  }, [nuovatable]); 
  
  */
