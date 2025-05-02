import McpBase from "./mcp-base.js";

class MCPClient extends McpBase {
  constructor() {
    super("mcp-client", "0.1.0");
  }

  async connect() {
    await this.connectToMcpServer({
      command: "npm",
      args: ["run", "start"],
      cwd: "../mcp-server",
    });
  }

  async executeToolCall(name: string, args: any) {
    return this.callTool({ name, args });
  }

  getTools() {
    return this.getToolsList();
  }
}

export default MCPClient;
