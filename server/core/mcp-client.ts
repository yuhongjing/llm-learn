import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

class MCPClient {
  mcpClient: Client;
  toolsList: any[] = []; // 存储工具的数组

  constructor() {
    this.mcpClient = new Client({ name: "mcp-client", version: "0.1.0" });
  }

  callTool = async (data: { name: string; args: any }) => {
    const { name, args } = data;
    const result = await this.mcpClient?.callTool({ name, arguments: args });
    return result;
  };

  connectToMcpServer = async () => {
    // 通常用于实现基于标准输入输出（stdin/stdout）的客户端与服务器之间的通信
    const transport = new StdioClientTransport({
      command: "npm",
      args: ["run", "start"], // start为测试MCP、start:webSearch为网络搜索MCP
      cwd: "../mcp-server", // 使用 cwd 选项来指定工作目录
    });
    // 连接到服务器
    await this.mcpClient?.connect(transport);

    // 获取工具列表
    const toolsResult = await this.mcpClient?.listTools();
    this.toolsList = toolsResult?.tools.map((tool) => ({
      type: "function",
      function: {
        name: tool.name,
        description: tool.description,
        input_schema: tool.inputSchema,
        parameters: tool.inputSchema.properties,
      },
    }));
  };
}

export default MCPClient;
