import {CommandResult} from '../utils'
export interface IElectronAPI {
    selectPath: () => Promise<string>,
    copyCommand: (command:string) => Promise<void>,
    runCommand: (command:string) => Promise<CommandResult>
}
  
declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}