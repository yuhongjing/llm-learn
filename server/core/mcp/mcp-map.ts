import McpBase from "./mcp-base.js";
import "dotenv/config";

class MCPMap extends McpBase {
  constructor() {
    super("mcp-map", "0.1.0");
  }

  async connect() {
    return await this.connectToMcpServer({
      mode: "sse",
      url: process.env.GAODE_SSE_URL || "",
    });
  }

  async executeToolCall(name: string, args: any) {
    return this.callTool({ name, args });
  }
}

export default MCPMap;
