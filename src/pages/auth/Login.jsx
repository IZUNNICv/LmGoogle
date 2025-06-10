import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { login } from "../../store/storeLogin";
import { useDispatch } from "react-redux";
import { Box, Button, TextField } from "@mui/material";
import Loader from "../../components/Loader"; // Import Loader component

function LoginForm() {
  const SERVERAPI = import.meta.env.VITE_SERVERAPI; // Server API URL
  const AZIENDA = import.meta.env.VITE_AZIENDA; // Azienda (company) ID
  const userLocal = localStorage.getItem("axo_usertmp") || ""; // Get token from local storage

  const [azienda, setAzienda] = useState(AZIENDA);
  const [user, setUser] = useState(userLocal);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Login call
   * @param event
   * @returns {Promise<Response>}
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start Loading
    setError(null); // Reset error state

    // Compile options
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        azienda,
        user,
        password,
      }),
    };

    // Call
    try {
      const response = await fetch(SERVERAPI + "/api/axo_login", options);
      const data = await response.json();

      console.log(data, "dataLogin");

      if (response.ok) {
        if (data.Errore) {
          setError(data?.Errore || "Login failed");
          setLoading(false); // Stop Loading
        } else {
          localStorage.setItem("axo_usertmp", user); // Salva l'utente in locale

          await localStorage.setItem("axo_token", data.Token); // Salva il token in locale

          console.log(data, "dataLogin");

          await dispatch(login(data)); // Invia i dati utente allo store
          navigate("/LMFront");
        }
      } else {
        setError(data?.Errore || "Login failed");
        setLoading(false); // Stop Loading
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setLoading(false); // Stop Loading
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "auto",
        height: "100vh",
        maxWidth: 400,
      }}
    >
      {" "}
      <Box>
        <img
          src="/icon/logo.png"
          alt="Logo"
          style={{
            marginBottom: "12px",
            width: "200px",
            height: "auto",
            margin: "auto",
          }}
        />
        <h1
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            marginBottom: "12px",
          }}
        >
          Axona
        </h1>
      </Box>
      {loading ? (
        <Box
          sx={{
            color: "blue",
            fontSize: "0.7rem",
            marginTop: "12px",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <>
          <TextField
            label="Piva azienda"
            placeholder="01234567890"
            required
            value={azienda}
            onChange={(e) => setAzienda(e.currentTarget.value)}
            margin="normal"
          />
          <TextField
            label="User/Mail"
            placeholder="user@mail.com"
            required
            value={user}
            onChange={(e) => setUser(e.currentTarget.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            placeholder="password"
            required
            mt="md"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ fontSize: "0.7rem" }}
            aria-label="Esegui login"
          >
            Login
          </Button>
          {error && (
            <Box
              sx={{
                color: "red",
                fontSize: "0.7rem",
                marginTop: "12px",
              }}
            >
              {error}
            </Box>
          )}
        </>
      )}
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          float: "left",
          marginTop: "12px",
        }}
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          float: "left",
          marginTop: "12px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setPagina("registra");
          }}
        >
          non sei ancora registrato?
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setPagina("recupero");
          }}
          sx={{ fontSize: "0.7rem" }}
        >
          hai perso le credenziali?
        </Button>
      </Box> */}
    </Box>
  );
}
export default LoginForm;
