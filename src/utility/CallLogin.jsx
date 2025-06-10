import React from "react";
import { login } from "../store/storeLogin"; // Import the login action from your Redux store

const CallLogin = async (dispatch, azienda = "", user = "", password = "") => {
  const SERVERAPI = import.meta.env.VITE_SERVERAPI;
  const urlLogin = SERVERAPI + "/api/axo_login";

  console.log("CallLogin", azienda, user, password);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    AZIENDA: azienda,
    USER: user,
    PASSWORD: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(urlLogin, requestOptions);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();

  console.log(json, "jsonLogin");

  sessionStorage.setItem("axo_token", json?.Token);
  localStorage.setItem("axo_token", json?.Token);

  await dispatch(login(json)); // Invia i dati utente allo store

  const authL =
    json?.Itemset?.LoginSoggetto[0]?.SoggettiCredenziali_LivelloAutorizzazione;

  const valLogin = {
    logged: true,
    token: json?.Token,
    guest: user == "GUEST" ? true : false,
    authLevel: authL,
    nomesoggetto: json?.Itemset?.LoginSoggetto[0]?.Soggetti_Nome1,
    cognomesoggetto: json?.Itemset?.LoginSoggetto[0]?.Soggetti_Nome2,
  };

  return valLogin;
};
export default CallLogin;

export const LoginByToken = async (dispatch, token = "") => {
  const SERVERAPI = import.meta.env.VITE_SERVERAPI; // Server API URL
  const urlLogin = SERVERAPI + "/api/axo_login/" + token;

  console.log("LoginByToken", token);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const response = await fetch(urlLogin, requestOptions);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();

  console.log(json, "jsonLoginByToken");

  await dispatch(login(json)); // Invia i dati utente allo store

  const authL = json?.Item[0]?.SoggettiCredenziali_LivelloAutorizzazione || 0;
  const valLogin = {
    logged: true,
    token: token,
    guest: json?.Item[0]?.utente == "GUEST" ? true : false,
    authLevel: authL ? authL : 0,
    nomesoggetto: json?.Item[0]?.Soggetti_Nome1,
    cognomesoggetto: json?.Item[0]?.Soggetti_Nome2,
  };

  return valLogin;
};
