import client from './client';

export const checkExistName = (name) =>
  client.post('/api/user/checkName', { name });

export const updateName = ({ id, name }) =>
  client.patch('/api/user/profile', { id, name });
