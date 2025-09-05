import { useState } from "react";
import './style.css';

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [randomPrayer, setRandomPrayer] = useState("");

  const samplePrayers = [
    "Pido fuerzas para superar mi ansiedad.",
    "Oro por la salud de mi madre.",
    "Necesito claridad para tomar decisiones difíciles.",
    "Pido que me llegue trabajo pronto.",
    "Que pueda perdonar a quienes me han herido."
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const random = samplePrayers[Math.floor(Math.random() * samplePrayers.length)];
    setRandomPrayer(random);
    setSubmitted(true);
  };

  return (
    <div className="container">
      <h1>PrayFor</h1>
      <p>Comparte una oración. Recibe otra.</p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Tu nombre (opcional)" />
        <textarea
          name="petition"
          rows="4"
          placeholder="Escribe tu oración aquí..."
          required
        ></textarea>
        <button type="submit">Enviar oración</button>
      </form>

      {submitted && (
        <div className="card">
          <h2>Ora por alguien más</h2>
          <p>{randomPrayer}</p>
          <button onClick={() => {
            const random = samplePrayers[Math.floor(Math.random() * samplePrayers.length)];
            setRandomPrayer(random);
          }}>
            Orar por otra persona
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
