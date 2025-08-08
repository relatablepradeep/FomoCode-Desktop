// backend/focus-lock.cjs
const fs = require('fs');
const { windowManager } = require('node-window-manager');
const configPath = './backend/focus-config.json';

function loadConfig() {
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath));
  }
  return null;
}

function isAllowed(title, allowedList) {
  const lower = title.toLowerCase();
  return allowedList.some((t) => lower.includes(t));
}

function getTopAllowedWindow(allowedList) {
  const windows = windowManager.getWindows();
  for (const win of windows) {
    const title = win.getTitle();
    if (isAllowed(title, allowedList)) {
      return win;
    }
  }
  return null;
}

console.log("🔒 Focus Lock Mode running...");

setInterval(() => {
  const config = loadConfig();
  if (!config) return;

  const { allowedApps, lockUntil } = config;
  const now = Date.now();

  if (now > lockUntil) {
    console.log("🔓 Focus mode ended.");
    fs.unlinkSync(configPath);
    return;
  }

  const active = windowManager.getActiveWindow();
  const title = active?.getTitle() || "";

  if (!isAllowed(title, allowedApps)) {
    console.log(`⛔ "${title}" blocked — refocusing allowed app...`);
    const win = getTopAllowedWindow(allowedApps);
    if (win) {
      win.bringToTop();
    }
  } else {
    console.log(`✅ Active: ${title}`);
  }
}, 700);
