import { useState, useEffect } from "react";
import { Leggi } from "../utility/CallFetch"; // Import Leggi function for fetching data

const useDati = (db = "", filtro = `Where Azienda in ('00000000000','{AZIENDA}''`) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch client data
  const getData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await Leggi(db, filtro);

      console.log("Response:", response); // Log the response for debugging

      const data = response?.Itemset?.[db];

      if (data[0].IDOBJ === null) {
        setRows([]); // Set rows to empty array if no data is found
        return;
      }

      setRows(data);
    } catch (err) {
      console.error("Errore nel caricamento clienti:", err);
      setError(
        `Errore nel caricamento dei dati dei clienti: ${
          err.message || "Errore sconosciuto"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(); // Fetch data when the component mounts
  }, []);

  return { rows, loading, error, getData, setError };
};
export default useDati;
