import client from './client';

export const register = ({ username, password }) =>
  client.post('/api/auth/register', { username, password });

export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

export const loginWithGoogle = ({ id_token }) =>
  client.post('/api/auth/login/google', { id_token });

export const loginWithNaver = ({ client_id, client_secret, code, state }) =>
  client.post('/api/auth/login/naver', {
    client_id,
    client_secret,
    code,
    state,
  });

export const loginWithKakao = ({
  client_id,
  client_secret,
  redirect_uri,
  code,
}) =>
  client.post('/api/auth/login/kakao', {
    client_id,
    client_secret,
    redirect_uri,
    code,
  });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');
