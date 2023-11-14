import { Messages } from './data';

type Event =
  | 'READY'
  | 'MESSAGE'
  | 'GET_CHAT_MESSAGE'
  | 'READ_MESSAGE'
  | 'EDIT_MESSAGE'
  | 'DELETE_MESSAGE'
  | 'WHO_IS_ONLINE';

type Message<T> = {
  event: Event;
  body: T;
};

type GetChatMessagesBody = {
  chatId: string;
};

type GetChatMessagesBodyRes = GetChatMessagesBody & {
  messages: Messages[];
};

type MessageBody = {
  userId: string;
  companionId: string;
  message: Omit<Messages, 'id'>;
};

type MessageBodyRes = {
  chatId: string;
  message: Messages;
};

type ReadMessageBody = {
  userId: string;
  chatId: string;
  companionId: string;
};

type ReadMessageBodyRes = {
  chatId: string;
  messages: Messages[];
};

type EditMessageBody = {
  userId: string;
  chatId: string;
  companionId: string;
  messages: {
    id: string;
    message: string;
  };
};

type EditMessageBodyRes = {
  userId: string;
  chatId: string;
  messages: {
    id: string;
    message: string;
    isEdit: boolean;
  };
};

type DeleteMessageBody = {
  userId: string;
  chatId: string;
  companionId: string;
  messages: {
    id: string;
  };
};

type DeleteMessageBodyRes = {
  userId: string;
  chatId: string;
  messages: {
    id: string;
  };
};

type WhoIsOnline = {
  userId: string;
  contactsId: Array<string>;
};

type ContactOnline = {
  id: string;
  status: boolean; // true - online | false - offline
};

type WhoIsOnlineRes = {
  userId: string;
  contactsId: ContactOnline[];
};

export {
  Message,
  MessageBody,
  GetChatMessagesBody,
  GetChatMessagesBodyRes,
  MessageBodyRes,
  ReadMessageBodyRes,
  ReadMessageBody,
  EditMessageBody,
  EditMessageBodyRes,
  DeleteMessageBody,
  DeleteMessageBodyRes,
  WhoIsOnline,
  WhoIsOnlineRes,
  ContactOnline,
};
