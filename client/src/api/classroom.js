import axios from './axios'

export const getClassroomsRequest = () => axios.get('/classrooms');

export const getClassroomRequest = (id) => axios.get(`/classrooms/${id}`);

export const createClassroomRequest = (classroom) => axios.post('/classrooms', classroom);

export const updateClassroomRequest = (id, classroom) => axios.put(`/classrooms/${id}`, classroom);

export const deleteClassroomRequest = (id) => axios.delete(`/classrooms/${id}`);