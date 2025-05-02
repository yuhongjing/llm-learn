import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

class McpBase {
  client: Client | undefined;
  toolsList: any[] = [];

  constructor(name: string, version: string) {
    this.client = new Client({ name, version });
  }

  protected async callTool(data: { name: string; args: any }) {
    const { name, args } = data;
    const result = await this.client?.callTool({ name, arguments: args });
    return result;
  }

  protected getToolsList() {
    return this.toolsList;
  }

  protected async connectToMcpServer(data: {
    command: string;
    args?: string[];
    cwd?: string;
    env?: Record<string, string>;
  }) {
    const { command, args, cwd, env } = data || {};
    // 创建transport实例用于与服务器通信
    const transport = new StdioClientTransport({
      command,
      args,
      cwd,
      env,
    });

    // 连接到服务器
    await this.client?.connect(transport);

    // 获取工具列表
    const toolsResult = await this.client?.listTools();
    this.toolsList =
      toolsResult?.tools.map((tool) => ({
        type: "function",
        function: {
          name: tool.name,
          description: tool.description,
          input_schema: tool.inputSchema,
          parameters: tool.inputSchema.properties,
        },
      })) || [];
  }
}

export default McpBase;
