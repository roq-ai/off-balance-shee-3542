import axios from 'axios';
import queryString from 'query-string';
import { FinanceInterface, FinanceGetQueryInterface } from 'interfaces/finance';
import { GetQueryInterface } from '../../interfaces';

export const getFinances = async (query?: FinanceGetQueryInterface) => {
  const response = await axios.get(`/api/finances${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFinance = async (finance: FinanceInterface) => {
  const response = await axios.post('/api/finances', finance);
  return response.data;
};

export const updateFinanceById = async (id: string, finance: FinanceInterface) => {
  const response = await axios.put(`/api/finances/${id}`, finance);
  return response.data;
};

export const getFinanceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/finances/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFinanceById = async (id: string) => {
  const response = await axios.delete(`/api/finances/${id}`);
  return response.data;
};
