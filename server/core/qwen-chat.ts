import { Request, Response } from "express";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import chalk from "chalk";

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
      content: "You are a helpful assis",
    };
    messageList.push(systemMessage);
    setSessionMessage(sessionId, systemMessage);
  }

  // 处理用户输入内容
  const userMessage = { role: "user", content: message };
  messageList.push(userMessage);
  setSessionMessage(sessionId, userMessage);

  try {
    const openai = new OpenAI({
      apiKey: process.env.QWEN_API_KEY,
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    });

    const completion = await openai.chat.completions.create({
      model: "qwen-plus", // 模型列表: https://help.aliyun.com/zh/model-studio/getting-started/models
      messages: messageList,
      stream: true,
      stream_options: { include_usage: true },
    });

    let fullContent = "";
    for await (const chunk of completion) {
      // 如果stream_options.include_usage为true，则最后一个chunk的choices字段为空数组，需要跳过
      if (Array.isArray(chunk.choices) && chunk.choices.length > 0) {
        const content = chunk.choices[0].delta.content;
        fullContent += content; // 字符拼接
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }
    const systemMessage: IMessage = { role: "system", content: fullContent };
    setSessionMessage(sessionId, systemMessage);
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
