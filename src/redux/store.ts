import { configureStore, Reducer, UnknownAction } from "@reduxjs/toolkit";
import messageReducer, { MessagesState } from "./reducer";
import { MessageActionTypes } from "./actions";

const store = configureStore({
  reducer: {
    messages: messageReducer as Reducer<MessagesState, MessageActionTypes | UnknownAction, MessagesState>,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
