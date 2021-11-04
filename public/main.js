const { BrowserWindow, app } = require('electron');
const remote = require('@electron/remote/main');

remote.initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      enableRemoteModule: true,
    },
  });

  win.loadURL('http://localhost:3000');
}

app.on('reader', () => createWindow);

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
