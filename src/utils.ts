import { dialog, clipboard } from 'electron'
import {exec} from 'child_process'
export interface CommandResult {
    status: "passed" | "failed",
    output: string
}
export function addNewItem(){
    const pathes = dialog.showOpenDialogSync({
        properties: ["openDirectory"]
    })
    return pathes ? pathes[0] : undefined
}
export function copyCommand(command:string){
    return clipboard.writeText(command)
}
export function runCommand(command:string): Promise<CommandResult>{
    return new Promise((resolve, reject) => {   
        return exec(command, (error, stdout, stderr) => {
            if(error) 
            return resolve({status: "failed", output: stdout})
            if(stderr) {
                return resolve({status: "passed", output: stdout})
            }
            else{
                return resolve({status: "passed", output: stdout})
            }
        })
    })
}