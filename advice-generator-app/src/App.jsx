import { useState, useMemo, useEffect } from "react";
import throttle from "lodash.throttle";
import Dice from "./assets/icon-dice.svg";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState({
    id: 72,
    advice: "Don't eat anything your grandparents wouldn't recognise as food.",
  });

  const generateAdvice = async () => {
    const randomNumber = Math.floor(Math.random() * 223 + 1);
    const response = await fetch(
      `https://api.adviceslip.com/advice/${randomNumber}`
    );
    const data = await response.json();
    setAdvice(data.slip);
  };

  const throttleChange = useMemo(() => throttle(generateAdvice, 2000), []);

  useEffect(() => {
    return () => {
      throttleChange.cancel();
    };
  }, []);

  return (
    <main>
      <div className="advice-container">
        <h3 className="advice-number">Advice #{advice.id}</h3>
        <div className="advice">
          <q>{advice.advice}</q>
        </div>
        <div className="advice-end"></div>
      </div>
      <button className="advice-button" onClick={throttleChange}>
        <img src={Dice} alt="Dice" />
      </button>
    </main>
  );
}

export default App;
