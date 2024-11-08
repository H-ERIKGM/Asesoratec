import axios from './axios'

const API = 'https://54.144.78.59:4000/api'

export const registerRequest = (user) => axios.post(`${API}/register`, user);

export const loginRequest = user => axios.post(`${API}/login`, user);

export const verityTokenRequest = () => axios.get(`${API}/verify-token`)