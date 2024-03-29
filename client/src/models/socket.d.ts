import { ChatWithInfo, Messages } from './data';

type Event =
  | 'READY'
  | 'MESSAGE'
  | 'SEND_FILE'
  | 'GET_CHAT_MESSAGE'
  | 'READ_MESSAGE'
  | 'EDIT_MESSAGE'
  | 'DELETE_MESSAGE'
  | 'WHO_IS_ONLINE'
  | 'DELETE_CHAT'
  | 'CREATE_CHAT';

type Message<T> = {
  event: Event;
  body: T;
};

type GetChatMessagesBody = {
  chatId: string;
  page: number;
};

type GetChatMessagesBodyRes = {
  chatId: string;
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

type ContactOnline = {
  id: string;
  status: boolean; // true - online | false - offline
};

type WhoIsOnlineBody = {
  userId: string;
  contactsId: Array<string>;
};

type WhoIsOnlineBodyRes = {
  userId: string;
  contactsId: ContactOnline[];
};

type DeleteChatBody = {
  userId: string;
  companionId: string;
  chatId: string;
};

type DeleteChatBodyRes = {
  chatId: string;
};

type CreateChatBody = {
  userId: string;
  companionId: string;
};

type CreateChatBodyRes = {
  chat: ChatWithInfo;
};

type SendFileBody = {
  userId: string;
  companionId: string;
  message: Omit<Messages, 'id'>;
  file: {
    file: string;
    fileExtension: string;
    fileName: string;
    fileType: string;
  };
};

type SendFileBodyRes = {
  chatId: string;
  message: Messages;
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
  WhoIsOnlineBody,
  WhoIsOnlineBodyRes,
  ContactOnline,
  DeleteChatBody,
  DeleteChatBodyRes,
  CreateChatBody,
  CreateChatBodyRes,
  SendFileBody,
  SendFileBodyRes,
};
