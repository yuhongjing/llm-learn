import { ArrowUpOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { useState } from 'react';

import { IMessage } from '../../type';

import styles from './index.module.scss';

const { TextArea } = Input;

interface IProps {
  messageList: IMessage[];
  setMessageList: (messageList: IMessage[]) => void;
}

export default function ChatInput(props: IProps) {
  const { messageList, setMessageList } = props;

  const [message, setMessage] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessage('');
    const beforeMessageList = [...messageList, { isUser: true, content: message }];
    setMessageList(beforeMessageList);

    let fullContent: string = '';
    let url = `http://127.0.0.1:3000/qwen-chat?message=${message}`;
    if (sessionId) {
      url += `&session_id=${sessionId}`;
    }

    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) || {};

        if (data.error) {
          console.error(data.error);
          eventSource.close();
          return;
        }

        if (data.done) {
          eventSource.close();
          setSessionId(data.sessionId || '');
          return;
        }

        if (data.content) {
          fullContent += data.content;
          setMessageList([...beforeMessageList, { isUser: false, content: fullContent }]);
        }
      } catch (error) {
        console.error(error);
        eventSource.close();
      }
    };
  };

  return (
    <div className={styles.container}>
      <TextArea
        className={styles.input}
        autoSize={{ minRows: 1, maxRows: 8 }}
        placeholder="发送消息"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onPressEnter={handleSendMessage}
      />
      <div className={styles.action}>
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowUpOutlined />}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
}
