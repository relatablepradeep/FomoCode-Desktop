const { GlobalKeyboardListener } = require("node-global-key-listener");
const { windowManager } = require("node-window-manager");

const keyboard = new GlobalKeyboardListener();

console.log("⌨️ Hold Enter for 1.5 seconds to bring Chrome/Brave to front...");

let isEnterDown = false;
let enterHeldTimer = null;

keyboard.addListener((e) => {
  const isEnterKey = e.name === "RETURN";

  if (isEnterKey && e.state === "DOWN" && !isEnterDown) {
    isEnterDown = true;

    enterHeldTimer = setTimeout(() => {
      console.log("🟥 Enter held — searching for Chrome/Brave window");

      const windows = windowManager.getWindows();

      const browserWindow = windows.find((win) => {
        const title = win.getTitle().toLowerCase();
        return title.includes("youtube") || title.includes("chrome") || title.includes("brave");
      });

      if (browserWindow) {
        browserWindow.bringToTop();
        console.log(`✅ Brought to front: ${browserWindow.getTitle()}`);
      } else {
        console.log("❌ No Chrome or Brave window found");
      }
    }, 1500); // 1.5 seconds
  }

  if (isEnterKey && e.state === "UP") {
    isEnterDown = false;
    if (enterHeldTimer) {
      clearTimeout(enterHeldTimer);
      enterHeldTimer = null;
      console.log("⛔ Enter released early — action canceled");
    }
  }
});
