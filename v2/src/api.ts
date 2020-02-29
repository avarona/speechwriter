import axios from 'axios';
import { LAMBDA_URL } from './constants';

export const createDoc = (payload: any) => axios.post(`${LAMBDA_URL}/create`, payload);