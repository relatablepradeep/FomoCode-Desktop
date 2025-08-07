// server.cjs
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let previewURL = "http://localhost:3000"; // default

// Store URL from frontend
app.post('/api/url', (req, res) => {
  const { url } = req.body;
  previewURL = url;

  // Save to file for hold-event to use
  fs.writeFileSync('./backend/preview-url.txt', url);

  res.status(200).json({ success: true, previewURL: url });
});

// Optional: Get current URL
app.get('/api/url', (req, res) => {
  res.json({ previewURL });
});

app.listen(PORT, () => {
  console.log(`🚀 API listening on http://localhost:${PORT}`);
});
