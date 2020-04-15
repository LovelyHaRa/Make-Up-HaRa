import client from './client';
import qs from 'qs';

export const writePost = ({ title, body, tags }) =>
  client.post('/api/post/write', { title, body, tags });

export const readPost = id => client.get(`/api/post/${id}`);

export const updatePost = ({ id, title, body, tags }) =>
  client.patch(`/api/post/${id}`, { title, body, tags });

export const removePost = id => client.delete(`/api/post/${id}`);

export const getList = ({ page, tag, username, block }) => {
  const queryString = qs.stringify({ page, tag, username, block });
  return client.get(`/api/post/list?${queryString}`);
};
