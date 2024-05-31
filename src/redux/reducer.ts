import { ADD_MESSAGE, REMOVE_MESSAGE, MessageActionTypes } from "./actions";

export type MessageState = {
  message: string;
  id: string;
  timestamp: number;
  sessionId?: string;
};

export type MessagesState = {
  currentMessages: MessageState[];
};

const initialState: MessagesState = {
  currentMessages: [],
};

const messageReducer = (state = initialState, action: MessageActionTypes): MessagesState => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        currentMessages: [
          ...state.currentMessages,
          {
            message: action.payload.message,
            id: action.payload.id,
            timestamp: action.payload.timestamp,
            sessionId: action.payload.sessionId,
          },
        ],
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        currentMessages: state.currentMessages.filter((message) => message.id !== action.payload),
      };

    default:
      return state;
  }
};

export default messageReducer;
