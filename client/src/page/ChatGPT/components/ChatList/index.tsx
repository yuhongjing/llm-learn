import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { IMessage } from '../../type';

import styles from './index.module.scss';

export interface IProps {
  messageList: IMessage[];
  customStyle?: React.CSSProperties;
}

export default function ChatList(props: IProps) {
  const { messageList, customStyle } = props;

  return (
    <div className={styles.container} style={customStyle}>
      {messageList?.map?.((item, idx) => (
        <div
          key={item.content + idx}
          className={classNames(styles.message, { [styles.user]: item.isUser })}
        >
          <div className={styles.content}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.content}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}
