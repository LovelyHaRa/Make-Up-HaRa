import client from './client';

export const requestDocument = () => client.get('/api/wiki/request');
