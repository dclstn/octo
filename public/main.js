const { BrowserWindow, app, ipcMain } = require('electron');
const remote = require('@electron/remote/main');

remote.initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  win.loadURL('http://localhost:3000');
}

app.on('ready', () => createWindow);

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('download', () => 'done');
