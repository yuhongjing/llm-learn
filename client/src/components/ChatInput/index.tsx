import { ArrowUpOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';

import styles from './index.module.scss';

const { TextArea } = Input;

export default function ChatInput() {
  return (
    <div className={styles.container}>
      <TextArea
        className={styles.input}
        autoSize={{ minRows: 1, maxRows: 8 }}
        placeholder="发送消息"
      />
      <div className={styles.action}>
        <Button type="primary" shape="circle" icon={<ArrowUpOutlined />} />
      </div>
    </div>
  );
}
