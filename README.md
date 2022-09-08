# 批量执行配置工具
用于配置CukeTest批量执行项目。使用Electron开发。
## 功能
1. 前端配置界面
   1. 执行列表配置
      1. 项目路径
      2. 是否运行（是否勾选）
      3. 上次运行状态
      4. 上次运行报告
   2. 支持导入（json和txt）
      1. json导入，导入的数据覆盖ConfigurePanel.state.projects；
      2. txt导入，逐行导入txt中的路径，并且自动勾选。
   3. 支持导出（json和txt）
      1. json导出，导出的数据来源是ConfigurePanel.state.projects；
      2. txt导出，只导出选中项目的路径。

## 开发

### 搭建开发环境
```cmd
set ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
npm install
```

### 开发页面
```cmd
npm run start
```

### 开发应用
如果需要调试和开发Electron应用的功能（比如创建CukeTest子进程、创建文件对话框、剪贴板操作等），需要编译后启动Electron来调试，使用下面这个命令：
```cmd
npm run electron:restart
```

上述命令包含以下操作：
1. 编译打包React代码
2. 编译Electron代码
3. 启动Electron客户端