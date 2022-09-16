import { dialog, clipboard, shell } from 'electron'
import {exec} from 'child_process'
import fs from 'fs'
import path from 'path'
import { ProjectInfo } from './component/ConfigurePanel'
export interface CommandResult {
    status: "passed" | "failed",
    reportPath: string,
    output: string
}
export function addNewItem(){
    const pathes = dialog.showOpenDialogSync({
        properties: ["openDirectory"]
    })
    return pathes ? pathes[0] : undefined
}
export function importData(){
    const dataPath = dialog.showOpenDialogSync({
        properties: ["openFile"]
    })
    let data, extname;
    if(dataPath) {
        extname = path.extname(dataPath[0]);
        if(extname === '.txt'){
            data = (fs.readFileSync(dataPath[0],'utf-8')).split('\r\n')
        } else if (extname === '.json') {
            data = JSON.parse(fs.readFileSync(dataPath[0], 'utf8'))
        }
    }
    console.log('data:',data,extname)
    return data ? {'type': extname, 'data': data} : undefined
}
export function openFolder(path:string) {
    shell.openPath(path);
}
export function exportData(projects:ProjectInfo[]){
    const pathes = dialog.showSaveDialogSync({
        title:'保存文件',
        defaultPath:'newData.txt',
        filters:[
            {name: '文本文档', extensions:['txt']},
            {name: 'json数据', extensions:['json']},
        ]
    })
    let newArr = [];
    if(pathes) {
        let exportPath = pathes.substring(pathes.lastIndexOf(".") + 1);
        if (exportPath === 'txt') {
            // 只导出路径
            for (let i = 0; i < projects.length; i++) {
                if (projects[i].checked) {
                    newArr.push(projects[i].path)
                }
            }
            console.log('newArr',newArr);
            const data = newArr.join('\n');
            console.log('data:',data);
            fs.writeFileSync(pathes, data);
        } else if (exportPath === 'json') {
            fs.writeFileSync(pathes, JSON.stringify(projects, null, '  '));
        }
    }
}
export function copyCommand(command:string){
    return clipboard.writeText(command)
}
export function runCommand(command:string): Promise<CommandResult>{
    return new Promise((resolve, reject) => {   
        return exec(command, (error, stdout, stderr) => {
            if(error) return resolve({
                status: "failed", 
                reportPath: "",
                output: stdout
            })
            return resolve({
                status: "passed", 
                reportPath: "",
                output: stdout
            })
        })
    })
}