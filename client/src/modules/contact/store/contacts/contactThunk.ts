import { createAsyncThunk } from '@reduxjs/toolkit';

import $http from '../../../../api/httpApi';

import type { RootState } from '../../../../store';
import { Contact } from '../../../../models/data';

const getContacts = createAsyncThunk(
  '@@contact/getContact',
  async (_, thunkAPI) => {
    const getState = thunkAPI.getState;

    const state = getState();
    const id = (state as RootState).user.data.id;

    const url = `/contacts/${id}`;

    const res = await $http.get(url);
    const data: Contact[] = await res.data.message;

    return data;
  }
);

const postContact = createAsyncThunk(
  '@@contact/postContact',
  async (contactId: number, thunkAPI) => {
    const getState = thunkAPI.getState;

    const state = getState();
    const id = (state as RootState).user.data.id;

    const url = `/contacts/${id}`;

    const res = await $http.post(url, { contactId });
    const data: Contact = await res.data.message;

    return data;
  }
);

const deleteContact = createAsyncThunk(
  '@@contact/deleteContact',
  async (contactId: number, thunkAPI) => {
    const getState = thunkAPI.getState;

    const state = getState();
    const id = (state as RootState).user.data.id;

    const url = `/contacts/${id}/${contactId}`;

    const res = await $http.delete(url);
    const data = await (res.data.message as Contact).id;

    return Number(data);
  }
);

export { getContacts, deleteContact, postContact };
