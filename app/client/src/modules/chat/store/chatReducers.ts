import audioNotification from '../utils/audioNotification';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { ChatInitialState } from '@/models/data';
import type {
  CreateChatBodyRes,
  DeleteChatBodyRes,
  DeleteMessageBodyRes,
  EditMessageBodyRes,
  Message,
  MessageBodyRes,
  ReadMessageBodyRes,
  WhoIsOnlineBodyRes,
} from '@/models/socket';

const reducers = {
  addMessageToChat: (
    state: ChatInitialState,
    action: PayloadAction<Message<MessageBodyRes>>
  ) => {
    // PREPARE
    const indexOfChat = state.data!.findIndex(
      (chat) => `${chat.id}` === action.payload.body.chatId
    );

    const chatUserId = state.data![indexOfChat].user.id;

    const messageUserId = action.payload.body.message.userId;

    if (Number(chatUserId) === Number(messageUserId)) {
      audioNotification();
    }

    // REDUCER
    if (state.data![indexOfChat].notification === null)
      state.data![indexOfChat].notification = 0;
    state.data![indexOfChat].messages.push(action.payload.body.message);
    state.data![indexOfChat].notification++;
  },
  addReadMessages: (
    state: ChatInitialState,
    action: PayloadAction<Message<ReadMessageBodyRes>>
  ) => {
    const indexOfChat = state.data!.findIndex(
      (chat) => Number(chat.id) === Number(action.payload.body.chatId)
    );

    const messages = state.data![indexOfChat].messages;

    const indexOfMessage = messages.findIndex((m) => m.status === false);

    if (indexOfMessage !== -1) {
      for (let index = indexOfMessage; index < messages.length; index++) {
        messages[index].status = true;
      }
    }
  },
  addEditMessage: (
    state: ChatInitialState,
    action: PayloadAction<Message<EditMessageBodyRes>>
  ) => {
    const indexOfChat = state.data!.findIndex(
      (chat) => Number(chat.id) === Number(action.payload.body.chatId)
    );

    const indexOfMessage = state.data![indexOfChat].messages.findIndex(
      (message) =>
        Number(message.id) === Number(action.payload.body.messages.id)
    );

    state.data![indexOfChat].messages[indexOfMessage].message =
      action.payload.body.messages.message;
    state.data![indexOfChat].messages[indexOfMessage].isEdit =
      action.payload.body.messages.isEdit;
  },
  addDeleteMessage: (
    state: ChatInitialState,
    action: PayloadAction<Message<DeleteMessageBodyRes>>
  ) => {
    const indexOfChat = state.data!.findIndex(
      (chat) => Number(chat.id) === Number(action.payload.body.chatId)
    );

    const indexOfMessage = state.data![indexOfChat].messages.findIndex(
      (message) =>
        Number(message.id) === Number(action.payload.body.messages.id)
    );

    state.data![indexOfChat].messages.splice(indexOfMessage, 1);
  },
  changeIsLoaded: (state: ChatInitialState) => {
    state.isLoaded = true;
  },
  changeIsConnected: (state: ChatInitialState) => {
    state.isConnected = true;
  },
  addCompanionStatus: (
    state: ChatInitialState,
    action: PayloadAction<Message<WhoIsOnlineBodyRes>>
  ) => {
    const contactsId = action.payload.body.contactsId;

    state.data?.forEach((chat, index) => {
      const contactIndex = contactsId.findIndex(
        (contact) => Number(contact.id) === Number(chat.user.id)
      );
      state.data![index].user.status = contactsId[contactIndex].status;
    });
  },
  addNewChat: (
    state: ChatInitialState,
    action: PayloadAction<Message<CreateChatBodyRes>>
  ) => {
    state.data?.push(action.payload.body.chat);
  },
  addDeleteChat: (
    state: ChatInitialState,
    action: PayloadAction<Message<DeleteChatBodyRes>>
  ) => {
    state.data =
      state.data?.filter((chat) => {
        if (Number(chat.id) !== Number(action.payload.body.chatId)) return chat;
      }) || null;
  },
};

export default reducers;
