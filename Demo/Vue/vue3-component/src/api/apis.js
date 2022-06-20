import request from '../utils/request';
import { useStorage } from '../utils/useStorage';

export const login = (body) => {
  request.post('/api/login', body).then((res) => {
    useStorage('token', res.data);
    return res;
  });
};

export const getInfo = () => request.get('/api/get');
