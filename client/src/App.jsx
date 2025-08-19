import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState("");

  const fetchData = async () => {
    const res = await fetch("https://qr-codegenerator.onrender.com/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (data) setData(data);
  };

  return (
    <div className="container">
      <h1>🎛 QR Retro Generator 🎶</h1>
      <input
        type="text"
        placeholder="Enter URL..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div>
        <button onClick={fetchData}>Generate</button>
      </div>
      {data ? (
        <div className="qr-container">
          <img src={`data:image/png;base64,${data.data}`} alt="QR Code" />
          <a
            href={`data:image/png;base64,${data.data}`}
            download="qrcode.png"
          >
            ⬇ Download QR Code
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default App;
