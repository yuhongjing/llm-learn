import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import chalk from "chalk";
import { z } from "zod";

import { webSearch } from "./web-search.js";

const server = new McpServer({
  name: "mcp-server",
  version: "0.1.0",
  compatible: {
    resources: {},
    tools: {},
  },
});

// 注册Web搜索工具
server.tool(
  "web-search",
  "Search the web for a query",
  { input: z.string() },
  // @ts-expect-error
  webSearch
);

async function mcpServer() {
  // 初始化MCP服务器
  const transport = new StdioServerTransport();
  // 连接MCP服务器
  await server.connect(transport);
}

mcpServer().catch((error) => {
  console.error(chalk.red("Error: "), error);
  process.exit(1);
});
