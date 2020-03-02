import axios from 'axios';
import { LAMBDA_URL } from './constants';

export const fetchDocs = () => axios.get(`${LAMBDA_URL}/fetch`);

export const createDoc = (payload: Page) => axios.post(`${LAMBDA_URL}/create`, payload);
