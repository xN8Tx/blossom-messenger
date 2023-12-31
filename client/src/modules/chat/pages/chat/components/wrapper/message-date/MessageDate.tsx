import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import fromDateToDay from '@chat/utils/fromDateToDay';

import Paragraph from '@/ui/paragraphs/Paragraph';

import style from './MessageDate.module.scss';

type MessageDate = {
  date: string;
};

const MessageDate = memo(({ date }: MessageDate) => {
  const { t } = useTranslation();

  const readyDate = fromDateToDay(date, t);

  return (
    <div className={style.wrapper}>
      <span className={style.span}></span>
      <Paragraph size='s' color='message'>
        {readyDate}
      </Paragraph>
      <span className={style.span}></span>
    </div>
  );
});

export default MessageDate;
