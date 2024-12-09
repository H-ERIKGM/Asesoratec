import axios from './axios'

export const getCounselingsRequest = () => axios.get('/counselings');

export const getCounselingRequest = (id) => axios.get(`/counselings/${id}`);

export const createCounselingsRequest = (counseling) => axios.post('/counselings', counseling);

export const updateCounselingsRequest = (id, counseling) => axios.put(`/counselings/${id}`, counseling);

export const deleteCounselingsRequest = (id) => axios.delete(`/counselings/${id}`);

export const getTeachersRequest = () => axios.get('/teachers'); 