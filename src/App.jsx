import { useState } from "react";

function App() {
  const name = "Prathyusha";
  const [started, setStarted] = useState(false);

  return (
    <div>
      <h1>Hello, {name}! 🚀</h1>

      <p>Welcome to My Placement Journey 🚀</p>

      <p>I'm preparing for software placements.</p>

      <button onClick={() => setStarted((prev) => !prev)}>
      {started ? "Learning Started" : "Start Learning"}
      </button>

      {started && <p>Let's get this placement prep started! 🔥</p>}
    </div>
  );
}

export default App;
