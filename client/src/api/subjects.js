import axios from './axios'

export const getSubjectsRequest = () => axios.get ('/subjects');

export const getSubjectRequest = (id) => axios.get (`/subjects/${id}`);

export const createSubjectsRequest = (subject) => axios.post ('/subjects', subject);

export const updateSubjectsRequest = (subject, id) => axios.put (`/subjects/${id}`, subject);

export const deleteSubjectsRequest = (id) => axios.delete(`/subjects/${id}`);
