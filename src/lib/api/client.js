import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_URL || '/';

const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
