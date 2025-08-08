// server.cjs
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const focusConfigPath = './backend/focus-config.json';

let previewURL = "http://localhost:3000"; // default

// Store URL from frontend
app.post('/api/url', (req, res) => {
  const { url } = req.body;
  previewURL = url;

  // Save to file for hold-event to use
  fs.writeFileSync('./backend/preview-url.txt', url);

  res.status(200).json({ success: true, previewURL: url });
});




// Focus Lock Config Endpoint
app.post('/api/focus/start', (req, res) => {
  const { allowedApps, durationMinutes, password } = req.body;

  const lockUntil = Date.now() + durationMinutes * 60 * 1000;
  const config = { allowedApps, lockUntil, password };

  try {
    fs.writeFileSync('./backend/focus-config.json', JSON.stringify(config, null, 2));
    console.log('🔒 Focus mode started for', durationMinutes, 'minutes');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Failed to write config:", error);
    res.status(500).json({ success: false, error: "Could not write focus config" });
  }
});







// Optional: Get current URL
app.get('/api/url', (req, res) => {
  res.json({ previewURL });
});

app.listen(PORT, () => {
  console.log(`🚀 API listening on http://localhost:${PORT}`);
});
