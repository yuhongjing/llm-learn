import { Request, Response } from "express";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import chalk from "chalk";
import Mcp from "./mcp/index.js";

interface IMessage {
  role: string; // 角色
  content: string; // 对话内容
}

const sessionMessage = new Map();

function getSessionMessage(sessionId: string): IMessage[] {
  return sessionMessage.get(sessionId) || [];
}

function setSessionMessage(sessionId: string, message: IMessage): IMessage[] {
  const messageList = getSessionMessage(sessionId);
  messageList.push(message);
  sessionMessage.set(sessionId, messageList);
  return messageList;
}

async function qwenChat(req: Request, res: Response) {
  // 设置流式响应头
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let { message, session_id: sessionId } = req.query as {
    message: string;
    session_id: string;
  };
  const messageList: any[] = [];

  if (!message) {
    return res.status(400).json({ error: "请提供参数: message" });
  }

  if (sessionId) {
    // 历史对话
    const historyMessageList = getSessionMessage(sessionId as string);
    messageList.push(...historyMessageList);
  } else {
    // 新对话
    sessionId = uuidv4();
    const systemMessage = {
      role: "system",
      content: "You are a helpful assistant",
    };
    messageList.push(systemMessage);
    setSessionMessage(sessionId, systemMessage);
  }

  // 处理用户输入内容
  const userMessage = { role: "user", content: message };
  messageList.push(userMessage);
  setSessionMessage(sessionId, userMessage);

  try {
    const mcp = new Mcp();
    const mcpServerToolsList = await mcp.init();

    const openai = new OpenAI({
      apiKey: process.env.QWEN_API_KEY,
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    });

    // 循环调用工具 - 工具存在调用链，即一次回答可能调用多个工具 例如: 获取路线规划 -> 获取IP地址 -> 获取目的地信息 -> 等等
    let shouldContinue = true;
    while (shouldContinue) {
      // 判断是否需要调用MCP工具
      const completion = await openai.chat.completions.create({
        model: "qwen-plus",
        messages: messageList,
        temperature: 0, // 禁止随机
        tools: mcpServerToolsList,
      });

      const content = completion?.choices[0]; // 获取assistant的回答
      shouldContinue = false; // 默认不继续

      if (
        content?.finish_reason === "tool_calls" &&
        content.message.tool_calls?.length
      ) {
        messageList.push(content.message); // assistant告诉tool需要调用的MCP工具
        shouldContinue = true; // 如果有工具调用，继续循环

        for (const toolCall of content.message.tool_calls) {
          const toolName = toolCall.function.name;
          const toolArgs = JSON.parse(toolCall.function.arguments);

          // 调用工具
          const result = await mcp.callTool({ name: toolName, args: toolArgs });

          // tool回答assistant调用的function calling id
          messageList.push({
            role: "tool",
            content: result?.content,
            tool_call_id: toolCall.id,
            name: toolName,
          });
        }
      } else {
        // 如果没有工具调用，直接处理返回结果
        if (content?.message?.content) {
          const assistantMessage: IMessage = {
            role: "assistant",
            content: content.message.content,
          };
          messageList.push(assistantMessage);
          setSessionMessage(sessionId, assistantMessage);
          res.write(
            `data: ${JSON.stringify({ content: content.message.content })}\n\n`
          );
        }
      }
    }

    // 最终的流式响应
    const response = await openai.chat.completions.create({
      model: "qwen-plus",
      messages: messageList,
      tools: mcpServerToolsList,
      stream: true,
      stream_options: { include_usage: true },
    });

    let fullContent = "";
    for await (const chunk of response) {
      if (Array.isArray(chunk.choices) && chunk.choices.length > 0) {
        const choice = chunk.choices[0];
        fullContent += choice.delta.content;
        res.write(
          `data: ${JSON.stringify({ content: choice.delta.content })}\n\n`
        );
      }
    }

    const assistantMessage: IMessage = {
      role: "assistant",
      content: fullContent,
    };
    setSessionMessage(sessionId, assistantMessage);
    res.write(`data: ${JSON.stringify({ sessionId, done: true })}\n\n`);
  } catch (error) {
    console.error(chalk.red("ERROR: "), error);
    console.error(
      "请参考文档：https://help.aliyun.com/zh/model-studio/developer-reference/error-code"
    );
    res.write(`data: ${JSON.stringify({ sessionId, error: "发生错误" })}\n\n`);
  } finally {
    res.end();
  }
}

export { qwenChat };
