const CallFetch = async (url, method = "GET", body = {}) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(body);

  const requestOptions =
    body == {}
      ? {
          method: method,
          headers: myHeaders,
          redirect: "follow",
        }
      : {
          method: method,
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();

  return json;
};
export default CallFetch;

export const Leggi = async (DB, Where, Pagina = 0) => {
  const SERVERAPI = import.meta.env.VITE_SERVERAPI; // Server API URL
  const Token = localStorage.getItem("axo_token");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    Token: Token,
    DB: DB,
    Funzione: "Leggi",
    Classe: Where,
    Pagina: Pagina,
  });

  const option = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(SERVERAPI + "/api/axo_general", option);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const json = await response.json();

  return json;
};

export const Fai = async (
  Classe,
  Funzione,
  jsonParametri,
  idobj = 0,
  DB = ""
) => {
  const SERVERAPI = import.meta.env.VITE_SERVERAPI; // Server API URL
  const Token = localStorage.getItem("axo_token");

  const formData = {
    Token: Token,
    Idobj: idobj,
    Modulo: "modulofai",
    Classe: Classe,
    DB: DB,
    Funzione: Funzione,
    Parametri: "[" + JSON.stringify(jsonParametri) + "]",
  };

  try {
    const response = await fetch(SERVERAPI + "/api/axo_sel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      return { data: data, error: "" };
    } else {
      const errorData = await response.json();
      console.error(errorData.message);
      return { data: "", error: errorData.message };
    }
  } catch (error) {
    console.error("Dati errati o utente non registrato", error);
  }
};

export const Scrivi = async (idobj, DB, Classe, jsonObj) => {
  const SERVERAPI = import.meta.env.VITE_SERVERAPI; // Server API URL
  const Token = localStorage.getItem("axo_token");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    Token: Token,
    IDOBJ: idobj,
    DB: DB,
    Modulo: DB,
    Classe: Classe,
    Item: " {" + DB + ":[" + JSON.stringify(jsonObj) + "]} ",
  });

  const option = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(SERVERAPI + "/api/axo_sel", option);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const json = await response.json();

  return json;
};
