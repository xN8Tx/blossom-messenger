import { Paragraph } from 'blossom-react-ui';

import timeHandler from '@/modules/chat/utils/fromDateToTime';

import style from './Time.module.scss';

type TimeProps = {
  date: string;
};

export default function Time({ date }: TimeProps) {
  const time = timeHandler(date);

  return (
    <div className={style.time}>
      <Paragraph size='m' weight='regular' color='dark'>
        {time}
      </Paragraph>
    </div>
  );
}
