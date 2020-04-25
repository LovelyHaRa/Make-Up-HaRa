import client from './client';
import qs from 'qs';

export const requestDocument = () => client.get('/api/wiki/request');

export const writeDocument = ({ id, body }) =>
  client.post(`/api/wiki/write/${id}`, { body });

export const readDocument = ({ id }) => client.get(`/api/wiki/${id}`);

export const getDocumentList = (block) => {
  const queryString = qs.stringify({ block });
  return client.get(`/api/wiki/list?${queryString}`);
};

export const getHistoryList = ({ id }) => client.get(`/api/wiki/${id}/history`);
