// src/FocusMode.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function FocusMode() {
  const [apps, setApps] = useState(["code", "youtube"]);
  const [duration, setDuration] = useState(60); // in minutes
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const toggleApp = (app) => {
    setApps((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
    );
  };

  const startFocus = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/focus/start", {
        allowedApps: apps,
        durationMinutes: duration,
        password,
      });

      if (res.data.success) {
        setMessage("✅ Focus mode started!");
      } else {
        setMessage("❌ Failed to start focus mode.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ API error. Server might not be running.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🧘 Focus Mode</h2>

      <div>
        <label>
          <input
            type="checkbox"
            checked={apps.includes("code")}
            onChange={() => toggleApp("code")}
          />
          VS Code
        </label>
        <label>
          <input
            type="checkbox"
            checked={apps.includes("youtube")}
            onChange={() => toggleApp("youtube")}
          />
          YouTube
        </label>
        <label>
          <input
            type="checkbox"
            checked={apps.includes("chrome")}
            onChange={() => toggleApp("chrome")}
          />
          Chrome
        </label>
      </div>

      <div>
        <label>Duration (min):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={startFocus}>Start Focus Mode</button>

      <p>{message}</p>
    </div>
  );
}
