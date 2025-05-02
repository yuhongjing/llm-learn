# LLM Learn Server

## 项目概述

这是 LLM Learn 项目的服务端部分，主要负责处理与通义千问大语言模型的交互，并集成了 MCP 工具调用功能。该服务为前端提供了必要的 API 接口，实现了智能对话和工具调用等核心功能。

## 技术栈

- TypeScript - 主要开发语言
- Node.js - 运行环境
- 通义千问 API - 大语言模型服务
- MCP 工具系统 - 提供工具调用能力

## 项目结构

```
server/
├── core/           # 核心功能模块
│   ├── mcp/       # MCP工具系统相关代码
│   └── qwen-chat.ts   # 通义千问API交互实现
├── helpers/       # 辅助工具函数
├── index.ts       # 应用入口文件
└── package.json   # 项目依赖配置
```

## 快速开始

1. 安装依赖

```bash
npm install
```

2. 配置环境变量

- 创建`.env`文件
- 设置必要的环境变量（如 API 密钥等）

3. 启动服务

```bash
npm run dev
```

## 主要功能

- 通义千问 API 集成

  - 支持智能对话
  - 处理上下文管理
  - 实现流式响应

- MCP 工具系统
  - 工具调用能力
  - 工具结果处理
  - 工具状态管理

## 开发指南

### 目录说明

- `core/`: 包含核心业务逻辑

  - `mcp/`: MCP 工具系统实现
  - `qwen-chat.ts`: 通义千问 API 交互逻辑

- `helpers/`: 通用辅助函数

### 开发规范

- 使用 TypeScript 编写代码，确保类型安全
- 遵循 ESLint 规范进行代码格式化
- 编写必要的注释和文档
- 进行适当的错误处理和日志记录

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交变更
4. 发起 Pull Request

## 许可证

MIT License
