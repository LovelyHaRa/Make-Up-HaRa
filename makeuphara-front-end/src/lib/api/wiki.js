import client from './client';
import qs from 'qs';

export const requestDocument = () => client.get('/api/wiki/request');

export const writeDocument = ({ id, body }) =>
  client.post(`/api/wiki/write/${id}`, { body });

export const readDocument = ({ id, r }) => {
  const queryString = qs.stringify({ r });
  return client.get(`/api/wiki/${id}?${queryString}`);
};

export const getDocumentList = (block) => {
  const queryString = qs.stringify({ block });
  return client.get(`/api/wiki/list?${queryString}`);
};

export const getHistoryList = ({ id }) => client.get(`/api/wiki/${id}/history`);

export const getSearchList = ({ query, oldest, shortest, longest }) => {
  const queryString = qs.stringify({ query, oldest, shortest, longest });
  return client.get(`/api/wiki/search?${queryString}`);
};

export const getDirectTitle = ({ query }) => {
  const queryString = qs.stringify({ query });
  return client.get(`/api/wiki/search/direct?${queryString}`);
};

export const getRandomTitle = () => client.get('/api/wiki/search/random');

export const getDocumentCount = ({ username }) =>
  client.post('/api/wiki/doc/count', { username });
