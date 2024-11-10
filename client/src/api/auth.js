import axios from './axios'

const API = 'https://ec2-18-212-31-252.compute-1.amazonaws.com:4000/api'

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verityTokenRequest = () => axios.get(`/verify-token`)