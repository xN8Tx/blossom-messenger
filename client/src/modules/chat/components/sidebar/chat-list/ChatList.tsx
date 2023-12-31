import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store';
import sortChatsByLastMessageDate from '@chat/store/selectors/sortChatsByLastMessageDate';

import SignForm from '@/components/sign-form/SignForm';
import ChatItem from '../chat-item/ChatItem';

import style from './ChatList.module.scss';

export default function ChatList() {
  const { t } = useTranslation();
  const data = useAppSelector((state) => sortChatsByLastMessageDate(state));

  const isNull = data.length === 0;

  return (
    <div className={style.wrapper}>
      {isNull && (
        <div className={style.null}>
          <SignForm>{t('chat.toStartChat')}</SignForm>
        </div>
      )}
      {!isNull &&
        data!.map((chat) => (
          <ChatItem
            key={chat.id}
            chatId={chat.id}
            title={chat.title}
            avatar={chat.avatar!}
            user={chat.user}
            messages={chat.messages}
            notification={chat.notification}
          />
        ))}
    </div>
  );
}
