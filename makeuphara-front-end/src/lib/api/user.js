import client from './client';

export const checkExistName = (name) => {
  console.log(name);
  return client.post('/api/user/checkName', { name });
};

export const updateName = ({ id, name }) =>
  client.patch('/api/user/profile', { id, name });

export const changePassword = ({ id, password, newPassword }) =>
  client.patch('/api/user/password', { id, password, newPassword });
