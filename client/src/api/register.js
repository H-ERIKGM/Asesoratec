import axios from './axios'

export const getRegistersRequest = () => axios.get('/registers');

export const getRegisterRequest = (id) => axios.get(`/registers/${id}`);

export const createRegisterRequest = (register) => axios.post('/registers', register);

export const updateRegisterRequest = (id, register) => axios.put(`/registers/${id}`, register);

export const deleteRegisterRequest = (id) => axios.delete(`/registers/${id}`);