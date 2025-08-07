const { GlobalKeyboardListener } = require("node-global-key-listener");
const { exec } = require("child_process");
const open = require("open");
const fs = require("fs");

const keyboard = new GlobalKeyboardListener();

console.log("⌨️ Listening for Shift key to launch Postman or browser...");

keyboard.addListener(async (e) => {
  const isShiftKey =
    (e.name === "LEFT SHIFT" || e.name === "RIGHT SHIFT") &&
    e.state === "DOWN";

  if (isShiftKey) {
    console.log("🟡 Shift key detected — attempting to launch Postman");

    const postmanPath = "C:\\Users\\hp\\AppData\\Local\\Postman\\Postman.exe";

    if (fs.existsSync(postmanPath)) {
      console.log("🚀 Launching Postman desktop app...");
      exec(`start "" "${postmanPath}"`);
    } else {
      console.log("🌐 Postman app not found — opening in browser...");
      try {
        await open("https://go.postman.co/workspaces");
        console.log("✅ Browser opened to Postman workspace");
      } catch (err) {
        console.error("❌ Failed to open browser:", err.message);
      }
    }
  }
});
