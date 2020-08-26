# VSCode 插件和配置

> vscode 是一款非常好的编辑器, 它的好很大一部分取决于丰富的插件库, 由于安装的插件比较多, 配置也比较多(个人喜欢瞎弄), 这里做一个插件和配置的备份, 纯粹个人配置, 做个参考

### 插件

- **Auto Close Tag**

  自动闭合 HTML 标签

- **Better Comments**

  注释插件

- **Bracket Pair Colorizer**

  允许使用颜色标识匹配的括号

- **Chinese (Simplified) Language Pack for Visual Studio Code**

  适用于 VS Code 的中文（简体）语言包

- **Code Runner**

  运行代码片段（需要指定运行语言使用`Ctrl + Alt + J`）

- **Debugger for Chrome**

  用于在 Google Chrome 浏览器或支持 Chrome DevTools 协议的其他目标中调试 JavaScript 代码的 VS Code 扩展

- **ESLint**

  提高代码可读性、统一性，适合协作开发

- **GitLens — Git supercharged**

  增强 Visual Studio 代码内置的 Git 功能

- **language-stylus**

  支持 stylus 高亮

- **Markdown Preview Enhanced**

  Markdown 预览

- **npm**

  支持运行文件中定义的 npm 脚本 package.json 并根据定义的依赖项验证已安装的模块。

- **npm Intellisense**

  在 import 语句中自动填充 npm 模块

- **Panda Theme**

  熊猫主题

- **Path Intellisense**

  自动填充文件名

- **Prettier - Code formatter**

  美化 javascript，JSON，CSS，Sass，和 HTML 在 Visual Studio 代码

- **Sass**

  scss 插件

- **Vetur**

  vue 工具

- **vscode-icons**

  icon 插件

- **Vue 2 Snippets**

  vue 2.x 语法提示

- **React-Native/React/Redux snippets for es6/es7**

  react 语法插件

### 配置 (setting.json)

```json
{
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.lineHeight": 26,
  "editor.fontFamily": "Monaco",
  "editor.letterSpacing": 0.5,
  "editor.fontSize": 15,
  "editor.minimap.renderCharacters": false,
  "files.insertFinalNewline": true,
  "workbench.settings.editor": "json",
  "workbench.iconTheme": "vscode-icons",
  "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
  "workbench.colorTheme": "Panda Syntax",
  "diffEditor.renderSideBySide": false, // 控制差异编辑器的显示方式是并排还是内联
  "gitlens.views.repositories.files.layout": "tree", // git 树状显示
  "code-runner.runInTerminal": true, // 在命令行运行code runner
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "html",
    "vue"
  ],
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 主题

上面的配置文件里有--- [Panda Syntax](https://marketplace.visualstudio.com/items?itemName=tinkertrain.theme-panda)，如图：

![](../images/vscode-theme.png)

<Vssue :title="$title" />
