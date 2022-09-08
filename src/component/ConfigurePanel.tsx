import React, {Component} from 'react';
export interface ConfigurePanelProps{
    projectsCache?: ProjectInfo[]
}
export interface ConfigurePanelStates{
    projects: ProjectInfo[],
    checkAll?: boolean,
    command?: string
}
export interface ProjectInfo{
    path: string
    checked?: boolean
    lastReport?: string
}
export class ConfigurePanel extends Component<ConfigurePanelProps, ConfigurePanelStates> {
    defaultProjects:ProjectInfo[];
    constructor(props: ConfigurePanelProps){
        super(props)
        this.defaultProjects = props.projectsCache ? props.projectsCache : []
        this.state = {
            projects: this.defaultProjects,
            checkAll: this.isAllChecked(this.defaultProjects),
            command: this.generateCommand(this.defaultProjects)
        }
    }
    isAllChecked = (projects:ProjectInfo[]) => {
        const uncheckedIndex = projects.findIndex(project => !project.checked)
        if(uncheckedIndex > -1){
            return false
        }else{
            return true
        }
        
    }
    generateCommand = (projects?:ProjectInfo[]) => {
        projects = projects ? projects :this.state.projects
        const commandList = projects.filter(project => project.checked)
        .map(project => {
            if(project.checked){
                return `cd /d ${project.path} && cuke --run --format html --format json --no-color -o reports`
            }
        })
        const initCommand = `chcp 65001`
        commandList.unshift(initCommand);
        const command = commandList.join(' && ')
        return command
    }
    handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.checked;
        const name = target.name;
        const projects = this.state.projects;
        const updateIndex = parseInt(name)
        if(updateIndex > -1) projects![updateIndex].checked = value
        const command = this.generateCommand(projects)
        this.setState({
            projects: projects,
            command: command
        })
    }
    handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.checked;
        const projects = this.state.projects.map((project) => {
            project.checked = value
            return project
        })
        const command = this.generateCommand(projects)
        this.setState({
            projects: projects,
            checkAll: value,
            command: command
        })
    }
    handleCopyCommand = async (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("尝试操作剪贴板")
        if(!window.electronAPI){
            console.log("操作失败")
            return;
        }else{
            if(this.state.command){
                await window.electronAPI.copyCommand(this.state.command)
            }
            console.log("操作成功")
        }
    }
    handleRunCommand = async (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("尝试运行命令")
        if(!window.electronAPI){
            console.log("操作失败")
            return;
        }else{
            console.log("操作成功")
            if(this.state.command){
                let result = await window.electronAPI.runCommand(this.state.command)
                console.log(result)
                return result;
            }
        }
    }
    handleAddNewItem = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if(!window.electronAPI){
            return
        }else{
            const projectPath = await window.electronAPI.selectPath()
            const projects = this.state.projects
            if(projectPath){
                projects.push({
                    path: projectPath,
                    checked: true
                })
            }
            const command = this.generateCommand(projects)
            this.setState({
                projects: projects,
                command: command
            })
        }
    }
    renderHeader = () => {
        return (
            <div className="items">
                <div className="item-checkbox">
                    <span></span>
                    <input type="checkbox" onChange={this.handleCheckAll} checked={this.state.checkAll}/>
                </div>
                <div className="item-path bold">
                    项目路径
                </div>
                <div className="item-status bold">
                    状态
                </div>
                <div className="item-result bold">
                    <span>结果</span>
                </div>
                <div className="item-controller bold">
                    操作
                </div>
            </div>
        )
    }
    renderProjectsList = (projects:ProjectInfo[]) => {
        return projects.map((project, index) => {
            if(!project.path) return;
            return (
                <div className="items" key={index}>
                    <div className="item-checkbox">
                        <span className="icon icon-drag"></span>
                        {
                            <input type="checkbox" name={index+''} onChange={this.handleCheck} checked={project.checked??false}/>
                        }
                    </div>
                    <div className="item-path">
                        <span>{project.path}</span>
                    </div>
                    <div className="item-status">
                        <span className="icon icon-success"></span>
                    </div>
                    <div className="item-result">
                        <span>{project.lastReport}</span>
                    </div>
                    <div className="item-controller">
                        <div className="icon">
                          <span className="icon icon-run"></span>
                        </div>
                        <div className="icon">
                            <span className="icon icon-delete"></span>
                        </div>
                        <div className="icon">
                            <span className="icon icon-insert"></span>
                        </div>
                    </div>
                </div>
            )
        })
    }
    renderNewItemRow = () => {
        return (
            <div className="items items-new" id="new-item">
                <div className="item-checkbox">
                </div>
                <div className="item-path">
                    <span className="editable-path" contentEditable="true"></span>
                    <button id="select-path" onClick={this.handleAddNewItem}>...</button>
                </div>
                <div className="item-status">
                </div>
                <div className="item-result">
                    <span></span>
                </div>
                <div className="item-controller">
                    <div className="icon">
                        <span className="icon icon-delete"></span>
                    </div>
                </div>
            </div>
        )
    }
    renderCommand = () => {
        return (
            <div id="config-command-panel">
                <p>执行命令</p>
                <div className='config-command-bar'>
                    <div className="config-command-block config-command-items">
                        <pre className="config-command-text ">{this.state.command}</pre>
                    </div>
                    <div className="config-command-operate config-command-items">
                        <div className="icon">
                            <span className="icon icon-run" onClick={this.handleRunCommand}></span>
                        </div>
                        <div className="icon">
                            <span className="icon icon-copy" onClick={this.handleCopyCommand}></span>
                        </div>
                    </div>
                </div>

                
            </div>
        )
    }
    render = () => {
        return (
            <div className="config-items" id="config-items">
                {this.renderHeader()}
                {this.renderProjectsList(this.state.projects ?? [])}
                {this.renderNewItemRow()}
                
                <div className="divider"></div>
                {this.renderCommand()}
            </div>
        )
    }
}