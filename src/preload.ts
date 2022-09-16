import { contextBridge, ipcRenderer } from 'electron'
import { ProjectInfo } from './component/ConfigurePanel'


contextBridge.exposeInMainWorld('electronAPI', {
    selectPath: () => ipcRenderer.invoke('select-path'),
    selectFile: () => ipcRenderer.invoke('select-file'),
    openFolder: (path:string) => ipcRenderer.invoke('open-folder', path),
    saveFile: (project:ProjectInfo[]) => ipcRenderer.invoke('save-file', project),
    copyCommand: (command:string) => ipcRenderer.invoke('copy-command', command),
    runCommand: (command:string) => ipcRenderer.invoke('run-command', command)
})