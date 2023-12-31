import ws from 'ws';

import messagesAPI from '../../api/messagesAPI';
import membersAPI from '../../api/membersAPI';
import broadcastMessage from '../utils/broadcastMessage';

import type {
  EditMessageBody,
  EditMessageBodyRes,
  Message,
  WebsocketType,
} from 'socket/socket';

const onEdit = async (
  message: Message<EditMessageBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    const { userId, companionId, messages, chatId } = message.body;

    if (Number(ws.id) !== Number(userId)) return ws.close();

    const chats = await membersAPI.getByChatIdAndUserId(
      Number(chatId),
      Number(userId),
    );
    if (chats!.length === 0) return ws.close();

    const findMessage = await messagesAPI.getById(messages.id);
    if (Number(findMessage!.userId) !== Number(userId)) return ws.close();

    const newMessage = await messagesAPI.edit(
      messages.message,
      Number(messages.id),
    );

    const title: Message<EditMessageBodyRes> = {
      event: 'EDIT_MESSAGE',
      body: {
        userId,
        chatId,
        messages: newMessage!,
      },
    };

    broadcastMessage(wss, title, companionId);
  } catch (error) {
    ws.close();
  }
};

export default onEdit;
