# MCP Server

## 项目概述

MCP Server 是 LLM Learn 项目的一个重要组成部分，专门负责提供 Web 搜索工具服务。该服务器基于 TypeScript 开发，为大语言模型提供了强大的网络搜索能力支持。

## 项目结构

```
mcp-server/
├── core/           # 核心功能模块
│   ├── index.ts    # 主要功能入口
│   └── web-search.ts # Web搜索实现
├── package.json    # 项目依赖配置
└── tsconfig.json   # TypeScript配置
```

## 功能特性

- Web 搜索工具服务
- TypeScript 强类型支持
- 模块化设计
- 易于集成

## 开发环境设置

### 前置要求

- Node.js (推荐 v16 或更高版本)
- npm 或 yarn 包管理器

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

## 使用说明

1. 确保服务器正常运行
2. 通过 API 接口调用 Web 搜索功能
3. 处理返回的搜索结果

## 注意事项

- 请确保配置文件中包含必要的 API 密钥
- 遵循 API 调用频率限制
- 正确处理错误响应
