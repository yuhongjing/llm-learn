import McpBase from "./mcp-base.js";

class MCPClient extends McpBase {
  constructor() {
    super("mcp-client", "0.1.0");
  }

  async connect() {
    return await this.connectToMcpServer({
      command: "npm",
      args: ["run", "start"],
      cwd: "../mcp-server",
    });
  }

  async executeToolCall(name: string, args: any) {
    return this.callTool({ name, args });
  }
}

export default MCPClient;
