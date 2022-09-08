import React from 'react';
import ReactDOM from 'react-dom/client';
import {ConfigurePanel, ProjectInfo} from './component/ConfigurePanel';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const data:ProjectInfo[] = [
  {path: "C:\\Users\\Shaw\\Documents\\LeanPro\\Testing\\samples\\cuketest_samples\\zh-CN\\api_service\\"},
  {path: "C:\\Users\\Shaw\\Documents\\LeanPro\\Testing\\samples\\cuketest_samples\\zh-CN\\basic\\math", checked: false, status: "interrupt"},
  {path: "C:\\Users\\Shaw\\Desktop\\api_service", checked: true, status: "passed", lastReport: "C:\\Users\\Shaw\\Documents\\LeanPro\\Testing\\samples\\cuketest_samples\\zh-CN\\basic\\math\\report"}
]
root.render(
  <React.StrictMode>
    <ConfigurePanel projectsCache={data}/>
  </React.StrictMode>
);
