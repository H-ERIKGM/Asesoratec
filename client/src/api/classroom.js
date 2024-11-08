import axios from './axios'

export const getClassroomRequest = () => axios.get('/classrooms');

export const getClassroomsRequest = (id) => axios.get(`/classrooms/${id}`);

export const createClassroomsRequest = (classroom) => axios.post('/classrooms', classroom);

export const updateClassroomRequest = (classroom) => axios.put(`/classrooms/${classroom._id}`, classroom);

export const deleteClassroomRequest = (id) => axios.delete(`/classrooms/${id}`);