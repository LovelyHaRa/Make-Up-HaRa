import client from './client';

export const requestDocument = () => client.get('/api/wiki/request');

export const writeDocument = ({ id, body }) =>
  client.post(`/api/wiki/write/${id}`, { body });