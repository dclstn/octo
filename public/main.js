const { BrowserWindow, app } = require('electron');
const remote = require('@electron/remote/main');

remote.initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 500,
    webPreferences: {
      enableRemoteModule: true,
      devTools: true,
    },
  });

  win.loadURL('http://localhost:3000');

  win.webContents.openDevTools();
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
