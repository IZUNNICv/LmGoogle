import * as MuiIcons from "@mui/icons-material";
import React from "react";

/**
 * 📌 Componente `Icon`
 *
 * Questo componente React permette di caricare dinamicamente le icone di **Material UI**
 * in base al nome ricevuto come prop. Se il nome dell'icona non esiste, mostra automaticamente `HelpOutline` come fallback.
 *
 * @param {string} iconName - Nome dell'icona di **Material UI** da visualizzare.
 * @param {number} [size=25] - Dimensione dell'icona in pixel (default: 25px).
 * @param {string} [color="white"] - Colore dell'icona (default: bianco).
 * @returns {JSX.Element} - Componente dell'icona corrispondente.
 */
const Icon = ({ iconName = "", size = 25, color = "white" }) => {
  // Recupera dinamicamente il componente dell'icona.
  // Se il nome dell'icona non esiste, utilizza `HelpOutline` come fallback.
  const IconComponent = MuiIcons[iconName] || MuiIcons.HelpOutline;

  return <IconComponent style={{ fontSize: `${size}px`, color }} />;
};

export default Icon;
