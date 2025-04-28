import classNames from 'classnames';

import styles from './index.module.scss';

export interface IMessage {
  isUser: boolean;
  content: string;
}

export interface IProps {
  messages: IMessage[];
  customStyle?: React.CSSProperties;
}

export default function ChatList(props: IProps) {
  const { messages, customStyle } = props;

  if (!messages?.length) {
    return null;
  }

  return (
    <div className={styles.container} style={customStyle}>
      {messages.map((item, idx) => (
        <div
          key={item.content + idx}
          className={classNames(styles.message, { [styles.user]: item.isUser })}
        >
          <div className={styles.content}>{item.content}</div>
        </div>
      ))}
    </div>
  );
}
