# LLM Learn Client

## 项目概述

这是LLM Learn项目的前端部分，基于React和TypeScript开发的现代Web应用程序，使用Vite作为构建工具。该客户端提供了一个用户友好的界面，用于与LLM（大型语言模型）进行交互。

## 技术栈

- **核心框架：** React 19
- **开发语言：** TypeScript
- **构建工具：** Vite 6
- **UI组件库：** Ant Design 5
- **路由管理：** React Router 7
- **样式处理：** SASS
- **Markdown渲染：** react-markdown + remark-gfm

## 开发环境要求

- Node.js (推荐使用最新的LTS版本)
- npm (包含在Node.js安装中)

## 快速开始

1. **安装依赖**

```bash
npm install
```

2. **启动开发服务器**

```bash
npm run dev
```

3. **构建生产版本**

```bash
npm run build
```

## 可用的脚本命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产构建
- `npm run lint` - 运行ESLint检查并修复TypeScript/React代码
- `npm run lint:style` - 运行StyleLint检查并修复CSS/SCSS代码
- `npm run format` - 使用Prettier格式化代码

## 代码规范

项目配置了完整的代码质量保证工具链：

- ESLint - JavaScript/TypeScript代码检查
- StyleLint - CSS/SCSS样式检查
- Prettier - 代码格式化
- Husky - Git提交钩子
- CommitLint - Git提交信息规范

## 项目结构

```
src/
  ├── assets/     # 静态资源文件
  ├── page/       # 页面组件
  ├── router/     # 路由配置
  ├── index.css   # 全局样式
  ├── main.tsx    # 应用入口
  └── vite-env.d.ts # TypeScript声明文件
```

## 许可证

MIT License
