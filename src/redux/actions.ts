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

export const addMessage =
  (message: MessagePayload, noFirestore = false) =>
  async (dispatch: any) => {
    if (!noFirestore) {
      message.timestamp = Date.now();
      await setDoc(doc(db, "messages", message.id), { message: message.message, timestamp: message.timestamp, sessionId: message.sessionId });
    }
    dispatch({
      type: ADD_MESSAGE,
      payload: message,
    });
  };

export const removeMessage =
  (id: string, noFirestore = false) =>
  async (dispatch: any) => {
    if (!noFirestore) await deleteDoc(doc(db, "messages", id));
    dispatch({
      type: REMOVE_MESSAGE,
      payload: id,
    });
  };
