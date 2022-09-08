import { contextBridge, ipcRenderer } from 'electron'


contextBridge.exposeInMainWorld('electronAPI', {
    selectPath: () => ipcRenderer.invoke('select-path'),
    copyCommand: (command:string) => ipcRenderer.invoke('copy-command', command),
    runCommand: (command:string) => ipcRenderer.invoke('run-command', command)
})