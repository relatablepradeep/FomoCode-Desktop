const { GlobalKeyboardListener } = require("node-global-key-listener");
const { windowManager } = require("node-window-manager");

const keyboard = new GlobalKeyboardListener();

const vscodeTitleHint = "Visual Studio Code";

console.log("⌨️ Press ALT key to switch focus to Visual Studio Code");

keyboard.addListener((e) => {
  const isAlt = e.name === "LEFT ALT" || e.name === "RIGHT ALT";

  if (isAlt && e.state === "DOWN") {
    console.log("🟡 ALT key pressed — trying to focus Visual Studio Code...");

    const windows = windowManager.getWindows();
    const vscodeWindow = windows.find(w =>
      w.getTitle().includes(vscodeTitleHint)
    );

    if (vscodeWindow) {
      vscodeWindow.bringToTop();
      console.log(`✅ Focused: ${vscodeWindow.getTitle()}`);
    } else {
      console.log("❌ Could not find Visual Studio Code window.");
    }
  }
});
