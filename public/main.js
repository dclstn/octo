const {
  BrowserWindow,
  app,
  ipcMain,
  dialog,
  // eslint-disable-next-line import/no-extraneous-dependencies
} = require('electron');
const remote = require('@electron/remote/main');
const fs = require('fs');
const { default: axios } = require('axios');
const path = require('path');
const isDev = require('electron-is-dev');
const url = require('url');

remote.initialize();

let directory = null;
let win = null;

function parseUrlParams(reqUrl) {
  const HashKeyValueParsedJSON = {};

  url
    .parse(reqUrl)
    .hash.substring(1)
    .split('&')
    .forEach((x) => {
      const arr = x.split('=');
      if (arr[1]) [, HashKeyValueParsedJSON[arr[0]]] = arr;
    });

  return HashKeyValueParsedJSON;
}

function createWindow() {
  win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 600,
    icon: `${__dirname}icon.icns`,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false, // not safe
    },
  });

  win.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`,
  );
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

const CLIENT_ID = '44myc6m2b760fckgsbpko1upvjv2kb';
const TWITCH_AUTH_URL = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=http://localhost:8000/twitch&response_type=token&scope=user:edit`;

ipcMain.handle('create-auth-window', async () => {
  const authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false,
    },
  });

  authWindow.loadURL(TWITCH_AUTH_URL);

  return new Promise((resolve, reject) => {
    authWindow.webContents.once('will-navigate', (event, newUrl) => {
      const params = parseUrlParams(newUrl);

      if (!params.hasOwnProperty('access_token')) {
        reject(new Error('No authorization in url'));
      }

      authWindow.close();

      resolve({
        token: params.access_token,
        scope: params.scope,
      });
    });

    authWindow.on('closed', () => reject(new Error('Prompt was closed by user')));
  });
});

ipcMain.handle('select-directory', async () => {
  directory = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  if (directory.canceled) {
    throw new Error('No directory selected');
  }
});

ipcMain.handle(
  'download-clip',
  (_, clipUrl, meta) => new Promise((resolve, reject) => {
    axios({
      url: clipUrl,
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
