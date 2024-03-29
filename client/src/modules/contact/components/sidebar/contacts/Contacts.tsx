import { useTranslation } from 'react-i18next';
import { Heading } from 'blossom-react-ui';

import { useAppSelector } from '@/store';

import SignForm from '@/components/sign-form/SignForm';
import UserItem from '../user-item/UserItem';

import style from './Contacts.module.scss';

export default function Contacts() {
  const { t } = useTranslation();

  const { data, loading } = useAppSelector((state) => state.contacts);
  const isNull = data && data?.length === 0;

  return (
    <div className={style.wrapper}>
      <Heading size='xs' weight='bold' color='primary'>
        {t('title.contacts')}
      </Heading>
      <div className={style.container}>
        {isNull && (
          <div className={style.null}>
            <SignForm>{t('contact.toStartContact')}</SignForm>
          </div>
        )}
        {loading === 'success' &&
          data!.map((contact) => (
            <UserItem
              id={contact.contactId}
              firstName={contact.firstName}
              lastName={contact.lastName}
              avatar={contact.avatar}
              username={contact.username}
              key={contact.id}
              status={contact.status}
            />
          ))}
      </div>
    </div>
  );
}
