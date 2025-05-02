import McpBase from "./mcp-base.js";
import "dotenv/config";

class MCPMap extends McpBase {
  constructor() {
    super("mcp-map", "0.1.0");
  }

  async connect() {
    await this.connectToMcpServer({
      command: process.env.NPX_PATH || "npx",
      args: ["-y", "@amap/amap-maps-mcp-server"],
      env: {
        AMAP_MAPS_API_KEY: process.env.GAODE_API_KEY || "",
      },
    });
  }

  async executeToolCall(name: string, args: any) {
    return this.callTool({ name, args });
  }

  getTools() {
    return this.getToolsList();
  }
}

export default MCPMap;
