const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL('http://localhost:5173');

  // Spawn backend scripts
  const shift = spawn('node', [path.resolve(__dirname, 'backend/shift-focus-toggle.cjs')]);
  shift.stdout.on('data', (data) => console.log('[shift]', data.toString()));
  shift.stderr.on('data', (data) => console.error('[shift ERROR]', data.toString()));

  const hold = spawn('node', [path.resolve(__dirname, 'backend/hold-event.cjs')]);
  hold.stdout.on('data', (data) => console.log('[hold]', data.toString()));
  hold.stderr.on('data', (data) => console.error('[hold ERROR]', data.toString()));

  const keyboard = spawn('node', [path.resolve(__dirname, 'backend/Alt-event-listner.cjs')]);
  keyboard.stdout.on('data', (data) => console.log('[keyboard]', data.toString()));
  keyboard.stderr.on('data', (data) => console.error('[keyboard ERROR]', data.toString()));


  const youtube = spawn('node', [path.resolve(__dirname, 'backend/enter-listner.cjs')]);
youtube.stdout.on('data', (data) => console.log('[youtube]', data.toString()));
youtube.stderr.on('data', (data) => console.error('[youtube ERROR]', data.toString()));

}

app.whenReady().then(createWindow);
