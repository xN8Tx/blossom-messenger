import ws from 'ws';

import type {
  ContactOnline,
  Message,
  WebsocketType,
  WhoIsOnline,
  WhoIsOnlineRes,
} from '../socket';

const onWhoIsOnline = async (
  message: Message<WhoIsOnline>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  if (Number(ws.id) !== Number(message.body.userId)) ws.close();

  const { userId, contactsId } = message.body;

  const contacts: ContactOnline[] = contactsId.map((contact) => {
    const isContains =
      Array.from(wss.clients).findIndex(
        (u) => Number((u as WebsocketType).id) === Number(contact),
      ) > -1;

    return {
      id: contact,
      status: isContains,
    };
  });

  const title: Message<WhoIsOnlineRes> = {
    event: 'WHO_IS_ONLINE',
    body: {
      userId: userId,
      contactsId: contacts,
    },
  };

  const data = JSON.stringify(title);
  ws.send(data);
};

export default onWhoIsOnline;
