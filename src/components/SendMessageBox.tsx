import React from "react";
import styles from "./styles.module.css";

type Props = {
  onSend: (message: string) => void;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
};

function SendMessageBox({ onSend, inputText, setInputText }: Props) {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        maxLength={100}
        placeholder="Enter your message"
        onKeyDown={(e) => inputText && e.key === "Enter" && onSend(inputText)}
      />
      <button onClick={() => onSend(inputText)}>Submit</button>
    </div>
  );
}

export default SendMessageBox;
