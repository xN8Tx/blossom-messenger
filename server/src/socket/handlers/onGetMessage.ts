import messagesAPI from '../../api/messagesAPI';
import membersAPI from '../../api/membersAPI';

import type {
  GetChatMessagesBody,
  GetChatMessagesBodyRes,
  Message,
  WebsocketType,
} from '../socket';

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
    console.log('Error onGetMessage. Error: ' + error);
    ws.close();
  }
};

export default onGetMessage;
