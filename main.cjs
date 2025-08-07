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
}

app.whenReady().then(createWindow);
