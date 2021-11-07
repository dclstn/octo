const {
  BrowserWindow, app, ipcMain, dialog,
} = require('electron');
const remote = require('@electron/remote/main');
const fs = require('fs');
const { default: axios } = require('axios');
const path = require('path');

remote.initialize();

let directory = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false, // not safe
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

ipcMain.handle('select-directory', async () => {
  directory = await dialog.showOpenDialog({ properties: ['openDirectory'] });

  if (directory.canceled) {
    throw new Error('No directory selected');
  }
});

ipcMain.handle(
  'download-clip',
  (_, url, meta) => new Promise((resolve, reject) => {
    axios({
      url,
      method: 'GET',
      responseType: 'stream',
    })
      .then(({ data }) => {
        const { title } = meta;
        const filename = path.resolve(directory.filePaths[0], `${title}.mp4`);
        const writer = fs.createWriteStream(filename);
        data.pipe(writer);
        data.on('end', () => resolve());
      })
      .catch((e) => reject(e));
  }),
);
