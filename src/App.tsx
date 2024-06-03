import React from "react";
import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from "./firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { addMessage, addMessageToFirestoreAsync, removeMessage, removeMessageFromFirestoreAsync } from "./redux/actions";
import MessageBubble from "./components/MessageBubble";
import SendMessageBox from "./components/SendMessageBox";

import "./App.css";
import { MessageState } from "./redux/reducer";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//temporary session id
const sessionId = uuidv4();

function App() {
  const messages = useSelector((state: RootState) => state.messages.currentMessages);
  const dispatch: AppDispatch = useDispatch();

  const [inputText, setInputText] = React.useState("");
  const messageBoxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Listen for new message
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        // Ignore messages that are from the current session.
        if (change.doc.data().sessionId === sessionId) return;
        else if (change.type === "added") {
          const message = { id: change.doc.id, ...change.doc.data() } as MessageState;
          dispatch(addMessage(message));
        } else if (change.type === "removed") {
          dispatch(removeMessage(change.doc.id));
        }
      });
    });

    return () => unsubscribe();
  }, []);

  const onSend = async (message: string) => {
    try {
      if (!message) return;
      const id = uuidv4();
      const messageParams = { message, id, sessionId, timestamp: Date.now() } as MessageState;
      await addMessageToFirestoreAsync(messageParams);
      dispatch(addMessage(messageParams));
      //After 5000ms, remove the message from the queue
      setTimeout(() => removeMessageFromQueue(id), 5000);
      setInputText("");
      messageBoxRef.current?.scrollTo(0, messageBoxRef.current.scrollHeight);
    } catch (error) {
      console.log(error);
      alert("Error sending message");
    }
  };

  const removeMessageFromQueue = async (id: string) => {
    try {
      await removeMessageFromFirestoreAsync(id);
      dispatch(removeMessage(id));
    } catch (error) {
      console.log(error);
      alert("Error removing message");
    }
  };

  return (
    <div className="App App-header">
      <div className="message-box" ref={messageBoxRef}>
        <h1>Chat</h1>
        {messages.map((message) => (
          <MessageBubble message={message} key={message.id} />
        ))}
      </div>
      <SendMessageBox onSend={onSend} inputText={inputText} setInputText={setInputText} />
    </div>
  );
}

export default App;
