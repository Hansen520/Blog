import { useStorage } from './useStorage';
export const getToken = () => useStorage('token').value;
