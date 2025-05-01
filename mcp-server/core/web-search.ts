import chalk from "chalk";
import axios from "axios";
import "dotenv/config";

async function webSearch(state: { input: string }) {
  const intput = state.input; // 获取用户输入的搜索内容
  try {
    // 智谱AI开放平台 - https://www.bigmodel.cn/dev/api/search-tool/web-search-pro
    const response = await axios.post(
      "https://open.bigmodel.cn/api/paas/v4/tools",
      {
        tool: "web-search-pro",
        messages: [{ role: "user", content: intput }],
        stream: false,
      },
      {
        headers: {
          Authorization: process.env.ZHIPU_API_KEY,
        },
      }
    );

    const resData: string[] = [];
    for (const choice of response.data.choices) {
      for (const message of choice.message.tool_calls) {
        const searchResults = message.search_result;
        if (!searchResults) {
          continue;
        }
        for (const result of searchResults) {
          resData.push(result.content); // 将搜索结果添加到数组中
        }
      }
    }

    return { content: [{ type: "text", text: resData.join("\n\n\n") }] };
  } catch (error: any) {
    console.error(chalk.red("Error: "), error);
    return { content: [{ type: "text", text: error?.message }] };
  }
}

export { webSearch };
