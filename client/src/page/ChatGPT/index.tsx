import { Button } from 'antd';

import styles from './index.module.scss';

import { ChatList, ChatInput } from '@/components';

export default function ChatGPT() {
  const messages = [
    {
      isUser: true,
      content: '你好',
    },
    {
      isUser: false,
      content:
        '你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀',
    },
    {
      isUser: true,
      content: '你好',
    },
    {
      isUser: true,
      content: '你好',
    },
    {
      isUser: false,
      content:
        '你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀',
    },
    {
      isUser: true,
      content: '你好',
    },
    {
      isUser: true,
      content: '你好',
    },
    {
      isUser: false,
      content:
        '你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀',
    },
    {
      isUser: true,
      content: '你好',
    },
    {
      isUser: true,
      content: '你好',
    },
    {
      isUser: false,
      content:
        '你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀',
    },
    {
      isUser: true,
      content: '你好',
    },
    {
      isUser: true,
      content: '你好',
    },
    {
      isUser: false,
      content:
        '你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀你好呀',
    },
    {
      isUser: true,
      content: '你好',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <ChatList customStyle={{ flex: 1 }} messages={messages} />
        <ChatInput />
      </div>
    </div>
  );
}
