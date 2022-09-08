import { ProjectInfo } from 'src/component/ConfigurePanel'
import {CommandResult} from '../utils'
export interface IElectronAPI {
    selectPath: () => Promise<string>,
    copyCommand: (command:string) => Promise<void>,
    runCommand: (command:string) => Promise<CommandResult>
    runProject: (project: ProjectInfo) => Promise<CommandResult>
}
  
declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}