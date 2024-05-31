import { MessageState } from "../redux/reducer";
import styles from "./styles.module.css";

type Props = {
  message: MessageState;
};

function MessageBubble({ message }: Props) {
  return (
    <div key={message.id} className={styles.message}>
      <p>{message.message}</p>
      <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
    </div>
  );
}

export default MessageBubble;
