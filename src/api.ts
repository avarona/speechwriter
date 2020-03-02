import axios from 'axios';
import { LAMBDA_URL } from './constants';

export const fetchDocs = (id: User['id']) => axios.get(`${LAMBDA_URL}/fetch`, { params: { id } });

export const createDoc = (payload: Page) => axios.post(`${LAMBDA_URL}/create`, payload);
