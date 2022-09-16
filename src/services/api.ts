import axios from 'axios';

export const api = axios.create();

export const { CancelToken, isCancel, isAxiosError } = axios;
