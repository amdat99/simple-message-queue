import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../App";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";

type MessagePayload = {
  message: string;
  id: string;
  timestamp?: number;
  sessionId?: string;
};

export interface AddMessageAction {
  type: typeof ADD_MESSAGE;
  payload: MessagePayload;
}

export interface RemoveMessageAction {
  type: typeof REMOVE_MESSAGE;
  payload: string;
}

export type MessageActionTypes = AddMessageAction | RemoveMessageAction;

export const addMessageToFirestoreAsync = async (message: MessagePayload) => {
  await setDoc(doc(db, "messages", message.id), { message: message.message, timestamp: message.timestamp, sessionId: message.sessionId });
};

export const addMessage = (message: MessagePayload) => {
  return (dispatch: any) => {
    dispatch({
      type: ADD_MESSAGE,
      payload: message,
    });
  };
};

export const removeMessageFromFirestoreAsync = async (id: string) => {
  await deleteDoc(doc(db, "messages", id));
};

export const removeMessage = (id: string) => {
  return (dispatch: any) => {
    dispatch({
      type: REMOVE_MESSAGE,
      payload: id,
    });
  };
};
