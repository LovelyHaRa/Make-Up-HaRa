import client from './client';

export const checkExistName = (name) =>
  client.post('/api/user/checkName', { name });
