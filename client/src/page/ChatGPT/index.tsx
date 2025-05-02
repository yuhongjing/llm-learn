import { useState } from 'react';

import { ChatList, ChatInput } from './components';
import styles from './index.module.scss';
import type { IMessage } from './type';

export default function ChatGPT() {
  const [messageList, setMessageList] = useState<IMessage[]>([]);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <ChatList customStyle={{ flex: 1 }} messageList={messageList} />
        <ChatInput messageList={messageList} setMessageList={setMessageList} />
      </div>
    </div>
  );
}
