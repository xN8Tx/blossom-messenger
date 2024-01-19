import { messagesAPI, membersAPI, errorLogManager } from 'database';

import type {
  GetChatMessagesBody,
  GetChatMessagesBodyRes,
  Message,
  WebsocketType,
} from '../typings/socket';

const onGetMessage = async (
  message: Message<GetChatMessagesBody>,
  ws: WebsocketType,
) => {
  try {
    const chatId = message.body.chatId;
    const userId = ws.id;

    const members = await membersAPI.getByChatIdAndUserId(
      Number(chatId),
      Number(userId),
    );

    if (members?.length === 0) return ws.close();

    const messages = await messagesAPI.getByChatId(chatId);

    const title: Message<GetChatMessagesBodyRes> = {
      event: 'GET_CHAT_MESSAGE',
      body: {
        chatId: chatId,
        messages: messages!,
      },
    };
    const data = JSON.stringify(title);

    ws.send(data);
  } catch (error) {
    errorLogManager.addToLogs(
      'Error in handlers/onCreateChat.ts',
      `${(error as Error).message}`,
    );
    ws.close();
  }
};

export default onGetMessage;
