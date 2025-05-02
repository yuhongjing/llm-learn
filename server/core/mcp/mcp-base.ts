import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

class McpBase {
  client: Client | undefined;

  constructor(name: string, version: string) {
    this.client = new Client({ name, version });
  }

  protected async callTool(data: { name: string; args: any }) {
    const { name, args } = data;
    const result = await this.client?.callTool({ name, arguments: args });
    return result;
  }

  protected async connectToMcpServer(data: {
    command?: string;
    url?: string;
    args?: string[];
    cwd?: string;
    env?: Record<string, string>;
    mode?: string;
  }) {
    const { command, url, args, cwd, env, mode = "stdio" } = data || {};

    if (mode !== "stdio" && mode !== "sse")
      throw new Error("mode must be stdio or sse");

    let transport: any;

    if (mode === "stdio" && command) {
      // 创建transport实例用于与服务器通信
      transport = new StdioClientTransport({
        command,
        args,
        cwd,
        env,
      });
    }

    if (mode === "sse" && url) {
      // 创建transport实例用于与服务器通信
      transport = new SSEClientTransport(new URL(url));
    }

    // 连接到服务器
    await this.client?.connect(transport);

    // 获取工具列表
    const toolsResult = await this.client?.listTools();
    return (
      toolsResult?.tools.map((tool) => ({
        type: "function",
        function: {
          name: tool.name,
          description: tool.description,
          input_schema: tool.inputSchema,
          parameters: tool.inputSchema.properties,
        },
      })) || []
    );
  }
}

export default McpBase;
