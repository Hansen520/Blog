import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000';

export const getTreeList = () => {
  return axios.post('/getTreeList');
};
