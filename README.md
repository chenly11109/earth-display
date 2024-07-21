# VirtualEarthPathway

## 如何开发

#### Prerequisites: 

1. `Node.js` 版本为 `16.x`
2. 本项目使用 `pnpm` 管理依赖, 在进入开发之前, 需要确保已 [安装](https://pnpm.io/installation) 完成。
3. 构建工具为 [vite](https://vitejs.dev/), 通常不太需要去查看或修改其配置
4. 测试工具为 [vitest](https://vitest.dev/), 其使用了与 [jest](https://jestjs.io/) 相同的语法, 官网中找不到的语法或保留字可以前往 [jest](https://jestjs.io/) 查看
5. `lint` 工具: [eslint](https://eslint.org/), 这个会在 `git commit` 之后自动运行, 如果有 `error`, 通过 `lint:fix` 命令修复

#### 开发流程

1. 将需求拆分至**更小**的模块, 同时也尽可能不损失清晰的语义, 避免多人提交代码时的冲突
2. 在 `local repository` 中通过 `git checkout -b <BRANCHNAME> origin/dev ` 创建分支, 并将需求提交至分支
3. 该 `branch` 的语义尽量遵循 [conventioanl commits](https://www.conventionalcommits.org/en/v1.0.0/)
4. `git commit` 提交代码, 如果有 lint 错误, 修复之后进行下一步
5. `git push origin <BRANCHNAME>` 提交代码至远程仓库
6. 在 `gitlab` 上发起 `merge request` , 将当前 branch 合并至 `dev` 分支

#### 目录结构
1. `src/design` 为尽量原子化的视图组件, 尽量避免在这里掺杂业务逻辑
2. `src/utils` 为工具函数, 通常用来处理一些数据; 尽量避免在函数中引入副作用( [side effect](https://en.wikipedia.org/wiki/Side_effect_(computer_science)) ), 以增加其可测试性( testability )
3. `src/pages` 为按路由分割的页面
4. `src/state` 作状态管理用
5. `src/config` 为配置文件
6. `src/types` 这里放类型声明, 主要是一些共享的类型
7. `src/components` 为带有业务逻辑的组件

#### 引入依赖
在项目开发的过程中, 如果新引入部分依赖, 将该引入单独抽取为一次 commit, 随后发起一次 MR , 并将该引入提交至远程仓库, 最后, 通知该仓库的开发人员拉取该版本。

#### mock
在开发过程中, 可能会有后端接口尚未开发完成,接口访问路径有变动或者本地与接口跨域的情况, 此时可以通过 `mock` 来模拟数据。
1. 使用 [msw](https://mswjs.io/) 来 mock 数据
2. 在 `src/mock` 下, 根据接口文档, 创建对应的 mock 文件, 比如 login 接口, 在 `src/mock` 下建立 `logRelated` 文件夹, 并将对应的 mock 文件 `login.mock.ts` 加入其中
3. 仿照已有的写法添加对应的 mock 数据
4. 在 `src/mock/handlers.ts` 中引入对应文件即可

#### CSS 命名约定
遵循 [BEM](http://getbem.com/naming/) 约定, 如 `searchBar__input--disabled` , 以减少 CSS 冲突和覆盖的可能

#### 以 React 组件的形式引用 svg
```typescript
import { ReactComponent as Logo } from './logo.svg';
// 然后 `<Logo />` 就可以直接使用了
```

#### 避免组件内部的错误外溢
部分 UI 的 JavaScript 错误不应该导致整个应用崩溃 :

使用错误边界 ([Error Boundary](https://github.com/bvaughn/react-error-boundary)) 来捕获组件内部的错误, 并在页面上显示错误信息或者 fallback UI 。

写法可参考 `src/App.tsx`

#### 其他
一些有用的 vscode extensions:
1. [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) : 智能提示路径
2. [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree) : 提示还有哪些 todos
3. [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) : 代码自动补全



## 地球部分结构
此文档只针对dev版本。

### 整体框架
#### 桌面菜单
<LeftBar /> 左边栏，state 在 state/leftBar 里，一共有三种模式  
    1）传统的路由方式（不在LeftBar 里）  
    2）全屏应用模式 - <FullScreenModal />  
    3) 非全屏应用模式 - <Modal />

#### 地球部分
<Earth />  
    共有两个模式，一个是星云模式 在<UserHotPot />中， 另一个是由  <ProjectHotSpot/>控制的项目渲染模式  
    项目渲染模式有两部分，一部分是项目本身的点，是一些实际存在的地理坐标点，点击会跳转到info/:infoId页面  
    星云模式数据来源：/config/Earth/userInformation 中的userData, 为180*180个平面数据，这一块数据结构需要与后端统一   
    点击LeftBar最下面的带虚线S可以切换两种模式

#### Event-Workflow
点击<LeftBar />上数第二个进入Event-Workflow, 再点Start from Blank 进如Event页面  
所有接口除了accomplish condition - Ir 外全部为mockData , 最后Publish 和 classification部分甚至没有接口对过  
在pages/workflowPage 中，还有一些workflowPage等

#### 其余部分参考（organization,login 等）
https://drive.google.com/drive/u/1/folders/1o427GTR3dSVqgoGo3PWYPG2ZwG3rdf31
