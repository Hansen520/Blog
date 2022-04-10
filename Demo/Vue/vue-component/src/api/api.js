import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

export const getTreeList = () => {
  return axios.get('/getTreeList');
};
