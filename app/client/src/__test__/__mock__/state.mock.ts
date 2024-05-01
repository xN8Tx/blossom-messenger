import { InitialState as InitialUserState } from '@/store/user';
import {
  ChatInitialState,
  Contact,
  InitialState,
  Profile,
  User,
} from '@/models/data';
import { InitialStateType } from '@/store/auth/authTypes';
import { RootState } from '@/store';

const auth: InitialStateType = {
  isAuth: 'notAuth',
  authType: null,
  codeLoading: 'idle',
  authLoading: 'idle',
  logoutLoading: 'idle',
  error: null,
  data: {},
};
const chat: ChatInitialState = {
  loading: 'idle',
  isLoaded: false,
  isConnected: false,
  isReRender: false,
  data: [
    {
      id: 1,
      title: '',
      isLoaded: 'success',
      avatar: null,
      notification: 0,
      isFileLoaded: false,
      pages: 0,
      maxPages: 1,
      user: {
        id: 2,
        firstName: 'Hello2',
        lastName: 'World2',
        username: 'helloWorld2',
        avatar: '',
        status: false,
      },
      messages: [
        {
          id: 1,
          chatId: '1',
          userId: 1,
          message: 'id:1,cId:1,uId:1',
          isEdit: false,
          status: true,
          date: 'Wed Dec 06 2023 16:43:56 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 2,
          chatId: '1',
          userId: 2,
          message: 'id:2,cId:1,uId:2',
          isEdit: false,
          status: true,
          date: 'Wed Dec 06 2023 16:44:00 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 3,
          chatId: '1',
          userId: 2,
          message: 'id:3,cId:1,uId:2',
          isEdit: false,
          status: true,
          date: 'Wed Dec 06 2023 16:44:02 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 4,
          chatId: '1',
          userId: 1,
          message: 'id:4,cId:1,uId:1',
          isEdit: false,
          status: true,
          date: 'Wed Dec 06 2023 16:44:12 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 5,
          chatId: '1',
          userId: 1,
          message: 'id:5,cId:1,uId:1',
          isEdit: false,
          status: true,
          date: 'Wed Dec 06 2023 16:45:23 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 6,
          chatId: '1',
          userId: 2,
          message: 'id:6,cId:1,uId:2',
          isEdit: false,
          status: true,
          date: 'Wed Dec 06 2023 16:47:25 GMT+0700 (Новосибирск, стандартное время)',
        },
      ],
    },
    {
      id: 2,
      title: '',
      isLoaded: 'success',
      avatar: null,
      notification: 0,
      isFileLoaded: false,
      pages: 0,
      maxPages: 1,
      user: {
        id: 3,
        firstName: 'Hello3',
        lastName: 'World3',
        username: 'helloWorld3',
        avatar: '',
        status: false,
      },
      messages: [
        {
          id: 7,
          chatId: '2',
          userId: 1,
          message: 'id:7,cId:2,uId:1',
          isEdit: false,
          status: true,
          date: 'Wed Dec 06 2023 16:43:56 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 8,
          chatId: '2',
          userId: 3,
          message: 'id:8,cId:2,uId:3',
          isEdit: false,
          status: true,
          date: 'Wed Dec 06 2023 16:44:00 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 9,
          chatId: '2',
          userId: 3,
          message: 'id:9,cId:2,uId:3',
          isEdit: false,
          status: true,
          date: 'Wed Dec 06 2023 16:44:02 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 10,
          chatId: '2',
          userId: 1,
          message: 'id:10,cId:2,uId:1',
          isEdit: false,
          status: true,
          date: 'Wed Dec 06 2023 16:44:12 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 11,
          chatId: '2',
          userId: 3,
          message: 'id:12,cId:2,uId:3',
          isEdit: false,
          status: true,
          date: 'Wed Dec 06 2023 16:45:23 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 12,
          chatId: '2',
          userId: 1,
          message: 'id:13,cId:2,uId:1',
          isEdit: false,
          status: true,
          date: 'Wed Dec 06 2023 16:45:25 GMT+0700 (Новосибирск, стандартное время)',
        },
      ],
    },
    {
      id: 3,
      title: '',
      isLoaded: 'success',
      avatar: null,
      notification: 0,
      isFileLoaded: false,
      pages: 0,
      maxPages: 1,
      user: {
        id: 4,
        firstName: 'Hello4',
        lastName: 'World4',
        username: 'helloWorld4',
        avatar: '',
        status: true,
      },
      messages: [
        {
          id: 13,
          chatId: '3',
          userId: 1,
          message: 'id:13,cId:3,uId:1',
          isEdit: false,
          status: true,
          date: 'Wed Dec 07 2023 16:43:56 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 14,
          chatId: '3',
          userId: 3,
          message: 'id:14,cId:3,uId:3',
          isEdit: false,
          status: true,
          date: 'Wed Dec 07 2023 16:44:00 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 15,
          chatId: '3',
          userId: 3,
          message: 'id:15,cId:3,uId:3',
          isEdit: false,
          status: true,
          date: 'Wed Dec 07 2023 16:44:02 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 16,
          chatId: '3',
          userId: 1,
          message: 'id:16,cId:3,uId:1',
          isEdit: false,
          status: true,
          date: 'Wed Dec 07 2023 16:44:12 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 17,
          chatId: '3',
          userId: 3,
          message: 'id:17,cId:3,uId:3',
          isEdit: false,
          status: true,
          date: 'Wed Dec 07 2023 16:45:23 GMT+0700 (Новосибирск, стандартное время)',
        },
        {
          id: 18,
          chatId: '3',
          userId: 1,
          message: 'id:18,cId:3,uId:1',
          isEdit: false,
          status: true,
          date: 'Wed Dec 07 2023 16:45:25 GMT+0700 (Новосибирск, стандартное время)',
        },
      ],
    },
  ],
};
const user: InitialUserState = {
  loading: 'idle',
  isEditLoaded: 'idle',
  data: {
    id: 1,
    firstName: 'Hello',
    lastName: 'World',
    status: false,
    avatar: null,
    username: 'helloWorld',
    email: 'mock@example.com',
  },
};
const contacts: InitialState<Contact[]> = {
  loading: 'success',
  data: [
    {
      id: 1,
      contactId: 2,
      firstName: 'Hello',
      lastName: 'World',
      status: false,
      avatar: '',
      username: 'helloWorld',
    },
    {
      id: 2,
      contactId: 3,
      firstName: 'Hello2',
      lastName: 'World22',
      status: false,
      avatar: '',
      username: 'helloWorld',
    },
  ],
};
const users: InitialState<User[]> = {
  loading: 'success',
  data: [
    {
      id: 1,
      firstName: 'Hello',
      lastName: 'World',
      status: false,
      avatar: '',
      username: 'helloWorld',
    },
    {
      id: 2,
      firstName: 'Hello2',
      lastName: 'World22',
      status: false,
      avatar: '',
      username: 'helloWorld',
    },
    {
      id: 3,
      firstName: 'Hello2',
      lastName: 'World22',
      status: false,
      avatar: '',
      username: 'helloWorld',
    },
  ],
};
const profile: InitialState<Profile> = {
  loading: 'idle',
  data: {
    id: 2,
    firstName: 'Hello2',
    lastName: 'World22',
    status: false,
    avatar: '',
    username: 'helloWorld',
    messages: null,
  },
};

const state: RootState = {
  auth,
  chat,
  user,
  contacts,
  users,
  profile,
};

export default state;
export { auth, chat, user, contacts, users, profile };