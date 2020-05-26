import client from './client';

export const checkExistUsername = ({ username }) =>
  client.post('/api/user/check/username', { username });

export const checkExistName = ({ username, name }) =>
  client.post('/api/user/check/name', { username, name });

export const updateName = ({ id, name }) =>
  client.patch('/api/user/profile', { id, name });

export const changePassword = ({ id, password, newPassword }) =>
  client.patch('/api/user/password', { id, password, newPassword });
