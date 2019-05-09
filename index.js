const { app, BrowserWindow, crashReporter } = require("electron");
const path = require("path");
const url = require("url");

let win;

crashReporter.start({
	companyName: "Electron crash report server",
	extra: { extra: "info from the main process" },
	ignoreSystemCrashHandler: true,
	submitURL: "https://pacific-falls-32011.herokuapp.com/",
	uploadToServer: true,
});

function createWindow() {
	win = new BrowserWindow({
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
		width: 800,
	});

	win.loadURL(
		url.format({
			pathname: path.join(__dirname, "index.html"),
			protocol: "file",
		})
	);

	win.webContents.openDevTools();

	win.on("closed", () => {
		win = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	if (win === null) createWindow();
});
