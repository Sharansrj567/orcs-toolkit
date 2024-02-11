const { app, BrowserWindow } = require('electron');
const path = require('path');

let splashWindow, mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1500,
		height: 800,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
		},
		autoHideMenuBar: true,
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
	mainWindow.loadURL('http://localhost:3001');

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
