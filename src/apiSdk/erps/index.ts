import axios from 'axios';
import queryString from 'query-string';
import { ErpInterface, ErpGetQueryInterface } from 'interfaces/erp';
import { GetQueryInterface } from '../../interfaces';

export const getErps = async (query?: ErpGetQueryInterface) => {
  const response = await axios.get(`/api/erps${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createErp = async (erp: ErpInterface) => {
  const response = await axios.post('/api/erps', erp);
  return response.data;
};

export const updateErpById = async (id: string, erp: ErpInterface) => {
  const response = await axios.put(`/api/erps/${id}`, erp);
  return response.data;
};

export const getErpById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/erps/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteErpById = async (id: string) => {
  const response = await axios.delete(`/api/erps/${id}`);
  return response.data;
};
