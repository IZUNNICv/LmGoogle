/**
 * 📌 Componente `SpeedDialComponent`
 *
 * Questo componente React utilizza **Material UI** per creare un menu `SpeedDial` interattivo.
 * Carica dinamicamente le azioni disponibili da Redux, garantendo che ogni voce sia unica.
 * L'icona principale viene determinata sulla base della prima azione disponibile.
 *
 * @param {boolean} open - Stato di apertura del menu `SpeedDial`.
 * @param {function} setOpen - Funzione per aggiornare lo stato di apertura.
 * @returns {JSX.Element} - Componente interattivo di `SpeedDial`.
 */

import React, { useEffect, useState } from "react";
import { Box, SpeedDial, SpeedDialAction } from "@mui/material";
import { useSelector } from "react-redux";
import Icon from "./Icon";
import useDevice from "../hooks/useDevice";
const SpeedDialComponent = ({ open, setOpen }) => {
  const { isMobile } = useDevice();
  const [actions, setActions] = useState([]);

  const itemModuli = useSelector((state) => state.auth.value.Itemset);

  /**
   * 🔄 Carica le azioni disponibili, filtrando i moduli duplicati.
   */
  const loadActions = () => {
    const dati = itemModuli?.v_moduli || [];

    const uniqueActions = dati
      .map((item) => ({
        name: item.Moduli_Nome,
        icon: item.Moduli_Icona,
      }))
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.name === item.name)
      );

    setActions(uniqueActions);
  };

  useEffect(() => {
    loadActions();
  }, [itemModuli]);

  return (
    <>
      <Box sx={{ position: "absolute", bottom: 100, right: 40 }}>
        <SpeedDial
          ariaLabel="Menu SpeedDial"
          sx={{
            position: "absolute",
            bottom: 50,
            right: 5,
            transform: "scale(0.8)",
          }}
          icon={<Icon iconName={actions[0]?.icon} />} // Validazione per evitare errori
          open={open} // Stato di apertura gestito tramite prop
          onClick={() => setOpen((prev) => !prev)} // Toggle dell'apertura
          direction="down"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={<Icon iconName={action.icon} />}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
};

export default SpeedDialComponent;
