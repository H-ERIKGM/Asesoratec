import axios from './axios'

export const getUsersRequest = () => axios.get ('/users');

export const getUserRequest = (id) => axios.get (`/users/${id}`);

export const createUsersRequest = (user) => axios.post ('/users', user);

export const updateUsersRequest = (user, id) => axios.put (`/users/${id}`, user);

export const deleteUsersRequest = (id) => axios.delete(`/users/${id}`);
