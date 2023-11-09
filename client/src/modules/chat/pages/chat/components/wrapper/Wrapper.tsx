import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../store';

import { readMessage } from '../../../../store/chatThunk';
import selectById from '../../../../store/chatSelector';

import MessageList from './message-list/MessageList';

import style from './Wrapper.module.scss';

export default function Wrapper() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => selectById(state, Number(id)));

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: listRef.current?.clientHeight,
    });
  });

  useEffect(() => {
    if (Number(messages!.notification) > 0) {
      dispatch(readMessage(messages!.id.toString()));
    }
  }, [messages?.notification, dispatch]);

  return (
    <div className={style.wrapper} ref={containerRef}>
      <MessageList ref={listRef} />
    </div>
  );
}
