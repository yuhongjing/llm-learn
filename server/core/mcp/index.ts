#!/usr/bin/env node
import MCPClient from "./mcp-client.js";
import MCPMap from "./mcp-map.js";

const mcpServerConfig = [
  { name: "mcp-server", instance: new MCPClient() },
  { name: "mcp-map", instance: new MCPMap() },
];

class McpManage {
  mcpServerToolsList: any[] = [];
  mcpServerToolsMap: Record<string, any[]> = {};

  // 初始化 MCP 服务
  async init() {
    for await (const config of mcpServerConfig) {
      const { name, instance } = config;
      const curMcpServerToolsList = await instance.connect();
      this.mcpServerToolsList = [
        ...this.mcpServerToolsList,
        ...curMcpServerToolsList,
      ];
      this.mcpServerToolsMap[name] = curMcpServerToolsList; // 存储每个 MCP 服务的工具列表
    }

    return this.mcpServerToolsList;
  }

  // 调用工具
  callTool(data: { name: string; args: any }) {
    const { name, args } = data;
    // 根据工具名称找到对应的 MCP 服务
    const mcpServerName = Object.keys(this.mcpServerToolsMap).find((key) =>
      this.mcpServerToolsMap[key].some((tool) => tool?.function?.name === name)
    );
    if (!mcpServerName) {
      throw new Error(`Tool ${name} not found`);
    }
    // 调用对应的 MCP 服务的工具
    const mcpServer = mcpServerConfig.find(
      (config) => config.name === mcpServerName
    );
    if (!mcpServer) {
      throw new Error(`MCP server ${mcpServerName} not found`);
    }
    return mcpServer.instance.executeToolCall(name, args);
  }
}

export default McpManage;
