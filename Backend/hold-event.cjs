const fs = require('fs');
const { GlobalKeyboardListener } = require("node-global-key-listener");
const open = require("open").default;
const { windowManager } = require("node-window-manager");

const keyboard = new GlobalKeyboardListener();

let ctrlHeld = false;
let browserWindow = null;
let vsCodeWindow = null;
let hasOpened = false;
let holdTimer = null;

// Read the preview URL from file
const getTargetURL = () => {
  try {
    const url = fs.readFileSync('./backend/preview-url.txt', 'utf-8').trim();
    return url || "http://localhost:3000";
  } catch (e) {
    return "http://localhost:3000"; // fallback
  }
};

const browserTitleHint = "localhost";
const vscodeTitleHint = "Visual Studio Code";

keyboard.addListener((e) => {
  const isCtrl = e.name === "LEFT CTRL" || e.name === "RIGHT CTRL";

  if (isCtrl && e.state === "DOWN" && !ctrlHeld) {
    ctrlHeld = true;
    console.log("⏳ Ctrl held — waiting 3 seconds...");

    holdTimer = setTimeout(async () => {
      if (hasOpened) return;
      hasOpened = true;

      const targetURL = getTargetURL();
      console.log(`🌐 Opening: ${targetURL}`);
      await open(targetURL);

      setTimeout(() => {
        const windows = windowManager.getWindows();
        const target = windows.find(w => w.getTitle().toLowerCase().includes("localhost")); // Adjust this if needed
        if (target) browserWindow = target;

        const vscode = windows.find(w => w.getTitle().includes(vscodeTitleHint));
        if (vscode) vsCodeWindow = vscode;
      }, 1500);
    }, 3000);
  }

  if (isCtrl && e.state === "UP" && ctrlHeld) {
    ctrlHeld = false;
    clearTimeout(holdTimer);

    if (hasOpened) {
      if (browserWindow) browserWindow.minimize();
      if (vsCodeWindow) vsCodeWindow.bringToTop();

      hasOpened = false;
    }
  }
});
