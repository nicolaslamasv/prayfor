import React, { useState, useEffect } from "react";
import { db, addPrayer, getRandomPrayer } from "./firebase";

export default function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (name.trim() === "" || message.trim() === "") return;
    await addPrayer(name, message);
    const prayer = await getRandomPrayer(name, message);
    setCurrentPrayer(prayer);
    setHasSubmitted(true);
  };

  const handleNext = async () => {
    const prayer = await getRandomPrayer(name, message);
    setCurrentPrayer(prayer);
  };

  return (
    <div className="container">
      {!hasSubmitted ? (
        <>
          <h1>OraUno</h1>
          <input
            type="text"
            placeholder="Tu nombre o seudónimo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Tu petición de oración"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSubmit}>Enviar</button>
        </>
      ) : (
        <>
          <h2>Ora por esta persona:</h2>
          {currentPrayer ? (
            <div className="card">
              <strong>{currentPrayer.name}</strong>
              <p>{currentPrayer.message}</p>
            </div>
          ) : (
            <p>No hay más peticiones disponibles ahora.</p>
          )}
          <button onClick={handleNext}>Orar por alguien más</button>
        </>
      )}
    </div>
  );
}
