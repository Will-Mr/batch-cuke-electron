import { app, BrowserWindow, ipcMain } from 'electron'
import {addNewItem, copyCommand, runCommand, importData, exportData, openFolder} from './utils'
import {join} from 'path'
import { ProjectInfo } from './component/ConfigurePanel'

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  })

  win.loadURL(join(__dirname, 'index.html'))
  // win.loadURL("http://localhost:3000/")

  // win.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.handle('select-path', addNewItem)
  ipcMain.handle('select-file', importData)
  ipcMain.handle('save-file', (event, data:ProjectInfo[]) => {
    return exportData(data)
  })
  ipcMain.handle('open-folder', (event, data:string) => {
    return openFolder(data)
  })
  ipcMain.handle('copy-command', (event, command:string) => {
    return copyCommand(command)
  })
  ipcMain.handle('run-command', (event, command) => {
    return runCommand(command)
  })
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
