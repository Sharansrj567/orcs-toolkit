const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const systemInfo = require('./systemInfo');

let splashWindow, mainWindow, sysInfoInterval;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1500,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, './preload.js'),
			nodeIntegration: false,
			contextIsolation: true,
		},
		resizable: false,
		show: false,
	});

	splashWindow = new BrowserWindow({
		width: 500,
		height: 300,
		resizable: false,
		frame: false,
		show: false,
	});

	splashWindow.loadFile('app/splash.html');
	mainWindow.loadURL('http://localhost:3000');

	splashWindow.webContents.on('did-finish-load', () => {
		splashWindow.show();
	});

	mainWindow.webContents.on('did-finish-load', () => {
		setTimeout(() => {
			splashWindow.destroy();
			mainWindow.show();
		}, 4000);
	});

	mainWindow.webContents.openDevTools();

	mainWindow.on('closed', () => {
		mainWindow = null;
		clearInterval(sysInfoInterval);
	});
}

// Electron `app` is ready
app.on('ready', createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
	if (mainWindow === null) createWindow();
});

// sysInfoInterval = setInterval(() => {
// 	systemInfo()
// 		.then((data) => {
// 			data.isActive = true;
// 			mainWindow.webContents.send('sysInfo:fetch', data);
// 		})
// 		.catch((err) => console.log(err));
// }, 1000);
